<?php
/**
 * @package ORBServices
 */
/*
Plugin Name: ORB Services
Plugin URI: 
Description: Services Custom Post Type.
Version: 1.0.0
Author: THE7OFDIAMONDS.TECH
Author URI: http://THE7OFDIAMONDS.TECH
License: 
Text Domain: orb-services
*/

/*
Licensing Info Here
*/

defined('ABSPATH') or die('Hey, what are you doing here? You silly human!');
define('ORB_SERVICES', WP_PLUGIN_DIR . '/orb-services');

include_once 'admin/_admin.php';
include_once 'api/_api.php';
include_once 'css/_css.php';
include_once 'js/_js.php';
include_once 'menus/_menus.php';
include_once 'pages/_pages.php';
include_once 'post-types/_post-types.php';
include_once 'shortcodes/_shortcodes.php';
include_once 'tables/_tables.php';

use Dotenv\Dotenv;

class ORB_Services {

    public function __construct()
    {
        $dotenv = Dotenv::createImmutable(ORB_SERVICES);
        $dotenv->load(__DIR__);

		new ORB_Services_Admin;
        new ORB_Services_API;
        new ORB_Services_CSS;
        new ORB_Services_JS;
        new ORB_Services_Pages;
        new ORB_Services_Post_Type;
        new ORB_Services_Shortcodes;
        new ORB_Services_Tables;
    }

    public function activate() {
        flush_rewrite_rules();
    }
}

$orb_services = new ORB_Services();
register_activation_hook( __FILE__, [$orb_services, 'activate' ]);
// register_deactivation_hook( __FILE__, [ $thfw, 'deactivate' ]);

register_activation_hook( __FILE__, 'orb_services_add_pages' );

register_activation_hook( __FILE__, 'orb_services_create_mobile_menu' );
register_activation_hook( __FILE__, 'orb_services_create_right_menu' );