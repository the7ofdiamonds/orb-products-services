<?php

namespace ORB_Services\API;

use ORB_Services\API\Stripe\StripeQuote;
use ORB_Services\API\Stripe\StripeInvoice;

use ORB_Services\Database\DatabaseQuote;
use ORB_Services\Database\DatabaseInvoice;
use ORB_Services\Database\DatabaseReceipt;

use ORB_Services\Email\EmailQuote;
use ORB_Services\Email\EmailInvoice;
use ORB_Services\Email\EmailReceipt;

use ORB_Services\API\Schedule;
use ORB_Services\API\Services;
use ORB_Services\API\Service;
use ORB_Services\API\Clients;
use ORB_Services\API\Customers;
use ORB_Services\API\Quote;
use ORB_Services\API\Invoice;
use ORB_Services\API\Payment;
use ORB_Services\API\Receipt;

use ORB_Services\API\Stripe\Stripe;

class API
{
    public function __construct($credentialsPath, $stripeClient)
    {
        add_action('rest_api_init', [$this, 'add_to_rest_api']);
        add_action('rest_api_init', [$this, 'allow_cors_headers']);

        $tax_enabled = get_option('stripe_automatic_tax_enabled');
        $list_limit = get_option('stripe_list_limit');

        $stripe_quote = new StripeQuote($stripeClient, $tax_enabled, $list_limit);
        $stripe_invoice = new StripeInvoice($stripeClient, $tax_enabled, $list_limit);

        $database_quote = new DatabaseQuote;
        $database_invoice = new DatabaseInvoice;
        $database_receipt = new DatabaseReceipt;

        $email_quote = new EmailQuote($stripe_quote, $database_quote);
        $email_invoice = new EmailInvoice($stripe_invoice, $database_invoice);
        $email_receipt = new EmailReceipt($stripe_invoice, $database_receipt);
        new Email($email_quote, $email_invoice, $email_receipt);

        new Quote($stripe_quote, $database_quote);
        new Invoice($stripe_invoice, $database_invoice);
        new Receipt($stripe_invoice, $database_receipt);

        new Stripe($stripeClient);
        new Services($stripeClient);
        new Service($stripeClient);
        new Clients($stripeClient);
        new Customers($stripeClient);
        new Payment($stripeClient);

        new Schedule($credentialsPath);
    }

    public function add_to_rest_api()
    {
        register_meta(
            'post',
            '_service_cost',
            [
                'type' => 'number',
                'description' => 'Service Cost',
                'single' => true,
                'show_in_rest' => true
            ]
        );

        register_meta(
            'post',
            '_service_features',
            [
                'type' => 'string',
                'description' => 'Service Features',
                'single' => true,
                'show_in_rest' => true
            ]
        );

        register_meta(
            'post',
            '_service_description',
            [
                'type' => 'string',
                'description' => 'Service Description',
                'single' => true,
                'show_in_rest' => true
            ]
        );

        register_meta(
            'post',
            '_service_features',
            [
                'type' => 'string',
                'description' => 'Service Features',
                'single' => true,
                'show_in_rest' => true
            ]
        );

        register_meta(
            'post',
            '_service_price_id',
            [
                'type' => 'string',
                'description' => 'Service Price ID',
                'single' => true,
                'show_in_rest' => true
            ]
        );
    }

    public function allow_cors_headers()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
    }
}
