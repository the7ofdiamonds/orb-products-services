<?php

/*
 * Plugin Name: ORB Services
*/

namespace ORB_Services;

require_once 'vendor/autoload.php';

defined('ABSPATH') or die('Hey, what are you doing here? You silly human!');
define('ORB_SERVICES', WP_PLUGIN_DIR . '/orb-services/');
define('ORB_SERVICES_URL', WP_PLUGIN_URL . '/orb-services/');

use Dotenv\Dotenv;

use ORB_Services\Admin\Admin;
use ORB_Services\API\API;
use ORB_Services\CSS\CSS;
use ORB_Services\Email\Email;
use ORB_Services\JS\JS;
use ORB_Services\Menus\Menus;
use ORB_Services\Pages\Pages;
use ORB_Services\Post_Types\Services;
use ORB_Services\Roles\Roles;
use ORB_Services\Shortcodes\Shortcodes;
use ORB_Services\Database\Tables\Tables;
use ORB_Services\Templates\Templates;

use Stripe\Stripe;
use Stripe\StripeClient;

class ORB_Services
{
    public $plugin;

    public function __construct()
    {
        $this->plugin = plugin_basename(__FILE__);
        add_filter("plugin_action_links_$this->plugin", [$this, 'settings_link']);

        new Admin;

        $credentialsPath = ORB_SERVICES . 'serviceAccount.json';

        if (file_exists($credentialsPath)) {
            $jsonFileContents = file_get_contents($credentialsPath);

            if ($jsonFileContents !== false) {
                $decodedData = json_decode($jsonFileContents, true);

                if (json_last_error() === JSON_ERROR_NONE && is_array($decodedData)) {
                    if (
                        isset($decodedData['type']) && $decodedData['type'] === 'service_account' &&
                        isset($decodedData['project_id']) &&
                        isset($decodedData['private_key_id']) &&
                        isset($decodedData['private_key']) &&
                        isset($decodedData['client_email'])
                    ) {
                        $credentialsPath = ORB_SERVICES . 'serviceAccount.json';
                    } else {
                        error_log('This is not a valid service account JSON');
                        $credentialsPath = null;
                    }
                } else {
                    error_log('Failed to decode JSON');
                    $credentialsPath = null;
                }
            } else {
                error_log('Failed to read file contents');
                $credentialsPath = null;
            }
        } else {
            error_log('File does not exist');
            $credentialsPath = null;
        }

        $dotenv = Dotenv::createImmutable(ORB_SERVICES);
        $dotenv->load(__DIR__);
        $envFilePath = ORB_SERVICES . '.env'; // Replace with the actual path to your .env file
        $envContents = file_get_contents($envFilePath);
        $lines = explode("\n", $envContents);
        $stripeSecretKey = null;

        // Loop through each line to find the STRIPE_SECRET_KEY
        foreach ($lines as $line) {
            $parts = explode('=', $line, 2);
            if (count($parts) === 2 && $parts[0] === 'STRIPE_SECRET_KEY') {
                $stripeSecretKey = trim($parts[1]);
                break;
            }
        }

        if ($credentialsPath !== null && $stripeSecretKey !== null) {
            Stripe::setApiKey($stripeSecretKey);
            $stripeClient = new StripeClient($stripeSecretKey);

            new API($credentialsPath, $stripeClient);
            new Services($stripeClient);
        }

        new CSS;
		// new Email;
        new JS;
        new Pages;
        new Roles;
        new Shortcodes;
        new Tables;
        new Templates;
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

$orb_services = new ORB_Services();
register_activation_hook(__FILE__, [$orb_services, 'activate']);
// register_deactivation_hook( __FILE__, [ $thfw, 'deactivate' ]);

$orb_services_pages = new Pages();
register_activation_hook(__FILE__, [$orb_services_pages, 'add_pages']);
register_activation_hook(__FILE__, [$orb_services_pages, 'add_services_subpages']);

$orb_services_menus = new Menus();
register_activation_hook(__FILE__, [$orb_services_menus, 'create_mobile_menu']);
