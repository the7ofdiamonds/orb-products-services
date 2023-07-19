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
        $selections = $request['selections'];
        $client_id = $request['client_id'];

        if (empty($stripe_customer_id)) {
            return new WP_Error('invalid_customer_id', 'Customer ID is required', array('status' => 400));
        }

        $stripe_invoice = $this->stripeClient->invoices->create([
            'customer' => $stripe_customer_id,
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
                'client_id' => $client_id,
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
            return new WP_Error($error_message);
        }

        $invoice_id = $wpdb->insert_id;

        return new WP_REST_Response($invoice_id, 200);
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
            'status' => $invoice->status,
            'client_id' => $invoice->client_id,
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

        return new WP_REST_Response($get_data, 200);
    }

    public function get_stripe_invoice(WP_REST_Request $request)
    {
        $stripe_invoice_id = $request->get_param('slug');

        $status_code = 200;
        $error_message = '';

        try {

            if ($stripe_invoice_id) {

                $stripe_invoice = $this->stripeClient->invoices->retrieve(
                    $stripe_invoice_id,
                    []
                );

                return new WP_REST_Response($stripe_invoice, $status_code);
            } else {
                $error_message = 'Invalid Stripe ID Number.';
                $status_code = 400;
            }
        } catch (\Stripe\Exception\CardException $e) {
            // Handle specific CardException
            $error_message = 'Card declined.';
            $status_code = 400;
        } catch (\Stripe\Exception\RateLimitException $e) {
            // Handle specific RateLimitException
            $error_message = 'Too many requests. Please try again later.';
            $status_code = 429;
        } catch (\Stripe\Exception\InvalidRequestException $e) {
            // Handle specific InvalidRequestException
            $error_message = 'Invalid request. Please check your input.';
            $status_code = 400;
        } catch (\Stripe\Exception\AuthenticationException $e) {
            // Handle specific AuthenticationException
            $error_message = 'Authentication failed. Please check your API credentials.';
            $status_code = 401;
        } catch (\Stripe\Exception\ApiConnectionException $e) {
            // Handle specific ApiConnectionException
            $error_message = 'Network error occurred. Please try again later.';
            $status_code = 500;
        } catch (\Exception $e) {
            // Handle any other generic exceptions
            $error_message = 'An error occurred while creating the payment intent.';
            $status_code = 500;
        }

        $data = array(
            'status' => $status_code,
            'message' => $error_message,
        );

        return new WP_Error('rest_error', $error_message, $data);
    }

    public function finalize_invoice(WP_REST_Request $request)
    {
        global $wpdb;

        $stripe_invoice_id = $request->get_param('slug');
        $client_id = $request['client_id'];
        $stripe_customer_id = $request['stripe_customer_id'];

        $status_code = 200;
        $error_message = '';

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


        if ($client_id === '' || $payment_intent_id === '' || $client_secret === '') {
            return new WP_Error('data_missing', 'Required data is missing', array('status' => 400));
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
            'client_id' => $client_id,
            'stripe_customer_id' => $stripe_customer_id
        );

        $updated = $wpdb->update($table_name, $data, $where);

        if ($updated === false) {
            $error_message = $wpdb->last_error ?: 'Invoice not found';
            return new WP_Error('invoice_not_found', $error_message, array('status' => 404));
        }

        $payment_intent_data = [
            'payment_intent_id' => $payment_intent_id,
            'client_secret' => $client_secret
        ];

        return new WP_REST_Response($payment_intent_data);
    }

    function update_invoice_status(WP_REST_Request $request)
    {
        global $wpdb;
        $id = $request->get_param('slug');

        $client_id = $request['client_id'];
        $stripe_invoice_id = $request['stripe_invoice_id'];

        if ($client_id === '') {
            return new WP_Error('data_missing', 'Required data is missing', array('status' => 400));
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
            'client_id' => $client_id,
            'stripe_invoice_id' => $stripe_invoice_id,
        );

        $updated = $wpdb->update($table_name, $data, $where);

        if ($updated === false) {
            $error_message = $wpdb->last_error ?: 'Invoice not found';
            return new WP_Error('invoice_not_found', $error_message, array('status' => 404));
        }

        return new WP_REST_Response($status, 200);
    }
}
