<?php

namespace ORB_Services\API\Stripe;

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

use ORB_Services\Email\Email;
use ORB_Services\Email\EmailContact;
use ORB_Services\Email\EmailSupport;
use ORB_Services\Email\EmailSchedule;
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

use PHPMailer\PHPMailer\PHPMailer;

class Stripe
{
    public function __construct($stripeClient)
    {
        $stripe_payment_intent = new StripePaymentIntents($stripeClient);
        $stripe_charges = new StripeCharges($stripeClient);
        $stripe_payment_methods = new StripePaymentMethods($stripeClient);
        $stripe_products = new StripeProducts($stripeClient);
        $stripe_prices = new StripePrices($stripeClient);

        new Payment($stripe_payment_intent, $stripe_payment_methods);

        new Service($stripe_products, $stripe_prices);
        new Services($stripe_products, $stripe_prices);
        new Product($stripe_products, $stripe_prices);
        new Products($stripe_products, $stripe_prices);


    }
}
