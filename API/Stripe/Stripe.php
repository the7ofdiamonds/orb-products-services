<?php

namespace ORB_Products_Services\API\Stripe;

use ORB_Products_Services\API\Stripe\StripeQuote;
use ORB_Products_Services\API\Stripe\StripeInvoice;
use ORB_Products_Services\API\Stripe\StripePaymentIntents;
use ORB_Products_Services\API\Stripe\StripeCharges;
use ORB_Products_Services\API\Stripe\StripePaymentMethods;
use ORB_Products_Services\API\Stripe\StripeProducts;
use ORB_Products_Services\API\Stripe\StripePrices;
use ORB_Products_Services\API\Stripe\StripeCustomers;


use ORB_Products_Services\API\Service;
use ORB_Products_Services\API\Services;
use ORB_Products_Services\API\Product;
use ORB_Products_Services\API\Products;
use ORB_Products_Services\API\Clients;
use ORB_Products_Services\API\Customers;
use ORB_Products_Services\API\Quote;
use ORB_Products_Services\API\Invoice;
use ORB_Products_Services\API\Payment;
use ORB_Products_Services\API\Receipt;

use ORB_Products_Services\Post_Types\Products\Products as PT_Products;
use ORB_Products_Services\Post_Types\Services\Services as PT_Services;

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

        new Payment($stripe_payment_intent, $stripe_payment_methods);

        new Service($stripe_products, $stripe_prices);
        new Services($stripe_products, $stripe_prices);
        new Product($stripe_products, $stripe_prices);
        new Products($stripe_products, $stripe_prices);
    }
}
