<?php

namespace ORB_Services\API\Stripe;

use WP_REST_Request;

use ORB_Services\API\Stripe\StripeQuote;
use ORB_Services\API\Stripe\StripeInvoice;
use ORB_Services\API\Stripe\StripePaymentIntents;
use ORB_Services\API\Stripe\StripeCharges;
use ORB_Services\API\Stripe\StripePaymentMethods;
use ORB_Services\API\Stripe\StripeProducts;
use ORB_Services\API\Stripe\StripePrices;
use ORB_Services\API\Stripe\StripeCustomers;

use ORB_Services\Database\DatabaseQuote;
use ORB_Services\Database\DatabaseInvoice;
use ORB_Services\Database\DatabaseReceipt;

use ORB_Services\Email\Email;
use ORB_Services\Email\EmailQuote;
use ORB_Services\Email\EmailInvoice;
use ORB_Services\Email\EmailReceipt;

use ORB_Services\API\Service;
use ORB_Services\API\Services;
use ORB_Services\API\Product;
use ORB_Services\API\Products;
use ORB_Services\API\Clients;
use ORB_Services\API\Customers;
use ORB_Services\API\Quote;
use ORB_Services\API\Invoice;
use ORB_Services\API\Payment;
use ORB_Services\API\Receipt;

class Stripe
{
    private $stripeClient;

    public function __construct($stripeClient)
    {
        $tax_enabled = get_option('stripe_automatic_tax_enabled');
        $list_limit = get_option('stripe_list_limit');

        $stripe_quote = new StripeQuote($stripeClient, $tax_enabled, $list_limit);
        $stripe_invoice = new StripeInvoice($stripeClient, $tax_enabled, $list_limit);
        $stripe_payment_intent = new StripePaymentIntents($stripeClient, $list_limit);
        $stripe_charges = new StripeCharges($stripeClient, $list_limit);
        $stripe_payment_methods = new StripePaymentMethods($stripeClient, $list_limit);
        $stripe_products = new StripeProducts($stripeClient, $list_limit);
        $stripe_prices = new StripePrices($stripeClient, $list_limit);
        $stripe_customers = new StripeCustomers($stripeClient);

        $database_quote = new DatabaseQuote;
        $database_invoice = new DatabaseInvoice;
        $database_receipt = new DatabaseReceipt;

        $email_quote = new EmailQuote($stripe_quote, $database_quote);
        $email_invoice = new EmailInvoice($stripe_invoice, $database_invoice);
        $email_receipt = new EmailReceipt($stripe_invoice, $database_receipt);
        new Email($email_quote, $email_invoice, $email_receipt);

        new Quote($stripe_quote, $database_quote);
        new Invoice($stripe_invoice, $database_invoice);
        new Receipt($stripe_invoice, $stripe_payment_intent, $stripe_charges, $database_receipt);
        new Payment($stripe_payment_intent, $stripe_payment_methods);

        new Service($stripe_products, $stripe_prices);
        new Services($stripe_products, $stripe_prices);
        new Product($stripe_products, $stripe_prices);
        new Products($stripe_products, $stripe_prices);

        new Clients($stripe_customers);
        new Customers($stripe_customers);

    }
}
