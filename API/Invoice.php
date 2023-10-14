<?php

namespace ORB_Services\API;

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
                'methods' => 'GET',
                'callback' => [$this, 'get_invoice_by_id'],
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
        $stripe_customer_id = $request->get_param('slug');
        $selections = $request['selections'];

        return $this->stripe_invoice->createStripeInvoice($stripe_customer_id, $selections);
    }

    public function save_invoice(WP_REST_Request $request)
    {
        $stripe_invoice_id = $request->get_param('slug');
        $quote_id = $request['quote_id'];

        $stripe_invoice = $this->stripe_invoice->getStripeInvoice($stripe_invoice_id);

        if (is_object($stripe_invoice) && property_exists($stripe_invoice, 'object')) {
            $invoice_id = $this->database_invoice->saveInvoice($stripe_invoice, $quote_id);

            return rest_ensure_response($invoice_id);
        } else {
            $error_message = $stripe_invoice->get_data()['message'];
            $status_code = $stripe_invoice->get_data()['status'];

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
        $id = $request->get_param('slug');

        return $this->database_invoice->getInvoiceByID($id);
    }

    public function get_stripe_invoice(WP_REST_Request $request)
    {
        $stripe_invoice_id = $request->get_param('slug');

        $stripe_invoice = $this->stripe_invoice->getStripeInvoice($stripe_invoice_id);

        return $stripe_invoice;
    }

    function update_invoice(WP_REST_Request $request)
    {
        $stripe_invoice_id = $request->get_param('slug');

        $stripe_invoice = $this->stripe_invoice->getStripeInvoice($stripe_invoice_id);

        return $this->database_invoice->updateInvoice($stripe_invoice);
    }

    function update_invoice_status(WP_REST_Request $request)
    {
        $stripe_invoice_id = $request->get_param('slug');

        $stripe_invoice = $this->stripe_invoice->getStripeInvoice($stripe_invoice_id);

        return $this->database_invoice->updateInvoiceStatus($stripe_invoice_id, $stripe_invoice->status);
    }

    public function get_invoices()
    {
        return $this->database_invoice->getInvoices();
    }

    public function get_client_invoices(WP_REST_Request $request)
    {
        $stripe_customer_id = $request->get_param('slug');

        $invoices = $this->database_invoice->getClientInvoices($stripe_customer_id);

        return rest_ensure_response($invoices);
    }

    public function finalize_invoice(WP_REST_Request $request)
    {
        $stripe_invoice_id = $request->get_param('slug');
        $quote_id = $request['quote_id'];

        $stripe_invoice = $this->stripe_invoice->finalizeInvoice($stripe_invoice_id);

        return $this->database_invoice->saveInvoice($stripe_invoice, $quote_id);
    }
}
