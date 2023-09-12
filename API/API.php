<?php

namespace ORB_Services\API;

use ORB_Services\API\Google\Google;
use ORB_Services\API\Stripe\Stripe;
use ORB_Services\API\Schedule;

use ORB_Services\API\Stripe\StripeQuote;
use ORB_Services\API\Stripe\StripeInvoice;
use ORB_Services\API\Stripe\StripePaymentIntents;
use ORB_Services\API\Stripe\StripeCharges;
use ORB_Services\API\Stripe\StripePaymentMethods;
use ORB_Services\API\Stripe\StripeProducts;
use ORB_Services\API\Stripe\StripePrices;
use ORB_Services\API\Stripe\StripeCustomers;

use ORB_Services\Database\DatabaseClient;
use ORB_Services\Database\DatabaseCustomer;
use ORB_Services\Database\DatabaseQuote;
use ORB_Services\Database\DatabaseInvoice;
use ORB_Services\Database\DatabaseReceipt;

use ORB_Services\Email\Email as EmailTemplate;
use ORB_Services\Email\EmailContact;
use ORB_Services\Email\EmailSupport;
use ORB_Services\Email\EmailQuote;
use ORB_Services\Email\EmailInvoice;
use ORB_Services\Email\EmailReceipt;
use ORB_Services\Email\EmailSchedule;

use ORB_Services\PDF\PDF;

use PHPMailer\PHPMailer\PHPMailer;

class API
{
    public function __construct($credentialsPath, $stripeClient, $mailer)
    {
        add_action('rest_api_init', [$this, 'add_to_rest_api']);
        add_action('rest_api_init', [$this, 'allow_cors_headers']);

        new Google($credentialsPath);
        new Stripe($stripeClient);
        new Schedule($credentialsPath);

        $stripe_quote = new StripeQuote($stripeClient);
        $stripe_invoice = new StripeInvoice($stripeClient);
        $stripe_payment_intent = new StripePaymentIntents($stripeClient);
        $stripe_charges = new StripeCharges($stripeClient);
        $stripe_payment_methods = new StripePaymentMethods($stripeClient);
        $stripe_products = new StripeProducts($stripeClient);
        $stripe_prices = new StripePrices($stripeClient);
        $stripe_customers = new StripeCustomers($stripeClient);

        global $wpdb;
        $client_database = new DatabaseClient($wpdb);
        $customer_database = new DatabaseCustomer($wpdb);
        $quote_database = new DatabaseQuote($wpdb);
        $invoice_database = new DatabaseInvoice($wpdb);
        $receipt_database = new DatabaseReceipt($wpdb);

        $pdf = new PDF();
        $mailer = new PHPMailer();

        $email = new EmailTemplate();
        $contact_email = new EmailContact($email, $mailer);
        $support_email = new EmailSupport($email, $mailer);
        $schedule_email = new EmailSchedule($email, $mailer);
        $quote_email = new EmailQuote($quote_database, $stripe_quote, $stripe_customers, $email, $pdf, $mailer);
        $invoice_email = new EmailInvoice($invoice_database, $stripe_invoice, $email, $pdf, $mailer);
        $receipt_email = new EmailReceipt($receipt_database, $stripe_invoice, $email, $pdf, $mailer);
        new Email(
            $contact_email,
            $support_email,
            $schedule_email,
            $quote_email,
            $invoice_email,
            $receipt_email
        );

        new Invoice($invoice_database, $stripe_invoice);
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
