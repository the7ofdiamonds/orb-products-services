<?php
namespace ORBServices;
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
define('ORB_SERVICES_URL', WP_PLUGIN_URL . '/orb-services');

require_once __DIR__ . '/vendor/autoload.php';
// include_once 'admin/_admin.php';
// include_once 'api/_api.php';
// include_once 'css/_css.php';
// include_once 'email/_email.php';
// include_once 'js/_js.php';
// include_once 'menus/_menus.php';
// include_once 'pages/_pages.php';
// include_once 'post-types/_post-types.php';
// include_once 'shortcodes/_shortcodes.php';
// include_once 'tables/_tables.php';

use Dotenv\Dotenv;
use ORBServices\Admin\Admin;
use ORBServices\API\API;
use ORBServices\CSS\CSS;
use ORBServices\Email\Email;
use ORBServices\JS\JS;
use ORBServices\Menus\Menus;
use ORBServices\Pages\Pages;
use ORBServices\PostTypes\Services;
use ORBServices\Shortcodes\Shortcodes;
use ORBServices\Tables\Tables;

class ORBServices
{

    public function __construct()
    {
        $dotenv = Dotenv::createImmutable(ORB_SERVICES);
        $dotenv->load(__DIR__);

        new Admin;
        new API;
        new CSS;
        new Email;
        new JS;
        new Pages;
        new Services;
        new Shortcodes;
        new Tables;
    }

    public function activate()
    {
        flush_rewrite_rules();
    }
}

$orb_services = new ORBServices();
register_activation_hook(__FILE__, [$orb_services, 'activate']);
// register_deactivation_hook( __FILE__, [ $thfw, 'deactivate' ]);

$orb_services_pages = new Pages();
register_activation_hook( __FILE__, [$orb_services_pages, 'add_pages'] );

$orb_services_menus = new Menus();
register_activation_hook( __FILE__, [$orb_services_menus, 'create_mobile_menu'] );
