<?php

namespace ORBServices\Menus;

class Menus
{
    public function __construct()
    {
    }

    public function create_mobile_menu()
    {
        $menu_name = 'Mobile';
        $menu_object = wp_get_nav_menu_object($menu_name);

        if (!$menu_object) {
            $menu_id = wp_create_nav_menu($menu_name);
        } else {
            $menu_id = $menu_object->term_id;
        }

        $this->add_to_menu($menu_id, 'SERVICES', '/services', 20);
        $this->add_to_menu($menu_id, 'FAQ', '/faq', 30);
        $this->add_to_menu($menu_id, 'SUPPORT', '/support', 40);
        $this->add_to_menu($menu_id, 'CONTACT', '/contact', 50);
    }

    public function create_right_menu()
    {
        $menu_name = 'Right Menu';
        $menu_object = wp_get_nav_menu_object($menu_name);

        if (!$menu_object) {
            $menu_id = wp_create_nav_menu($menu_name);
        } else {
            $menu_id = $menu_object->term_id;
        }

        $this->add_to_menu($menu_id, 'SERVICES', '/services', 20);
        $this->add_to_menu($menu_id, 'SUPPORT', '/support', 30);
    }

    private function add_to_menu($menu_id, $title, $url, $position)
    {
        $existing_menu_items = wp_get_nav_menu_items($menu_id);
        $menu_item_exists = false;

        foreach ($existing_menu_items as $item) {
            if ($item->title === $title) {
                $menu_item_exists = true;
                break;
            }
        }

        if (!$menu_item_exists) {
            wp_update_nav_menu_item($menu_id, 0, array(
                'menu-item-title'   => $title,
                'menu-item-url'     => $url,
                'menu-item-status'  => 'publish',
                'menu-item-position' => $position
            ));
        }
    }
}
