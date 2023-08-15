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
            register_rest_route('orb/v1', '/invoice/(?P<slug>[a-zA-Z0-9-_]+)', [
                'methods' => 'POST',
                'callback' => [$this, 'save_invoice'],
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
            register_rest_route('orb/v1', '/stripe/invoices/(?P<slug>[a-zA-Z0-9-_]+)', [
                'methods' => 'GET',
                'callback' => [$this, 'get_stripe_invoice'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/stripe/invoices/(?P<slug>[a-zA-Z0-9-_]+)', [
                'methods' => "DELETE",
                'callback' => [$this, 'delete_invoice'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/stripe/invoices/(?P<slug>[a-zA-Z0-9-_]+)/finalize', [
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
            register_rest_route('orb/v1', '/invoices/(?P<slug>[a-zA-Z0-9-_]+)', [
                'methods' => 'GET',
                'callback' => [$this, 'get_invoices'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/invoices/client/(?P<slug>[a-zA-Z0-9-_]+)', [
                'methods' => 'GET',
                'callback' => [$this, 'get_client_invoices'],
                'permission_callback' => '__return_true',
            ]);
        });
    }

    public function save_invoice(WP_REST_Request $request)
    {
        try {
            $stripe_invoice_id = $request->get_param('slug');
            $quote_id = $request['quote_id'];

            $stripe_invoice = $this->stripeClient->invoices->retrieve(
                $stripe_invoice_id,
                []
            );

            $subtotal = intval($stripe_invoice->subtotal) / 100;
            $tax = intval($stripe_invoice->tax) / 100;
            $amount_due = intval($stripe_invoice->amount_due) / 100;

            global $wpdb;

            $table_name = 'orb_invoice';
            $result = $wpdb->insert(
                $table_name,
                [
                    'status' => $stripe_invoice->status,
                    'stripe_customer_id' => $stripe_invoice->customer,
                    'quote_id' => $quote_id,
                    'stripe_invoice_id' => $stripe_invoice->id,
                    'due_date' => $stripe_invoice->due_date,
                    'subtotal' => $subtotal,
                    'tax' => $tax,
                    'amount_due' => $amount_due
                ]
            );

            if (!$result) {
                $error_message = $wpdb->last_error;
                $response = rest_ensure_response($error_message);
                $response->set_status(404);

                return $response;
            }

            $invoice_id = $wpdb->insert_id;
            $response = rest_ensure_response($invoice_id);
            $response->set_status(200);

            return $response;
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

    public function get_invoice(WP_REST_Request $request)
    {
        $id = $request->get_param('slug');

        if (empty($id)) {
            $msg = 'No Invoice ID was provided.';
            $response = rest_ensure_response($msg);
            $response->set_status(404);

            return $response;
        }

        global $wpdb;

        $invoice = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM orb_invoice WHERE id = %d",
                $id
            )
        );

        if (!$invoice) {
            $msg = 'Invoice not found';
            $response = rest_ensure_response($msg);
            $response->set_status(404);

            return $response;
        }

        $data = [
            'id' => $invoice->id,
            'created_at' => $invoice->created_at,
            'status' => $invoice->status,
            'stripe_customer_id' => $invoice->stripe_customer_id,
            'quote_id' => $invoice->quote_id,
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

        $response = rest_ensure_response($data);
        $response->set_status(200);

        return $response;
    }

    public function delete_invoice(WP_REST_Request $request)
    {
        try {
            $stripe_invoice_id = $request->get_param('slug');

            $stripe_invoice = $this->stripeClient->invoices->delete(
                $stripe_invoice_id,
                []
            );

            $deleted = $stripe_invoice->deleted;

            if ($deleted) {
                $table_name = 'orb_invoice';
                $data = array(
                    'status' => 'deleted',
                );
                $where = array(
                    'stripe_invoice_id' => $stripe_invoice_id,
                );

                global $wpdb;

                $updated = $wpdb->update($table_name, $data, $where);

                if ($updated === false) {
                    $error_message = $wpdb->last_error ?: 'Invoice not found';
                    return rest_ensure_response('invoice_not_found', $error_message, array('status' => 404));
                }

                return rest_ensure_response('Invoice Deleted');
            }
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

    function update_invoice(WP_REST_Request $request)
    {
        try {
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
            $amount_due = intval($stripe_invoice->amount_due) / 100;
            $subtotal = intval($stripe_invoice->subtotal) / 100;
            $tax = intval($stripe_invoice->tax) / 100;
            $amount_remaining = intval($stripe_invoice->amount_remaining) / 100;

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

            global $wpdb;

            $updated = $wpdb->update($table_name, $data, $where);

            if ($updated === false) {
                $error_message = $wpdb->last_error ?: 'Invoice not found';
                return rest_ensure_response('invoice_not_found', $error_message, array('status' => 404));
            }

            return rest_ensure_response($status);
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

    function update_invoice_status(WP_REST_Request $request)
    {
        try {
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
            $amount_due = intval($stripe_invoice->amount_due) / 100;
            $amount_remaining = intval($stripe_invoice->amount_remaining) / 100;

            $table_name = 'orb_invoice';
            $data = array(
                'status' => $status,
                'amount_due' => $amount_due,
                'amount_remaining' => $amount_remaining
            );
            $where = array(
                'id' => $id,
                'stripe_customer_id' => $stripe_customer_id,
                'stripe_invoice_id' => $stripe_invoice_id,
            );

            global $wpdb;

            $updated = $wpdb->update($table_name, $data, $where);

            if ($updated === false) {
                $error_message = $wpdb->last_error ?: 'Invoice not found';
                return rest_ensure_response('invoice_not_found', $error_message, array('status' => 404));
            }

            return rest_ensure_response($status);
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

    public function get_invoices(WP_REST_Request $request)
    {
        $stripe_customer_id = $request->get_param('slug');

        if (empty($stripe_customer_id)) {
            return rest_ensure_response('invalid_stripe_customer_id', 'Invalid Stripe Customer ID', array('status' => 400));
        }

        global $wpdb;

        $invoices = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM orb_invoice WHERE stripe_customer_id = %d",
                $stripe_customer_id
            )
        );

        if (!$invoices) {
            return rest_ensure_response('invoice_not_found', 'Invoice not found', array('status' => 404));
        }

        return rest_ensure_response($invoices);
    }

    public function get_client_invoices(WP_REST_Request $request)
    {
        $stripe_customer_id = $request->get_param('slug');

        if (empty($stripe_customer_id)) {
            $msg = 'Stripe Customer ID is required';
            $message = array(
                'message' => $msg,
            );
            $response = rest_ensure_response($message);
            $response->set_status(404);

            return $response;
        }

        global $wpdb;

        $invoices = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM orb_invoice WHERE stripe_customer_id = %d",
                $stripe_customer_id
            )
        );

        if (!$invoices) {
            $msg = 'There are no invoices to display.';
            $message = array(
                'message' => $msg,
            );
            $response = rest_ensure_response($message);
            $response->set_status(404);

            return $response;
        }

        return rest_ensure_response($invoices);
    }

    public function finalize_invoice(WP_REST_Request $request)
    {
        try {
            $stripe_invoice_id = $request->get_param('slug');
            $stripe_customer_id = $request['stripe_customer_id'];

            $invoice = $this->stripeClient->invoices->finalizeInvoice(
                $stripe_invoice_id,
                ['expand' => ['payment_intent']]
            );

            $table_name = 'orb_invoice';
            $data = array(
                'payment_intent_id' => $invoice->payment_intent->id,
                'client_secret' => $invoice->payment_intent->client_secret,
                'status' => $invoice->status,
                'invoice_pdf_url' => $invoice->invoice_pdf
            );
            $where = array(
                'stripe_invoice_id' => $invoice->id,
                'stripe_customer_id' => $stripe_customer_id
            );

            global $wpdb;

            $updated = $wpdb->update($table_name, $data, $where);

            if ($updated === false) {
                $error_message = $wpdb->last_error ?: 'Invoice not found';
                return rest_ensure_response('invoice_not_found', $error_message, array('status' => 404));
            }

            $finalized_invoice = [
                'payment_intent_id' => $invoice->payment_intent->id,
                'client_secret' => $invoice->payment_intent->client_secret,
                'status' => $invoice->status,
                'stripe_invoice_id' => $invoice->id,
                'stripe_customer_id' => $invoice->customer
            ];

            return rest_ensure_response($finalized_invoice);
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
}
