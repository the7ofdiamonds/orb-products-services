<?php

/**
 * @package ORB Products & Services
 */
/*
Plugin Name: ORB Products & Services
Plugin URI: 
Description: Products & Services
Version: 1.0.0
Author: THE7OFDIAMONDS.TECH
Author URI: http://THE7OFDIAMONDS.TECH
License: 
Text Domain: seven-tech
*/

namespace ORB_Products_Services;

require_once 'vendor/autoload.php';

defined('ABSPATH') or die('Hey, what are you doing here? You silly human!');
define('ORB_PRODUCTS_SERVICES', WP_PLUGIN_DIR . '/orb-products-services/');
define('ORB_PRODUCTS_SERVICES_URL', WP_PLUGIN_URL . '/orb-products-services/');

use Dotenv\Dotenv;

use ORB_Products_Services\Admin\Admin;
use ORB_Products_Services\API\Email;
use ORB_Products_Services\API\Clients;
use ORB_Products_Services\API\Customers;
use ORB_Products_Services\API\Product;
use ORB_Products_Services\API\Products;
use ORB_Products_Services\API\Service;
use ORB_Products_Services\API\Services;
use ORB_Products_Services\API\Quote;
use ORB_Products_Services\API\Invoice;
use ORB_Products_Services\API\Receipt;
use ORB_Products_Services\API\Payment;
use ORB_Products_Services\API\Stripe\Stripe;
use ORB_Products_Services\API\Stripe\StripeCharges;
use ORB_Products_Services\API\Stripe\StripeProducts;
use ORB_Products_Services\API\Stripe\StripePrices;
use ORB_Products_Services\API\Stripe\StripePaymentMethods;
use ORB_Products_Services\API\Stripe\StripePaymentIntents;
use ORB_Products_Services\CSS\CSS;
use ORB_Products_Services\Email\EmailContact;
use ORB_Products_Services\Email\EmailInvoice;
use ORB_Products_Services\Email\EmailQuote;
use ORB_Products_Services\Email\EmailReceipt;
use ORB_Products_Services\Email\EmailOnboarding;
use ORB_Products_Services\Email\EmailSchedule;
use ORB_Products_Services\Email\EmailSupport;
use ORB_Products_Services\JS\JS;
use ORB_Products_Services\Menus\Menus;
use ORB_Products_Services\Pages\Pages;
use ORB_Products_Services\PDF\PDF;
use ORB_Products_Services\Post_Types\Post_Types;
use ORB_Products_Services\Roles\Roles;
use ORB_Products_Services\Shortcodes\Shortcodes;
use ORB_Products_Services\Database\Database;
use ORB_Products_Services\Templates\Templates;

use Stripe\Stripe as StripeAPI;
use Stripe\StripeClient;

use PHPMailer\PHPMailer\PHPMailer;

class ORB_Products_Services
{
    public $plugin;

    public function __construct()
    {
        $this->plugin = plugin_basename(__FILE__);
        add_filter("plugin_action_links_$this->plugin", [$this, 'settings_link']);

        new Admin;
        new CSS;
        new JS;
        new Pages;
        new Post_Types;
        new Roles;
        new Shortcodes;
        new Database;
        new Templates;

        // $credentialsPath = ORB_PRODUCTS_SERVICES . 'serviceAccount.json';

        // if (file_exists($credentialsPath)) {
        //     $jsonFileContents = file_get_contents($credentialsPath);

        //     if ($jsonFileContents !== false) {
        //         $decodedData = json_decode($jsonFileContents, true);

        //         if (json_last_error() === JSON_ERROR_NONE && is_array($decodedData)) {
        //             if (
        //                 isset($decodedData['type']) && $decodedData['type'] === 'service_account' &&
        //                 isset($decodedData['project_id']) &&
        //                 isset($decodedData['private_key_id']) &&
        //                 isset($decodedData['private_key']) &&
        //                 isset($decodedData['client_email'])
        //             ) {
        //                 $credentialsPath = ORB_PRODUCTS_SERVICES . 'serviceAccount.json';
        //             } else {
        //                 error_log('This is not a valid service account JSON');
        //                 $credentialsPath = null;
        //             }
        //         } else {
        //             error_log('Failed to decode JSON');
        //             $credentialsPath = null;
        //         }
        //     } else {
        //         error_log('Failed to read file contents');
        //         $credentialsPath = null;
        //     }
        // } else {
        //     error_log('File does not exist');
        //     $credentialsPath = null;
        // }

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

        $mailer = new PHPMailer();
        new EmailContact($mailer);
        new EmailSupport($mailer);
        new EmailSchedule($mailer);

        if ($stripeSecretKey !== null) {
            StripeAPI::setApiKey($stripeSecretKey);
            $stripeClient = new StripeClient($stripeSecretKey);

            new Email($stripeClient, $mailer);

            new Stripe($stripeClient);

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

            new Clients($stripeClient);
            new Customers($stripeClient);
            new Quote($stripeClient);
            new Invoice($stripeClient);
            new Receipt($stripeClient);

            $pdf = new PDF;
            new EmailQuote($stripeClient, $mailer);
            new EmailInvoice($stripeClient, $mailer);
            new EmailReceipt($stripeClient, $mailer);
            new EmailOnboarding($stripeClient, $mailer);
        } else {
            error_log('Stripe Secret Key is required.');
        }

        // if ($credentialsPath !== null) {
        //     new Google($credentialsPath);
        // } else {
        //     error_log('A path to the Google Service Account file is required.');
        // }
    }

    public function activate()
    {
        flush_rewrite_rules();
    }

    public function settings_link($links)
    {
        $settings_link = '<a href="' . admin_url('admin.php?page=orb_services') . '">Settings</a>';
        array_push($links, $settings_link);

        return $links;
    }
}

$orb_services = new ORB_Products_Services();
register_activation_hook(__FILE__, [$orb_services, 'activate']);
// register_deactivation_hook( __FILE__, [ $thfw, 'deactivate' ]);

$orb_services_pages = new Pages();
// register_activation_hook(__FILE__, [$orb_services_pages, 'add_pages']);
// register_activation_hook(__FILE__, [$orb_services_pages, 'add_billing_subpages']);
// register_activation_hook(__FILE__, [$orb_services_pages, 'add_payment_subpages']);
// register_activation_hook(__FILE__, [$orb_services_pages, 'add_client_subpages']);
// register_activation_hook(__FILE__, [$orb_services_pages, 'add_contact_subpage']);
