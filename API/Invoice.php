<?php

namespace ORBServices\API;

use WP_REST_Request;
use WP_Error;
use WP_REST_Response;

class Invoice
{
    private $stripeSecretKey;
    private $stripeClient;

    public function __construct()
    {
        $this->stripeSecretKey = $_ENV['STRIPE_SECRET_KEY'];
        \Stripe\Stripe::setApiKey($this->stripeSecretKey);
        $this->stripeClient = new \Stripe\StripeClient($this->stripeSecretKey);

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/invoice', [
                'methods' => 'POST',
                'callback' => [$this, 'create_invoice'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/invoice/create/(?P<slug>[a-zA-Z0-9-_]+)', [
                'methods' => 'POST',
                'callback' => [$this, 'create_invoice'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/invoice/(?P<slug>[a-z0-9-]+)', [
                'methods' => 'GET',
                'callback' => [$this, 'get_invoice'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/invoice/(?P<slug>[a-z0-9-]+)', [
                'methods' => 'PATCH',
                'callback' => [$this, 'update_invoice'],
                'permission_callback' => '__return_true',
            ]);
        });
    }

    public function post_invoice(WP_REST_Request $request)
    {
        global $wpdb;

        $request_data = $request->get_json_params();

        if (empty($request_data)) {
            return new WP_Error('empty_invoice', 'Invoice cannot be empty', array('status' => 400));
        }

        $name = $request_data['name'];
        $email = $request_data['email'];
        $start_date = $request_data['start_date'];
        $start_time = $request_data['start_time'];
        $street_address = $request_data['street_address'];
        $city = $request_data['city'];
        $state = $request_data['state'];
        $zipcode = $request_data['zipcode'];
        $phone = $request_data['phone'];
        $selections = $request_data['selections'];
        $subtotal = $request_data['subtotal'];
        $tax = $request_data['tax'];
        $grand_total = $request_data['grand_total'];
        $payment_intent_id = $request['payment_intent_id'];

        $serialized_selections = serialize($selections);

        $table_name = 'orb_invoice';
        $wpdb->insert(
            $table_name,
            [
                'name' => $name,
                'email' => $email,
                'phone' => $phone,
                'selections' => $serialized_selections,
                'subtotal' => $subtotal,
                'tax' => $tax,
                'grand_total' => $grand_total,
                'start_date' => $start_date,
                'start_time' => $start_time,
                'street_address' => $street_address,
                'city' => $city,
                'state' => $state,
                'zipcode' => $zipcode,
                'payment_intent_id' => $payment_intent_id
            ]
        );

        $invoice_id = $wpdb->insert_id;


        return new WP_REST_Response($invoice_id, 200);
    }

    public function create_invoice(WP_REST_Request $request)
    {
        global $wpdb;

        // $request_data = $request->get_body();

        $customer_id =  $request['customer_id'];
        $amount = $request['amount'];

        if (empty($customer_id)) {
            return new WP_Error('invalid_customer_id', 'Customer ID is required', array('status' => 400));
        }

        $invoice = $this->stripeClient->invoices->create([
            'customer' =>  $customer_id,
        ]);

        $invoice_item = $this->stripeClient->invoiceItems->create([
            'customer' => $customer_id,
            'price' => $amount,
            'invoice' => $invoice->id
        ]);

        

        return new WP_REST_Response($success, 200);
    }

    public function get_invoice(WP_REST_Request $request)
    {
        global $wpdb;
        $id = $request->get_param('slug');

        if (empty($id)) {
            return new WP_Error('invalid_invoice_id', 'Invalid invoice ID', array('status' => 400));
        }

        $invoice = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM orb_invoice WHERE id = %d",
                $id
            )
        );

        if (!$invoice) {
            return new WP_Error('invoice_not_found', 'Invoice not found', array('status' => 404));
        }

        $get_data = [
            'id' => $invoice->id,
            'created_at' => $invoice->created_at,
            'payment_intent_id' => $invoice->payment_intent_id,
            'name' => $invoice->name,
            'email' => $invoice->email,
            'phone' => $invoice->phone,
            'selections' => unserialize($invoice->selections),
            'subtotal' => $invoice->subtotal,
            'tax' => $invoice->tax,
            'grand_total' => $invoice->grand_total,
            'start_date' => $invoice->start_date,
            'start_time' => $invoice->start_time,
            'street_address' => $invoice->street_address,
            'city' => $invoice->city,
            'state' => $invoice->state,
            'zipcode' => $invoice->zipcode,
        ];

        return new WP_REST_Response($get_data, 200);
    }

    public function update_invoice(WP_REST_Request $request)
    {
        global $wpdb;
        $id = $request->get_param('slug');
        $request_data = $request->get_body_params();

        if ($request_data && isset($request_data['email']) && isset($request_data['payment_intent_id'])) {
            $email = $request_data['email'];
            $payment_intent_id = $request_data['payment_intent_id'];
        } else {
            return new WP_Error('data_missing', 'Required data is missing', array('status' => 400));
        }

        $table_name = 'orb_invoice';
        $data = [
            'payment_intent_id' => $payment_intent_id,
        ];
        $where = [
            'id' => $id,
            'email' => $email
        ];

        $invoice = $wpdb->update($table_name, $data, $where);

        if ($invoice === false) {
            return new WP_Error('invoice_not_found', 'Invoice not found', array('status' => 404));
        }

        $invoice_id = $wpdb->insert_id;

        return new WP_REST_Response($request_data, 200);
    }
}
