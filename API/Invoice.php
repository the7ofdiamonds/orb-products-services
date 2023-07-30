<?php

namespace ORB_Services\API;

use WP_REST_Request;

use Stripe\Exception\ApiErrorException;

class Invoice
{
    private $stripeClient;

    public function __construct($stripeClient)
    {
        $this->stripeClient = $stripeClient;

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/invoices', [
                'methods' => 'POST',
                'callback' => [$this, 'create_invoice'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/invoices/(?P<slug>[a-zA-Z0-9-_]+)', [
                'methods' => 'GET',
                'callback' => [$this, 'get_invoice'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/stripe/invoices/(?P<slug>[a-zA-Z0-9-_]+)', [
                'methods' => 'GET',
                'callback' => [$this, 'get_stripe_invoice'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/invoices/(?P<slug>[a-zA-Z0-9-_]+)/finalize', [
                'methods' => 'POST',
                'callback' => [$this, 'finalize_invoice'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/invoices/(?P<slug>[a-z0-9-]+)', [
                'methods' => 'PATCH',
                'callback' => [$this, 'update_invoice'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/invoices/status/(?P<slug>[a-z0-9-]+)', [
                'methods' => 'PATCH',
                'callback' => [$this, 'update_invoice_status'],
                'permission_callback' => '__return_true',
            ]);
        });
    }

    public function create_invoice(WP_REST_Request $request)
    {
        $stripe_customer_id = $request['stripe_customer_id'];
        $due_date = $request['due_date'];
        $selections = $request['selections'];

        if (empty($stripe_customer_id)) {
            return rest_ensure_response('Customer ID is required');
        }

        if (empty($due_date)) {
            return rest_ensure_response('Due date is required');
        }

        if (empty($selections)) {
            return rest_ensure_response('Selections are required');
        }

        $stripe_invoice = $this->stripeClient->invoices->create([
            'collection_method' => 'send_invoice',
            'customer' => $stripe_customer_id,
            'due_date' => $due_date
        ]);

        foreach ($selections as $selection) {
            $price_id = $selection['price_id'];

            $this->stripeClient->invoiceItems->create([
                'customer' => $stripe_customer_id,
                'price' => $price_id,
                'invoice' => $stripe_invoice->id,
            ]);
        }

        global $wpdb;

        $status = $stripe_invoice->status;
        $stripe_invoice_id = $stripe_invoice->id;
        $due_date = $stripe_invoice->due_date;
        $subtotal = $stripe_invoice->subtotal;
        $tax = $stripe_invoice->tax;
        $amount_due = $stripe_invoice->amount_due;

        $serialized_selections = json_encode($selections);

        $table_name = 'orb_invoice';
        $result = $wpdb->insert(
            $table_name,
            [
                'status' => $status,
                'stripe_customer_id' => $stripe_customer_id,
                'stripe_invoice_id' => $stripe_invoice_id,
                'selections' => $serialized_selections,
                'due_date' => $due_date,
                'subtotal' => $subtotal,
                'tax' => $tax,
                'amount_due' => $amount_due
            ]
        );

        if (!$result) {
            $error_message = $wpdb->last_error;
            return rest_ensure_response($error_message);
        }

        $invoice_id = $wpdb->insert_id;

        return rest_ensure_response($invoice_id, 200);
    }

    public function get_invoice(WP_REST_Request $request)
    {
        $id = $request->get_param('slug');

        if (empty($id)) {
            return rest_ensure_response('invalid_invoice_id', 'Invalid invoice ID', array('status' => 400));
        }

        global $wpdb;

        $invoice = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM orb_invoice WHERE id = %d",
                $id
            )
        );

        if (!$invoice) {
            return rest_ensure_response('invoice_not_found', 'Invoice not found', array('status' => 404));
        }

        $data = [
            'id' => $invoice->id,
            'created_at' => $invoice->created_at,
            'status' => $invoice->status,
            'stripe_customer_id' => $invoice->stripe_customer_id,
            'stripe_invoice_id' => $invoice->stripe_invoice_id,
            'payment_intent_id' => $invoice->payment_intent_id,
            'client_secret' => $invoice->client_secret,
            'due_date' => $invoice->due_date,
            'selections' => json_decode($invoice->selections, true),
            'subtotal' => $invoice->subtotal,
            'tax' => $invoice->tax,
            'amount_due' => $invoice->amount_due,
            'amount_remaining' => $invoice->amount_remaining
        ];

