<?php
include 'admin-hero.php';
include 'admin-office-hours.php';
include 'admin-location.php';

class ORB_Services_Admin
{

    public function __construct()
    {
        add_action('admin_menu', [$this, 'register_custom_menu_page']);
        
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
