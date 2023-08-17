<?php

namespace ORB_Services\Admin;

class AdminLocation
{

    public function __construct()
    {
        add_action('admin_menu', [$this, 'register_custom_menu_page']);
    }

    function register_custom_menu_page()
    {

        add_submenu_page('thfw_admin', 'Add Location', 'Add Location', 'manage_options', 'orb_location', [$this, 'create_section'], 3);
        add_action('admin_init', [$this, 'register_section']);
    }

    function create_section()
    {
        include plugin_dir_path(__FILE__) . 'includes/admin-add-location.php';
    }

    function register_section()
    {

        add_settings_section('orb-admin-location', 'Add Location', [$this, 'section_description'], 'orb_location');
        register_setting('orb-admin-location-group', 'orb-headquarters');
        add_settings_field('orb-headquarters', 'Add Location', [$this, 'headquarters'], 'orb_location', 'orb-admin-location');
    }

    function section_description()
    {
        echo 'Add the map embed code of your location(s) here';
    }

    function headquarters()
    {
        $headquarters = get_option('orb-headquarters');
?>
        <textarea type="text" name="orb-headquarters" value="<?php echo $headquarters ?>"></textarea>
<?php
    }
}
