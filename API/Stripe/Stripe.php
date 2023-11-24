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

use ORB\Products_Services\Post_Types\Services\Services as PT_Services;
use ORB\Products_Services\Post_Types\Services\ServicesStripe;
use ORB\Products_Services\Post_Types\Products\Products as PT_Products;

use PHPMailer\PHPMailer\PHPMailer;

class Stripe
{
    public function __construct($stripeClient)
    {
        // new PT_Products($stripeClient);
        new PT_Services($stripeClient);
        new ServicesStripe($stripeClient);

        $stripe_payment_intent = new StripePaymentIntents($stripeClient);
        $stripe_charges = new StripeCharges($stripeClient);
        $stripe_payment_methods = new StripePaymentMethods($stripeClient);
        $stripe_products = new StripeProducts($stripeClient);
        $stripe_prices = new StripePrices($stripeClient);

        $clients = new Clients($stripeClient);
        $service = new Service($stripe_products, $stripe_prices);
        $services = new Services($stripe_products, $stripe_prices);
        $product = new Product($stripe_products, $stripe_prices);
        $products = new Products($stripe_products, $stripe_prices);

        register_rest_route('orb/services/v1', '/users/clients', [
            'methods' => 'POST',
            'callback' => [$clients, 'add_client'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('orb/services/v1', '/users/client/(?P<slug>[a-zA-Z0-9-_%.]+)', [
            'methods' => 'GET',
            'callback' => [$clients, 'get_client'],
            'permission_callback' => '__return_true',
        ]);
    }
}
