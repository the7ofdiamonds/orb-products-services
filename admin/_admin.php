<?php
namespace ORB\Services\Admin;

include 'admin-email.php';
include 'admin-hero.php';
include 'admin-location.php';
include 'admin-office-hours.php';

use ORB\Services\Admin\Email\ORB_Services_Admin_Email;
use ORB\Services\Admin\Hero\ORB_Services_Admin_Hero;
use ORB\Services\Admin\Location\ORB_Services_Admin_Location;
use ORB\Services\Admin\Office_Hours\ORB_Services_Admin_Office_Hours;

class ORB_Services_Admin
{

    public function __construct()
    {
        add_action('admin_menu', [$this, 'register_custom_menu_page']);
        
        new ORB_Services_Admin_Email;
        new ORB_Services_Admin_Hero;
        new ORB_Services_Admin_Office_Hours;
        new ORB_Services_Admin_Location;
    }

    function register_custom_menu_page()
    {
        if (!is_plugin_active('thfw/thfw.php')) {
            add_menu_page('Admin', 'Admin', 'menu_options', 'thfw_admin', 'thfw_admin', 'dashicons-info', 3);
        }
    }
}
