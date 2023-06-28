<?php

namespace ORBServices\Admin;

class AdminOfficeHours
{

    public function __construct()
    {
        add_action('admin_menu', [$this, 'register_custom_menu_page']);
    }

    function register_custom_menu_page()
    {

        add_submenu_page('thfw_admin', 'Add Office Hours', 'Add Hours', 'manage_options', 'orb_office_hours', [$this, 'create_section'], 30);
        add_action('admin_init', [$this, 'register_section']);
    }

    function create_section()
    {
        include plugin_dir_path(__FILE__) . 'includes/admin-add-office-hours.php';
    }

    function register_section()
    {

        add_settings_section('orb-admin-office-hours', 'Add Office Hours', [$this, 'section_description'], 'orb_office_hours');
        register_setting('orb-admin-office-hours-group', 'office_hours');
        add_settings_field('office_hours', 'Add Office Hours', [$this, 'office_hours'], 'orb_office_hours', 'orb-admin-office-hours');
    }

    function section_description()
    {
        echo 'Add your hours of operation';
    }

    function office_hours()
    {
        $office_hours = esc_attr(get_option('orb-office-hours'));
        echo '<textarea type="text" name="orb-office-hours" value="' . $office_hours . '" ></textarea>';
    }
}
