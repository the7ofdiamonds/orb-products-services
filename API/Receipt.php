<?php

namespace ORBServices\API;

use WP_REST_Request;
use WP_Error;
use WP_REST_Response;

class Receipt
{
    public function __construct()
    {
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
                'permission_callback' => '__return_true',
            ]);
        });
    }

    public function post_receipt(WP_REST_Request $request)
    {
        global $wpdb;

        $invoice_id = $request['invoice_id'];
        $payment_method_id = $request['payment_method_id'];
        $amount_paid = $request['amount_paid'];
        $payment_date = $request['payment_date'];
        $payment_method = $request['payment_method'];
        $balance = $request['balance'];

        $table_name = 'orb_receipt';
        $result = $wpdb->insert(
            $table_name,
            [
                'invoice_id' => $invoice_id,
                'payment_method_id' => $payment_method_id,
                'amount_paid' => $amount_paid,
                'payment_date' => $payment_date,
                'payment_method' => $payment_method,
                'balance' => $balance,
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
        global $wpdb;
        $id = $request->get_param('slug');

        if (empty($id)) {
            return new WP_Error('invalid_receipt_id', 'Invalid receipt ID', array('status' => 400));
        }

        $receipt = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM orb_receipt WHERE id = %d",
                $id
            )
        );

        if (!$receipt) {
            return new WP_Error('receipt_not_found', 'Recceipt not found', array('status' => 404));
        }

        $get_data = [
            'id' => $receipt->id,
            'created_at' => $receipt->created_at,
            'invoice_id' => $receipt->invoice_id,
            'payment_method_id' => $receipt->payment_method_id,
            'amount_paid' => $receipt->amount_paid,
            'payment_date' => $receipt->payment_date,
            'payment_method' => $receipt->payment_method,
            'balance' => $receipt->balance,
        ];

        return new WP_REST_Response($get_data, 200);
    }
}
