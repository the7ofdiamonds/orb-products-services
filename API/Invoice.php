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
            register_rest_route('orb/v1', '/invoice/(?P<slug>[a-zA-Z0-9-_]+)', [
                'methods' => 'POST',
                'callback' => [$this, 'create_invoice'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/invoice', [
                'methods' => 'POST',
                'callback' => [$this, 'post_invoice'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/invoice/(?P<slug>[a-zA-Z0-9-_]+)', [
                'methods' => 'GET',
                'callback' => [$this, 'get_invoice'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/invoice/finalize/(?P<slug>[a-zA-Z0-9-_]+)', [
                'methods' => 'POST',
                'callback' => [$this, 'finalize_invoice'],
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

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/invoice/status/(?P<slug>[a-z0-9-]+)', [
                'methods' => 'PATCH',
                'callback' => [$this, 'update_invoice_status'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/invoice/stripe/(?P<slug>[a-zA-Z0-9-_]+)', [
                'methods' => 'GET',
                'callback' => [$this, 'get_stripe_invoice'],
                'permission_callback' => '__return_true',
            ]);
        });
    }

    public function create_invoice(WP_REST_Request $request)
    {
        $customer_id = $request->get_param('slug');
        $selections = $request['selections'];

        if (empty($customer_id)) {
            return new WP_Error('invalid_customer_id', 'Customer ID is required', array('status' => 400));
        }

        $stripe_invoice = $this->stripeClient->invoices->create([
            'customer' => $customer_id,
        ]);

        foreach ($selections as $selection) {
            $description = $selection['description'];
            $cost = $selection['cost'];
            $id = $selection['id'];

            $product = $this->stripeClient->products->create([
                'name' => $description,
            ]);

            $price = $this->stripeClient->prices->create([
                'unit_amount' => str_replace('.', '', $cost),
                'currency' => 'usd',
                'product' => $product->id,
            ]);

            $this->stripeClient->invoiceItems->create([
                'customer' => $customer_id,
                'price' => $price->id,
                'invoice' => $stripe_invoice->id,
                'metadata' => [
                    'id' => $id,
                ],
            ]);
        }

        return new WP_REST_Response($stripe_invoice, 200);
    }

    public function post_invoice(WP_REST_Request $request)
    {
        global $wpdb;
        $company_name = $request['company_name'];
        $tax_id = $request['tax_id'];
        $first_name = $request['first_name'];
        $last_name = $request['last_name'];
        $user_email = $request['user_email'];
        $address_line_1 = $request['address_line_1'];
        $address_line_2 = $request['address_line_2'];
        $city = $request['city'];
        $state = $request['state'];
        $zipcode = $request['zipcode'];
        $phone = $request['phone'];
        $selections = $request['selections'];
        $subtotal = $request['subtotal'];
        $tax = $request['tax'];
        $grand_total = $request['grand_total'];
        $stripe_customer_id = $request['stripe_customer_id'];
        $stripe_invoice_id = $request['stripe_invoice_id'];
        $client_id = $request['client_id'];
        $amount_due = $request['amount_due'];
        
        $serialized_selections = json_encode($selections);

        $table_name = 'orb_invoice';
        $result = $wpdb->insert(
            $table_name,
            [
                'client_id' => $client_id,
                'tax_id' => $tax_id,
                'company_name' => $company_name,
                'first_name' => $first_name,
                'last_name' => $last_name,
                'user_email' => $user_email,
                'phone' => $phone,
                'selections' => $serialized_selections,
                'subtotal' => $subtotal,
                'tax' => $tax,
                'grand_total' => $grand_total,
                'address_line_1' => $address_line_1,
                'address_line_2' => $address_line_2,
                'city' => $city,
                'state' => $state,
                'zipcode' => $zipcode,
                'stripe_invoice_id' => $stripe_invoice_id,
                'stripe_customer_id' => $stripe_customer_id,
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
            'client_id' => $invoice->client_id,
            'stripe_customer_id' => $invoice->stripe_customer_id,
            'stripe_invoice_id' => $invoice->stripe_invoice_id,
            'payment_intent_id' => $invoice->payment_intent_id,
            'client_secret' => $invoice->client_secret,
            'status' => $invoice->status,
            'first_name' => $invoice->first_name,
            'last_name' => $invoice->last_name,
            'user_email' => $invoice->user_email,
            'phone' => $invoice->phone,
            'selections' => json_decode($invoice->selections, true),
            'subtotal' => $invoice->subtotal,
            'tax' => $invoice->tax,
            'grand_total' => $invoice->grand_total,
            'address_line_1' => $invoice->address_line_1,
            'address_line_2' => $invoice->address_line_2,
            'city' => $invoice->city,
            'state' => $invoice->state,
            'zipcode' => $invoice->zipcode,
        ];

        return new WP_REST_Response($get_data, 200);
    }

    public function finalize_invoice(WP_REST_Request $request)
    {
        $stripe_invoice_id = $request->get_param('slug');

        $status_code = 200;
        $error_message = '';

        try {

            if ($stripe_invoice_id) {

                $invoice = $this->stripeClient->invoices->finalizeInvoice(
                    $stripe_invoice_id,
                    ['expand' => ['payment_intent']]
                );

                $payment_intent = $invoice->payment_intent;

                return new WP_REST_Response($payment_intent, $status_code);
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

    function update_invoice(WP_REST_Request $request)
    {
        global $wpdb;
        $id = $request->get_param('slug');

        $request_body = $request->get_body();
        $update = json_decode($request_body, true);

        if (empty($update)) {
            return new WP_Error('data_missing', 'Required data is missing', array('status' => 400));
        }

        $user_email = isset($update['user_email']) ? sanitize_email($update['user_email']) : '';
        $payment_intent_id = isset($update['payment_intent_id']) ? sanitize_text_field($update['payment_intent_id']) : '';
        $client_secret = isset($update['client_secret']) ? sanitize_text_field($update['client_secret']) : '';

        if (!$user_email || !$client_secret) {
            return new WP_Error('data_missing', 'Required data is missing', array('status' => 400));
        }

        $table_name = 'orb_invoice';
        $data = array(
            'payment_intent_id' => $payment_intent_id,
            'client_secret' => $client_secret,
        );
        $where = array(
            'id' => $id,
            'user_email' => $user_email
        );

        $updated = $wpdb->update($table_name, $data, $where);

        if ($updated === false) {
            $error_message = $wpdb->last_error ?: 'Invoice not found';
            return new WP_Error('invoice_not_found', $error_message, array('status' => 404));
        }

        return new WP_REST_Response($update, 200);
    }


    function update_invoice_status(WP_REST_Request $request)
    {
        global $wpdb;
        $id = $request->get_param('slug');

        $request_body = $request->get_json_params();

        if (empty($request_body)) {
            return new WP_Error('data_missing', 'Required data is missing', array('status' => 400));
        }

        $user_email = $request_body['user_email'];
        $client_secret = $request_body['client_secret'];
        $status = $request_body['status'];

        if (!$user_email || !$client_secret || !$status) {
            return new WP_Error('data_missing', 'Required data is missing', array('status' => 400));
        }

        $table_name = 'orb_invoice';
        $data = array(
            'status' => $status
        );
        $where = array(
            'id' => $id,
            'user_email' => $user_email,
            'client_secret' => $client_secret,
        );

        $updated = $wpdb->update($table_name, $data, $where);

        if ($updated === false) {
            return new WP_Error('update_failed', 'Failed to update invoice status.', array('status' => 500));
        }

        return new WP_REST_Response($status, 200);
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
}
