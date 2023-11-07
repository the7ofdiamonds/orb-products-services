<?php

namespace ORB\Products_Services\API\Stripe;

use ORB\Products_Services\API\Stripe\StripeQuote;
use ORB\Products_Services\API\Stripe\StripeInvoice;
use ORB\Products_Services\API\Stripe\StripePaymentIntents;
use ORB\Products_Services\API\Stripe\StripeCharges;
use ORB\Products_Services\API\Stripe\StripePaymentMethods;
use ORB\Products_Services\API\Stripe\StripeProducts;
use ORB\Products_Services\API\Stripe\StripePrices;
use ORB\Products_Services\API\Stripe\StripeCustomers;


use ORB\Products_Services\API\Service;
use ORB\Products_Services\API\Services;
use ORB\Products_Services\API\Product;
use ORB\Products_Services\API\Products;
use ORB\Products_Services\API\Clients;
use ORB\Products_Services\API\Customers;
use ORB\Products_Services\API\Quote;
use ORB\Products_Services\API\Invoice;
use ORB\Products_Services\API\Payment;
use ORB\Products_Services\API\Receipt;

use ORB\Products_Services\Post_Types\Products\Products as PT_Products;
use ORB\Products_Services\Post_Types\Services\Services as PT_Services;

use PHPMailer\PHPMailer\PHPMailer;

class Stripe
{
    public function __construct($stripeClient)
    {
        new PT_Products($stripeClient);
        new PT_Services($stripeClient);

        $stripe_payment_intent = new StripePaymentIntents($stripeClient);
        $stripe_charges = new StripeCharges($stripeClient);
        $stripe_payment_methods = new StripePaymentMethods($stripeClient);
        $stripe_products = new StripeProducts($stripeClient);
        $stripe_prices = new StripePrices($stripeClient);

        new Service($stripe_products, $stripe_prices);
        new Services($stripe_products, $stripe_prices);
        new Product($stripe_products, $stripe_prices);
        new Products($stripe_products, $stripe_prices);
    }
}
