<?php

namespace ORB_Services\Admin;

use ORB_Services\Admin\AdminEmail;
use ORB_Services\Admin\AdminHero;
use ORB_Services\Admin\AdminLocation;
use ORB_Services\Admin\AdminOfficeHours;
use ORB_Services\Admin\AdminCommunication;

class Admin
{

    public function __construct()
    {
        add_action('admin_menu', [$this, 'register_custom_menu_page']);

        new AdminEmail;
        new AdminHero;
        new AdminOfficeHours;
        new AdminLocation;
        new AdminCommunication;
    }

    function register_custom_menu_page()
    {

        add_menu_page('Admin', 'ORB Services', 'menu_options', 'orb_services', 'orb_services', 'dashicons-info', 3);
    }
}
