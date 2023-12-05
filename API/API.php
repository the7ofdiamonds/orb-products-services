<?php

namespace ORB\Products_Services\API;

use ORB\Products_Services\API\Stripe\StripeQuote;
use ORB\Products_Services\API\Stripe\StripeInvoice;
use ORB\Products_Services\API\Stripe\StripePaymentIntents;
use ORB\Products_Services\API\Stripe\StripeCharges;
use ORB\Products_Services\API\Stripe\StripePaymentMethods;
use ORB\Products_Services\API\Stripe\StripeProducts;
use ORB\Products_Services\API\Stripe\StripePrices;
use ORB\Products_Services\API\Stripe\StripeCustomers;

use ORB\Products_Services\Post_Types\Services\Services as PT_Services;
use ORB\Products_Services\Post_Types\Services\ServicesStripe;
use ORB\Products_Services\Post_Types\Products\Products as PT_Products;

use Dotenv\Dotenv;

use PHPMailer\PHPMailer\PHPMailer;

use Stripe\Stripe as StripeAPI;
use Stripe\StripeClient;

class API
{
    public function __construct()
    {
        $dotenv = Dotenv::createImmutable(ORB_PRODUCTS_SERVICES);
        $dotenv->load(__DIR__);
        $envFilePath = ORB_PRODUCTS_SERVICES . '.env';
        $envContents = file_get_contents($envFilePath);
        $lines = explode("\n", $envContents);
        $stripeSecretKey = null;

        foreach ($lines as $line) {
            $parts = explode('=', $line, 2);
            if (count($parts) === 2 && $parts[0] === 'STRIPE_SECRET_KEY') {
                $stripeSecretKey = trim($parts[1]);
                break;
            }
        }

        if ($stripeSecretKey !== null) {
            StripeAPI::setApiKey($stripeSecretKey);
            $stripeClient = new StripeClient($stripeSecretKey);
        } else {
            error_log('Stripe Secret Key is required.');
        }

        $mailer = new PHPMailer();

        // new PT_Products($stripeClient);
        new PT_Services($stripeClient);
        new ServicesStripe($stripeClient);

        $stripe_payment_intent = new StripePaymentIntents($stripeClient);
        $stripe_charges = new StripeCharges($stripeClient);
        $stripe_payment_methods = new StripePaymentMethods($stripeClient);
        $stripe_products = new StripeProducts($stripeClient);
        $stripe_prices = new StripePrices($stripeClient);

        $clients = new Clients($stripeClient);
        $customer = new Customer($stripeClient);
        $email = new Email($stripeClient, $mailer);
        $product = new Product($stripe_products, $stripe_prices);
        $products = new Products($stripe_products, $stripe_prices);
        $service = new Service($stripe_products, $stripe_prices);
        $services = new Services($stripe_products, $stripe_prices);

        register_rest_route('orb/clients/v1', '/users', array(
            'methods' => 'POST',
            'callback' => array($clients, 'add_client'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route('orb/clients/v1', '/users/(?P<slug>[a-zA-Z0-9-_%.]+)', array(
            'methods' => 'GET',
            'callback' => array($clients, 'get_client'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route('orb/customer/v1', '/stripe', array(
            'methods' => 'POST',
            'callback' => array($customer, 'add_stripe_customer'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route('orb/customer/v1', '/stripe/(?P<slug>[a-zA-Z0-9-_]+)', array(
            'methods' => 'GET',
            'callback' => array($customer, 'get_stripe_customer'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route('orb/customer/v1', '/stripe/(?P<slug>[a-zA-Z0-9-_]+)', array(
            'methods' => 'PATCH',
            'callback' => array($customer, 'update_stripe_customer'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route('orb/email/v1', '/contact', array(
            'methods' => 'POST',
            'callback' => array($email, 'send_contact_email'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route('orb/email/v1', '/support', array(
            'methods' => 'POST',
            'callback' => array($email, 'send_support_email'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route('orb/email/v1', '/schedule', array(
            'methods' => 'POST',
            'callback' => array($email, 'send_schedule_email'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route('orb/product/v1', '/(?P<slug>[a-z0-9-]+)', array(
            'methods' => 'GET',
            'callback' => array($product, 'get_product'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route('orb/products/v1', '/available', array(
            'methods' => 'GET',
            'callback' => array($products, 'get_products_available'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route('orb/products/v1', '/all', array(
            'methods' => 'GET',
            'callback' => array($products, 'get_products'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route('orb/services/v1', '/all', array(
            'methods' => 'GET',
            'callback' => array($services, 'get_services'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route('orb/service/v1', '/(?P<slug>[a-z0-9-]+)', array(
            'methods' => 'GET',
            'callback' => array($service, 'get_service'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route('orb/services/v1', '/available', array(
            'methods' => 'GET',
            'callback' => array($services, 'get_services_available'),
            'permission_callback' => '__return_true',
        ));
    }

    public function allow_cors_headers()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
    }
}
