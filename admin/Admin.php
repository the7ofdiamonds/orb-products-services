<?php
namespace ORB_Services\Admin;

use ORB_Services\Admin\AdminEmail;
use ORB_Services\Admin\AdminHero;
use ORB_Services\Admin\AdminLocation;
use ORB_Services\Admin\AdminOfficeHours;

class Admin
{

    public function __construct()
    {
        add_action('admin_menu', [$this, 'register_custom_menu_page']);
        
        new AdminEmail;
        new AdminHero;
        new AdminOfficeHours;
        new AdminLocation;
    }

    function register_custom_menu_page()
    {
        if (!is_plugin_active('thfw/THFW.php')) {
            add_menu_page('Admin', 'Admin', 'menu_options', 'thfw_admin', 'thfw_admin', 'dashicons-info', 3);
        }
    }
}
