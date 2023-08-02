<?php

namespace ORB_Services\API;

use WP_REST_Request;

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
    }

    public function post_receipt(WP_REST_Request $request)
    {
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

        global $wpdb;

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
            return rest_ensure_response($error_message);
        }

        $receipt_id = $wpdb->insert_id;

        return rest_ensure_response($receipt_id);
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
}
