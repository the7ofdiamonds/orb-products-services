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
            register_rest_route('orb/v1', '/invoice/(?P<slug>[a-z0-9-]+)', [
                'methods' => 'GET',
                'callback' => [$this, 'get_invoice'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/invoice/(?P<slug>[a-zA-Z0-9-_]+)/finalize/', [
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
    
        return new WP_REST_Response($stripe_invoice->id, 200);
    }
    
    public function post_invoice(WP_REST_Request $request)
    {
        global $wpdb;

        $name = $request['name'];
        $email = $request['email'];
        $start_date = $request['start_date'];
        $start_time = $request['start_time'];
        $street_address = $request['street_address'];
        $city = $request['city'];
        $state = $request['state'];
        $zipcode = $request['zipcode'];
        $phone = $request['phone'];
        $selections = $request['selections'];
        $subtotal = $request['subtotal'];
        $tax = $request['tax'];
        $grand_total = $request['grand_total'];
        $stripe_invoice_id = $request['stripe_invoice_id'];
        $payment_intent_id = $request['payment_intent_id'];

        $serialized_selections = json_encode($selections);

        $table_name = 'orb_invoice';
        $result = $wpdb->insert(
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
                'stripe_invoice_id' => $stripe_invoice_id,
                'payment_intent_id' => $payment_intent_id
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
            'payment_intent_id' => $invoice->payment_intent_id,
            'name' => $invoice->name,
            'email' => $invoice->email,
            'phone' => $invoice->phone,
            'selections' => json_decode($invoice->selections, true),
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

    public function finalize_invoice(WP_REST_Request $request)
    {
        $status_code = 200;
        $error_message = '';

        try {
            $stripe_invoice_id = $request['stripe_invoice_id'];

            if ($stripe_invoice_id) {

                $invoice = $this->stripeClient->invoices->finalizeInvoice(
                    $stripe_invoice_id,
                    ['expand' => ['payment_intent']]
                );

                $payment_intent = $invoice->payment_intent;

                return new WP_REST_Response($payment_intent->id, $status_code);
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
