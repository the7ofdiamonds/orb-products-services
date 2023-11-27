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
use ORB\Products_Services\CSS\CSS;
use ORB\Products_Services\JS\JS;
use ORB\Products_Services\Database\Database;
use ORB\Products_Services\Pages\Pages;
use ORB\Products_Services\Post_Types\Post_Types;
use ORB\Products_Services\Roles\Roles;
use ORB\Products_Services\Router\Router;
use ORB\Products_Services\Shortcodes\Shortcodes;
use ORB\Products_Services\Taxonomies\Taxonomies;
use ORB\Products_Services\Templates\Templates;

class ORB_Products_Services
{
    public $pages;
    public $plugin;
    public $css;
    public $js;
    public $posttypes;
    public $router;
    public $templates;

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

        $css = new CSS;
        $js = new JS;
        $this->pages = new Pages;

        add_action('init', function () use ($css, $js) {
            $posttypes = new Post_Types;
            $posttypes->custom_post_types();
            $taxonomies = new Taxonomies;
            $taxonomies->custom_taxonomy();
            $templates = new Templates(
                $css,
                $js,
            );
            $router = new Router(
                $this->pages,
                $posttypes,
                $taxonomies,
                $templates
            );
            $router->load_page();
            $router->react_rewrite_rules();
            new Shortcodes;
        });

        add_action('customize_register', [(new Customizer), 'register_customizer_panel']);

        add_filter('query_vars', [$this->pages, 'add_query_vars']);
    }

    public function activate()
    {
        flush_rewrite_rules();
        (new Database)->createTables();
        $this->pages->add_pages();
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
