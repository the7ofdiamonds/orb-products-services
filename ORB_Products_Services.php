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

namespace ORB\Products_Services;

require_once 'vendor/autoload.php';

defined('ABSPATH') or die('Hey, what are you doing here? You silly human!');
define('ORB_PRODUCTS_SERVICES', WP_PLUGIN_DIR . '/orb-products-services/');
define('ORB_PRODUCTS_SERVICES_URL', WP_PLUGIN_URL . '/orb-products-services/');

use Dotenv\Dotenv;

use ORB\Products_Services\Admin\Admin;
use ORB\Products_Services\API\Email;
use ORB\Products_Services\API\Product;
use ORB\Products_Services\API\Products;
use ORB\Products_Services\API\Service;
use ORB\Products_Services\API\Services;
use ORB\Products_Services\API\Payment;
use ORB\Products_Services\API\Stripe\Stripe;
use ORB\Products_Services\API\Stripe\StripeCharges;
use ORB\Products_Services\API\Stripe\StripeProducts;
use ORB\Products_Services\API\Stripe\StripePrices;
use ORB\Products_Services\API\Stripe\StripePaymentMethods;
use ORB\Products_Services\API\Stripe\StripePaymentIntents;
use ORB\Products_Services\CSS\CSS;
use ORB\Products_Services\Email\EmailContact;
use ORB\Products_Services\Email\EmailSupport;
use ORB\Products_Services\JS\JS;
use ORB\Products_Services\Pages\Pages;
use ORB\Products_Services\PDF\PDF;
use ORB\Products_Services\Roles\Roles;
use ORB\Products_Services\Shortcodes\Shortcodes;
use ORB\Products_Services\Database\Database;
use ORB\Products_Services\Templates\Templates;

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
        new Roles;
        new Shortcodes;
        new Database;
        new Templates;

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

            new Service($stripe_products, $stripe_prices);
            new Services($stripe_products, $stripe_prices);
            new Product($stripe_products, $stripe_prices);
            new Products($stripe_products, $stripe_prices);

            $pdf = new PDF;
        } else {
            error_log('Stripe Secret Key is required.');
        }
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