        return rest_ensure_response($data, 200);
    }

    public function get_stripe_invoice(WP_REST_Request $request)
    {
        $stripe_invoice_id = $request->get_param('slug');

        try {

            $stripe_invoice = $this->stripeClient->invoices->retrieve(
                $stripe_invoice_id,
                []
            );

            return rest_ensure_response($stripe_invoice);
        } catch (ApiErrorException $e) {
            return rest_ensure_response($e);
        }
    }

    public function finalize_invoice(WP_REST_Request $request)
    {
        global $wpdb;

        $stripe_invoice_id = $request->get_param('slug');
        $stripe_customer_id = $request['stripe_customer_id'];

        $invoice = $this->stripeClient->invoices->finalizeInvoice(
            $stripe_invoice_id,
            ['expand' => ['payment_intent']]
        );

        $payment_intent = $invoice->payment_intent;

        $status = $invoice->status;
        $payment_intent_id = $payment_intent->id;
        $client_secret = $payment_intent->client_secret;
        $due_date = $invoice->due_date;
        $amount_due = $invoice->amount_due;
        $subtotal = $invoice->subtotal;
        $tax = $invoice->tax;
        $amount_remaining = $invoice->amount_remaining;


        if ($payment_intent_id === '' || $client_secret === '') {
            return rest_ensure_response('data_missing', 'Required data is missing', array('status' => 400));
        }

        $table_name = 'orb_invoice';
        $data = array(
            'payment_intent_id' => $payment_intent_id,
            'client_secret' => $client_secret,
            'status' => $status,
            'due_date' => $due_date,
            'amount_due' => $amount_due,
            'subtotal' => $subtotal,
            'tax' => $tax,
            'amount_remaining' => $amount_remaining,
        );
        $where = array(
            'stripe_invoice_id' => $stripe_invoice_id,
            'stripe_customer_id' => $stripe_customer_id
        );

        $updated = $wpdb->update($table_name, $data, $where);

        if ($updated === false) {
            $error_message = $wpdb->last_error ?: 'Invoice not found';
            return rest_ensure_response('invoice_not_found', $error_message, array('status' => 404));
        }

        $payment_intent_data = [
            'payment_intent_id' => $payment_intent_id,
            'client_secret' => $client_secret
        ];

        return rest_ensure_response($payment_intent_data);
    }

    function update_invoice(WP_REST_Request $request)
    {
        global $wpdb;
        $id = $request->get_param('slug');

        $stripe_customer_id = $request['stripe_customer_id'];
        $stripe_invoice_id = $request['stripe_invoice_id'];

        if ($stripe_customer_id === '') {
            return rest_ensure_response('data_missing', 'Required Stripe Customer ID is missing', array('status' => 400));
        }

        $stripe_invoice = $this->stripeClient->invoices->retrieve(
            $stripe_invoice_id,
            []
        );

        $payment_intent = $stripe_invoice->payment_intent;

        $status = $stripe_invoice->status;
        $payment_intent_id = $payment_intent->id;
        $client_secret = $payment_intent->client_secret;
        $due_date = $stripe_invoice->due_date;
        $amount_due = $stripe_invoice->amount_due;
        $subtotal = $stripe_invoice->subtotal;
        $tax = $stripe_invoice->tax;
        $amount_remaining = $stripe_invoice->amount_remaining;

        $table_name = 'orb_invoice';
        $data = array(
            'status' => $status,
            'payment_intent_id' => $payment_intent_id,
            'client_secret' => $client_secret,
            'status' => $status,
            'due_date' => $due_date,
            'amount_due' => $amount_due,
            'subtotal' => $subtotal,
            'tax' => $tax,
            'amount_remaining' => $amount_remaining,
        );
        $where = array(
            'id' => $id,
            'stripe_customer_id' => $stripe_customer_id,
            'stripe_invoice_id' => $stripe_invoice_id,
        );

        $updated = $wpdb->update($table_name, $data, $where);

        if ($updated === false) {
            $error_message = $wpdb->last_error ?: 'Invoice not found';
            return rest_ensure_response('invoice_not_found', $error_message, array('status' => 404));
        }

        return rest_ensure_response($status, 200);
    }

    function update_invoice_status(WP_REST_Request $request)
    {
        global $wpdb;
        $id = $request->get_param('slug');

        $stripe_customer_id = $request['stripe_customer_id'];
        $stripe_invoice_id = $request['stripe_invoice_id'];

        if ($stripe_customer_id === '') {
            return rest_ensure_response('data_missing', 'Required Stripe Customer ID is missing', array('status' => 400));
        }

        $stripe_invoice = $this->stripeClient->invoices->retrieve(
            $stripe_invoice_id,
            []
        );

        $status = $stripe_invoice->status;

        $table_name = 'orb_invoice';
        $data = array(
            'status' => $status,
        );
        $where = array(
            'id' => $id,
            'stripe_customer_id' => $stripe_customer_id,
            'stripe_invoice_id' => $stripe_invoice_id,
        );

        $updated = $wpdb->update($table_name, $data, $where);

        if ($updated === false) {
            $error_message = $wpdb->last_error ?: 'Invoice not found';
            return rest_ensure_response('invoice_not_found', $error_message, array('status' => 404));
        }

        return rest_ensure_response($status);
    }
}
