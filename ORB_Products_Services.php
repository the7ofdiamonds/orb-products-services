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

use ORB\Products_Services\Admin\Admin;
use ORB\Products_Services\API\API;
use ORB\Products_Services\CSS\Customizer\Customizer;
use ORB\Products_Services\Database\Database;
use ORB\Products_Services\Pages\Pages;
use ORB\Products_Services\Post_Types\Post_Types;
use ORB\Products_Services\Roles\Roles;
use ORB\Products_Services\Router\Router;
use ORB\Products_Services\Shortcodes\Shortcodes;
use ORB\Products_Services\Templates\Templates;

class ORB_Products_Services
{
    public $plugin;

    public function __construct()
    {
        $this->plugin = plugin_basename(__FILE__);
        add_filter("plugin_action_links_$this->plugin", [$this, 'settings_link']);

        add_action('admin_init', function () {
            new Admin;
        });

        add_action('rest_api_init', function () {
            new API();
            (new API())->allow_cors_headers();
        });

        add_action('init', function () {
            (new Post_Types)->custom_post_types();
            (new Router)->load_page();
            (new Router)->react_rewrite_rules();
            new Shortcodes;
            // (new Taxonomies)->custom_taxonomy();
            new Templates;
        });

        add_action('customize_register', [(new Customizer), 'register_customizer_panel']);

        add_filter('query_vars', [(new Pages), 'add_query_vars']);
    }

    public function activate()
    {
        flush_rewrite_rules();
        (new Database)->createTables();
        (new Pages)->add_pages();
        // (new Roles)->add_roles();
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

// $orb_services_post_types = new Post_Types();
// register_activation_hook(__FILE__, [$orb_services_post_types, 'custom_post_types']);
