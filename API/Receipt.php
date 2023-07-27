<?php

namespace ORB_Services\API;

use WP_REST_Request;
use WP_Error;
use WP_REST_Response;

class Receipt
{
    private $stripeSecretKey;
    private $stripeClient;

    public function __construct()
    {
        $this->stripeSecretKey = $_ENV['STRIPE_SECRET_KEY'];
        \Stripe\Stripe::setApiKey($this->stripeSecretKey);
        $this->stripeClient = new \Stripe\StripeClient($this->stripeSecretKey);

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
    }

    public function post_receipt(WP_REST_Request $request)
    {
        global $wpdb;

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

        $payment_intent_id = $stripe_invoice->payment_intent;
        $payment_date = $stripe_invoice->status_transitions['paid_at'];
        $amount_paid = $stripe_invoice->amount_paid;
        $balance = $stripe_invoice->amount_remaining;

        $payment_intent = $this->stripeClient->paymentIntents->retrieve(
            $payment_intent_id,
            []
        );

        $payment_method_id = $payment_intent->payment_method;

        $table_name = 'orb_receipt';
        $result = $wpdb->insert(
            $table_name,
            [
                'invoice_id' => $invoice_id,
                'stripe_customer_id' => $stripe_customer_id,
                'payment_method_id' => $payment_method_id,
                'amount_paid' => $amount_paid,
                'payment_date' => $payment_date,
                'balance' => $balance,
                'payment_method' => $payment_method,
                'first_name' => $first_name,
                'last_name' => $last_name,
            ]
        );

        if (!$result) {
            $error_message = $wpdb->last_error;
            return new WP_Error($error_message);
        }

        $receipt_id = $wpdb->insert_id;

        return new WP_REST_Response($receipt_id, 200);
    }

    function get_receipt(WP_REST_Request $request)
    {
        $id = $request->get_param('slug');
        $stripe_customer_id = $request->get_param('stripe_customer_id');

        if (empty($id)) {
            return new WP_Error('invalid_receipt_id', 'Invalid Receipt ID', array('status' => 400));
        }

        if (empty($stripe_customer_id)) {
            return new WP_Error('invalid_stripe_customer_id', 'Invalid Stripe Customer ID', array('status' => 400));
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
            return new WP_Error('receipt_not_found', 'Receipt not found', array('status' => 404));
        }

        $receipt_data = [
            'id' => $receipt->id,
            'created_at' => $receipt->created_at,
            'invoice_id' => $receipt->invoice_id,
            'stripe_customer_id' => $receipt->stripe_customer_id,
            'payment_method_id' => $receipt->payment_method_id,
            'amount_paid' => $receipt->amount_paid,
            'payment_date' => $receipt->payment_date,
            'balance' => $receipt->balance,
            'payment_method' => $receipt->payment_method,
            'first_name' => $receipt->first_name,
            'last_name' => $receipt->last_name,
        ];

        return new WP_REST_Response($receipt_data, 200);
    }
}
