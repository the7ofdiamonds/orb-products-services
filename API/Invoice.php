<?php

namespace ORB_Services\API;

use Exception;

use ORB_Services\API\Stripe\StripeInvoice;
use ORB_Services\Database\DatabaseInvoice;

use WP_REST_Request;

class Invoice
{
    private $stripe_invoice;
    private $database_invoice;

    public function __construct($stripeClient)
    {
        $this->database_invoice = new DatabaseInvoice();
        $this->stripe_invoice = new StripeInvoice($stripeClient);

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/stripe/invoice/(?P<slug>[a-zA-Z0-9-_]+)', [
                'methods' => 'POST',
                'callback' => [$this, 'create_stripe_invoice'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/invoice/(?P<slug>[a-zA-Z0-9-_]+)', [
                'methods' => 'POST',
                'callback' => [$this, 'save_invoice'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/invoice/(?P<slug>[a-zA-Z0-9-_]+)', [
                'methods' => 'POST',
                'callback' => [$this, 'get_invoice'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/invoice/(?P<slug>[a-zA-Z0-9-_]+)/id', [
                'methods' => 'POST',
                'callback' => [$this, 'get_invoice_by_id'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/invoice/(?P<slug>[a-zA-Z0-9-_]+)/quoteid', [
                'methods' => 'POST',
                'callback' => [$this, 'get_invoice_by_quote_id'],
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

    public function create_stripe_invoice(WP_REST_Request $request)
    {
        try {
            $stripe_customer_id = $request->get_param('slug');
            $selections = $request['selections'];

            return $this->stripe_invoice->createStripeInvoice($stripe_customer_id, $selections);
        } catch (Exception $e) {

            $error_message = $e->getMessage();
            $status_code = $e->getCode();

            $response_data = [
                'message' => $error_message,
                'status' => $status_code
            ];

            $response = rest_ensure_response($response_data);
            $response->set_status($status_code);

            return $response;
        }
    }

    public function save_invoice(WP_REST_Request $request)
    {
        try {
            $stripe_invoice_id = $request->get_param('slug');
            $quote_id = $request['quote_id'];

            $stripe_invoice = $this->stripe_invoice->getStripeInvoice($stripe_invoice_id);
            $invoice_id = $this->database_invoice->saveInvoice($stripe_invoice, $quote_id);

            return rest_ensure_response($invoice_id);
        } catch (Exception $e) {

            $error_message = $e->getMessage();
            $status_code = $e->getCode();

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
        try {
            $stripe_invoice_id = $request->get_param('slug');
            $stripe_customer_id = $request['stripe_customer_id'];
error_log($stripe_invoice_id);
            $invoice = $this->database_invoice->getInvoice($stripe_invoice_id,  $stripe_customer_id);

            return rest_ensure_response($invoice);
        } catch (Exception $e) {

            $error_message = $e->getMessage();
            $status_code = $e->getCode();

            $response_data = [
                'message' => $error_message,
                'status' => $status_code
            ];

            $response = rest_ensure_response($response_data);
            $response->set_status($status_code);

            return $response;
        }
    }

    public function get_invoice_by_id(WP_REST_Request $request)
    {
        try {
            $id = $request->get_param('slug');
            $stripe_customer_id = $request['stripe_customer_id'];

            $invoice = $this->database_invoice->getInvoiceByID($id, $stripe_customer_id);

            return rest_ensure_response($invoice);
        } catch (Exception $e) {

            $error_message = $e->getMessage();
            $status_code = $e->getCode();

            $response_data = [
                'message' => $error_message,
                'status' => $status_code
            ];

            $response = rest_ensure_response($response_data);
            $response->set_status($status_code);

            return $response;
        }
    }

    public function get_invoice_by_quote_id(WP_REST_Request $request)
    {
        try {
            $quote_id = $request->get_param('slug');
            $stripe_customer_id = $request['stripe_customer_id'];

            $invoice = $this->database_invoice->getInvoiceByQuoteID($quote_id, $stripe_customer_id);

            return rest_ensure_response($invoice);
        } catch (Exception $e) {

            $error_message = $e->getMessage();
            $status_code = $e->getCode();

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
        try {
            $stripe_invoice_id = $request->get_param('slug');

            $stripe_invoice = $this->stripe_invoice->getStripeInvoice($stripe_invoice_id);

            return rest_ensure_response($stripe_invoice);
        } catch (Exception $e) {

            $error_message = $e->getMessage();
            $status_code = $e->getCode();

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
            $stripe_invoice_id = $request->get_param('slug');

            $stripe_invoice = $this->stripe_invoice->getStripeInvoice($stripe_invoice_id);
            $update_invoice = $this->database_invoice->updateInvoice($stripe_invoice);

            return rest_ensure_response($update_invoice);
        } catch (Exception $e) {

            $error_message = $e->getMessage();
            $status_code = $e->getCode();

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
            $stripe_invoice_id = $request->get_param('slug');

            $stripe_invoice = $this->stripe_invoice->getStripeInvoice($stripe_invoice_id);
            $update_invoice_status = $this->database_invoice->updateInvoiceStatus($stripe_invoice_id, $stripe_invoice->status);

            return rest_ensure_response($update_invoice_status);
        } catch (Exception $e) {

            $error_message = $e->getMessage();
            $status_code = $e->getCode();

            $response_data = [
                'message' => $error_message,
                'status' => $status_code
            ];

            $response = rest_ensure_response($response_data);
            $response->set_status($status_code);

            return $response;
        }
    }

    public function get_invoices()
    {
        try {
            $invoices = $this->database_invoice->getInvoices();

            return rest_ensure_response($invoices);
        } catch (Exception $e) {

            $error_message = $e->getMessage();
            $status_code = $e->getCode();

            $response_data = [
                'message' => $error_message,
                'status' => $status_code
            ];

            $response = rest_ensure_response($response_data);
            $response->set_status($status_code);

            return $response;
        }
    }

    public function get_client_invoices(WP_REST_Request $request)
    {
        try {
            $stripe_customer_id = $request->get_param('slug');

            $invoices = $this->database_invoice->getClientInvoices($stripe_customer_id);

            return rest_ensure_response($invoices);
        } catch (Exception $e) {

            $error_message = $e->getMessage();
            $status_code = $e->getCode();

            $response_data = [
                'message' => $error_message,
                'status' => $status_code
            ];

            $response = rest_ensure_response($response_data);
            $response->set_status($status_code);

            return $response;
        }
    }

    public function finalize_invoice(WP_REST_Request $request)
    {
        try {
            $stripe_invoice_id = $request->get_param('slug');
            $stripe_customer_id = $request['stripe_customer_id'];

            $quote = $this->database_invoice->getInvoice($stripe_invoice_id, $stripe_customer_id);
            $quote_id = $quote['quote_id'];

            $stripe_invoice = $this->stripe_invoice->finalizeInvoice($stripe_invoice_id);
            $invoice_id = $this->database_invoice->saveInvoice($stripe_invoice, $quote_id);

            return rest_ensure_response($invoice_id);
        } catch (Exception $e) {

            $error_message = $e->getMessage();
            $status_code = $e->getCode();

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
