<?php
class ORB_Services_Menus
{

    public function __construct(){}

    function create_mobile_menu()
    {
        $menu_name = 'Mobile';
        $menu_object = wp_get_nav_menu_object($menu_name);

        if(!$menu_object) {
            wp_create_nav_menu($menu_name);
            $this->add_to_mobile_menu();
        } else {
            $this->add_to_mobile_menu(); 
        }
    }

    function add_to_mobile_menu()
    {
        $menu_name = 'Mobile';
        $menu_object = wp_get_nav_menu_object($menu_name);
        $menu_id = $menu_object->term_id;

        wp_update_nav_menu_item($menu_id, 0, array(
            'menu-item-title' => 'SERVICES',
            'menu-item-url' => '/services',
            'menu-item-status' => 'publish',
            'menu-item-position' => 20
        ));

        wp_update_nav_menu_item($menu_id, 0, array(
            'menu-item-title' => 'SUPPORT',
            'menu-item-url' => '/support',
            'menu-item-status' => 'publish',
            'menu-item-position' => 30
        ));
    }

    function create_right_menu()
    {
        $menu_name = 'Right Menu';;
        $menu_object = wp_get_nav_menu_object($menu_name);

        if(!$menu_object) {
            wp_create_nav_menu($menu_name);
            $this->add_to_right_menu();
        } else {
            $this->add_to_right_menu();
        }
    }

    function add_to_right_menu()
    {
        $menu_name = 'Right Menu';
        $menu_object = wp_get_nav_menu_object($menu_name);
        $menu_id = $menu_object->term_id;

        wp_update_nav_menu_item($menu_id, 0, array(
            'menu-item-title' => 'SERVICES',
            'menu-item-url' => '/services',
            'menu-item-status' => 'publish',
            'menu-item-position' => 20
        ));

        wp_update_nav_menu_item($menu_id, 0, array(
            'menu-item-title' => 'SUPPORT',
            'menu-item-url' => '/support',
            'menu-item-status' => 'publish',
            'menu-item-position' => 30
        ));
    }
}

$orb_services_menus = new ORB_Services_Menus();