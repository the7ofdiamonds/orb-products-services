<?php

namespace ORB_Services\API;

use WP_REST_Request;

use Stripe\Exception\ApiErrorException;

class Receipt
{
    private $stripeClient;

    public function __construct($stripeClient)
    {
        $this->stripeClient = $stripeClient;

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/receipt', [
                'methods' => 'POST',
                'callback' => [$this, 'post_receipt'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/receipt/(?P<slug>[a-z0-9-]+)', [
                'methods' => 'GET',
                'callback' => [$this, 'get_receipt'],
                'args' => [
                    'stripe_customer_id' => [
                        'required' => true, // Set to true if this parameter is mandatory
                        'validate_callback' => function ($param, $request, $key) {
                            // Add any custom validation for the 'stripe_customer_id' here
                            // Return true if validation passes, or WP_Error object if it fails
                            return true;
                        },
                    ],
                ],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/receipts/(?P<slug>[a-z0-9-_]+)', [
                'methods' => 'GET',
                'callback' => [$this, 'get_receipts'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/receipts/client/(?P<slug>[a-z0-9-_]+)', [
                'methods' => 'GET',
                'callback' => [$this, 'get_client_receipts'],
                'permission_callback' => '__return_true',
            ]);
        });
    }

    public function post_receipt(WP_REST_Request $request)
    {
        try {
            $stripe_customer_id = $request['stripe_customer_id'];
            $invoice_id = $request['invoice_id'];
            $stripe_invoice_id = $request['stripe_invoice_id'];
            $payment_method = $request['payment_method'];
            $first_name = $request['first_name'];
            $last_name = $request['last_name'];

            $stripe_invoice = $this->stripeClient->invoices->retrieve(
                $stripe_invoice_id,
                []
            );

            if ($stripe_customer_id !== $stripe_invoice->customer) {
                $error_message = 'This is not the customer for  this transaction.';
                $status_code = 404;

                $response_data = [
                    'message' => $error_message,
                    'status' => $status_code
                ];

                $response = rest_ensure_response($response_data);
                $response->set_status($status_code);

                return $response;
            };

            $payment_intent_id = $stripe_invoice->payment_intent;
            $payment_date = $stripe_invoice->status_transitions['paid_at'];
            $amount_paid = intval($stripe_invoice->amount_paid) / 100;
            $balance = intval($stripe_invoice->amount_remaining) / 100;

            $payment_intent = $this->stripeClient->paymentIntents->retrieve(
                $payment_intent_id,
                []
            );

            $payment_method_id = $payment_intent->payment_method;
            $charge_id = $payment_intent->latest_charge;

            $charges = $this->stripeClient->charges->retrieve(
                $charge_id,
                []
            );

            global $wpdb;

            $table_name = 'orb_receipt';
            $result = $wpdb->insert(
                $table_name,
                [
                    'invoice_id' => $invoice_id,
                    'stripe_invoice_id' => $stripe_invoice->id,
                    'stripe_customer_id' => $stripe_invoice->customer,
                    'payment_method_id' => $payment_method_id,
                    'amount_paid' => $amount_paid,
                    'payment_date' => $payment_date,
                    'balance' => $balance,
                    'payment_method' => $payment_method,
                    'first_name' => $first_name,
                    'last_name' => $last_name,
                    'receipt_pdf_url' => $charges->receipt_url
                ]
            );

            if (!$result) {
                $error_message = $wpdb->last_error;
                $status_code = 404;

                $response_data = [
                    'message' => $error_message,
                    'status' => $status_code
                ];

                $response = rest_ensure_response($response_data);
                $response->set_status($status_code);

                return $response;
            }

            $receipt_id = $wpdb->insert_id;

            return rest_ensure_response($receipt_id);
        } catch (ApiErrorException $e) {
            $error_message = $e->getMessage();
            $status_code = $e->getHttpStatus();

            $response_data = [
                'message' => $error_message,
                'status' => $status_code
            ];

            $response = rest_ensure_response($response_data);
            $response->set_status($status_code);

            return $response;
        }
    }

    function get_receipt(WP_REST_Request $request)
    {
        $id = $request->get_param('slug');
        $stripe_customer_id = $request->get_param('stripe_customer_id');

        if (empty($id)) {
            return rest_ensure_response('Invalid Receipt ID');
        }

        if (empty($stripe_customer_id)) {
            return rest_ensure_response('Invalid Stripe Customer ID');
        }

        global $wpdb;

        $receipt = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM orb_receipt WHERE id = %d AND stripe_customer_id = %s",
                $id,
                $stripe_customer_id
            )
        );

        if (!$receipt) {
            return rest_ensure_response('Receipt not found');
        }

        $receipt_data = [
            'id' => $receipt->id,
            'created_at' => $receipt->created_at,
            'stripe_invoice_id' => $receipt->stripe_invoice_id,
            'stripe_customer_id' => $receipt->stripe_customer_id,
            'payment_method_id' => $receipt->payment_method_id,
            'amount_paid' => $receipt->amount_paid,
            'payment_date' => $receipt->payment_date,
            'balance' => $receipt->balance,
            'payment_method' => $receipt->payment_method,
            'first_name' => $receipt->first_name,
            'last_name' => $receipt->last_name,
        ];

        return rest_ensure_response($receipt_data);
    }

    function get_receipts(WP_REST_Request $request)
    {
        $stripe_customer_id = $request->get_param('slug');

        if (empty($stripe_customer_id)) {
            return rest_ensure_response('Invalid Stripe Customer ID');
        }

        global $wpdb;

        $receipt = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM orb_receipt WHERE stripe_customer_id = %s",
                $stripe_customer_id
            )
        );

        if (!$receipt) {
            return rest_ensure_response('No Receipts Found.');
        }

        return rest_ensure_response($receipt);
    }

    function get_client_receipts(WP_REST_Request $request)
    {
        $stripe_customer_id = $request->get_param('slug');

        if (empty($stripe_customer_id)) {
            $msg = 'Invalid Stripe Customer ID';
            $message = array(
                'message' => $msg,
            );
            $response = rest_ensure_response($message);
            $response->set_status(404);

            return $response;
        }

        global $wpdb;

        $receipt = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM orb_receipt WHERE stripe_customer_id = %s",
                $stripe_customer_id
            )
        );

        if (!$receipt) {
            $msg = 'There are no receipts to display.';
            $message = array(
                'message' => $msg,
            );
            $response = rest_ensure_response($message);
            $response->set_status(404);

            return $response;
        }

        return rest_ensure_response($receipt);
    }
}
