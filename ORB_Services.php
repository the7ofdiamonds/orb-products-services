<?php
namespace ORB_Services;
/**
 * @package ORB_Services
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
define('ORB_SERVICES', WP_PLUGIN_DIR . '/orb-services/');
define('ORB_SERVICES_URL', WP_PLUGIN_URL . '/orb-services/');

require_once ORB_SERVICES . 'vendor/autoload.php';

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
use ORB_Services\Tables\Tables;
use ORB_Services\Templates\Templates;

class ORB_Services
{

    public function __construct()
    {
        $dotenv = Dotenv::createImmutable(ORB_SERVICES);
        $dotenv->load(__DIR__);

        new Admin;
        new API;
        new CSS;
        // new Email;
        new JS;
        new Pages;
        new Roles;
        new Services;
        new Shortcodes;
        new Tables;
        new Templates;
    }

    public function activate()
    {
        flush_rewrite_rules();
    }
}

$orb_services = new ORB_Services();
register_activation_hook(__FILE__, [$orb_services, 'activate']);
// register_deactivation_hook( __FILE__, [ $thfw, 'deactivate' ]);

$orb_services_pages = new Pages();
register_activation_hook( __FILE__, [$orb_services_pages, 'add_pages'] );
register_activation_hook( __FILE__, [$orb_services_pages, 'add_services_subpages'] );

$orb_services_menus = new Menus();
register_activation_hook( __FILE__, [$orb_services_menus, 'create_mobile_menu'] );