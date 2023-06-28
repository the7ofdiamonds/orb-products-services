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
            register_rest_route('orb/v1', '/receipt/(?P<slug>[a-z0-9-]+)', [
                'methods' => 'GET',
                'callback' => [$this, 'get_receipt'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/receipt', [
                'methods' => 'POST',
                'callback' => [$this, 'post_receipt'],
                'permission_callback' => '__return_true',
            ]);
        });
    }

    function get_receipt(WP_REST_Request $request)
    {
        global $wpdb;
        $id = $request->get_param('slug');

        if (!empty($id)) {
            $receipt = $wpdb->get_row(
                $wpdb->prepare(
                    "SELECT  * FROM orb_receipt WHERE id = %d",
                    $id
                )
            );

            $invoice = $wpdb->get_row(
                $wpdb->prepare(
                    "SELECT  * FROM orb_invoice WHERE id = %d",
                    $receipt->invoice_id
                )
            );

            $get_data = [
                'id' => $id,
                'created_at' => $receipt->created_at,
                'invoice_id' => $receipt->invoice_id,
                'name' => $invoice->name,
                'email' => $invoice->email,
                'phone' => $invoice->phone,
                'selections' => $invoice->selections,
                'subtotal' => $invoice->subtotal,
                'tax' => $invoice->tax,
                'grand_total' => $invoice->grand_total,
                'start_date' =>  $invoice->start_date,
                'start_time' => $invoice->start_time,
                'street_address' => $invoice->street_address,
                'city' => $invoice->city,
                'state' =>  $invoice->state,
                'zipcode' => $invoice->zipcode,
                'payment_date' => $receipt->payment_date,
                'payment_amount' => $receipt->payment_amount,
                'balance' => $receipt->balance
            ];

            return new WP_REST_Response($get_data, 200);
        } else {
            return new WP_Error('post_not_found', 'Receipt not found', array('status' => 404));
        }
    }

    function post_receipt(WP_REST_Request $request)
    {
        global $wpdb;

        $body = $request->get_body();
        $request_data = json_decode($body, true);

        if (!empty($body)) {
            $invoice_id = $request_data['invoice_id'];
            $payment_date = $request_data['payment_date'];
            $payment_amount = $request_data['payment_amount'];
            $payment_type = $request_data['payment_type'];
            $balance = $request_data['balance'];

            $table_name = 'orb_receipt';
            $wpdb->insert(
                $table_name,
                [
                    'invoice_id' => $invoice_id,
                    'payment_date' => $payment_date,
                    'payment_amount' => $payment_amount,
                    'payment_type' => $payment_type,
                    'balance' => $balance
                ]
            );

            $receipt_id = $wpdb->insert_id;

            return new WP_REST_Response($receipt_id, 200);
        }
    }
}
