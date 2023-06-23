<?php
namespace ORB\Services;
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
include_once 'email/_email.php';
include_once 'js/_js.php';
include_once 'menus/_menus.php';
include_once 'pages/_pages.php';
include_once 'post-types/_post-types.php';
include_once 'shortcodes/_shortcodes.php';
include_once 'tables/_tables.php';

use Dotenv\Dotenv;
use ORB\Services\Admin\ORB_Services_Admin;
use ORB\Services\API\ORB_Services_API;
use ORB\Services\CSS\ORB_Services_CSS;
use ORB\Services\Email\ORB_Services_Email;
use ORB\Services\JS\ORB_Services_JS;
use ORB\Services\Pages\ORB_Services_Pages;
use ORB\Services\Post_Type\ORB_Services_Post_Type;
use ORB\Services\Shortcodes\ORB_Services_Shortcodes;
use ORB\Services\Tables\ORB_Services_Tables;

class ORB_Services
{

    public function __construct()
    {
        $dotenv = Dotenv::createImmutable(ORB_SERVICES);
        $dotenv->load(__DIR__);

        new ORB_Services_Admin;
        new ORB_Services_API;
        new ORB_Services_CSS;
        new ORB_Services_Email;
        new ORB_Services_JS;
        new ORB_Services_Pages;
        new ORB_Services_Post_Type;
        new ORB_Services_Shortcodes;
        new ORB_Services_Tables;
    }

    public function activate()
    {
        flush_rewrite_rules();
    }
}

$orb_services = new ORB_Services();
register_activation_hook(__FILE__, [$orb_services, 'activate']);
// register_deactivation_hook( __FILE__, [ $thfw, 'deactivate' ]);

register_activation_hook( __FILE__, [$orb_services_pages, 'add_pages'] );

register_activation_hook( __FILE__, [$orb_services_menus, 'create_mobile_menu'] );
register_activation_hook( __FILE__, [$orb_services_menus, 'create_right_menu'] );
