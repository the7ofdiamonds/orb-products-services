<?php

namespace ORB\Products_Services\Post_Types;

class Post_Types
{
    public $post_types;

    public function __construct()
    {
        $this->post_types = [
            [
                'name' => 'services',
                'menu_icon' => '',
                'menu_position' => 13,
                'title' => 'SERVICES',
                'singular' => 'Service',
                'plural' => 'Services',
                'archive_page' => 'services',
                'single_page' => 'service'
            ],
            [
                'name' => 'products',
                'menu_icon' => '',
                'menu_position' => 14,
                'title' => 'PRODUCTS',
                'singular' => 'Product',
                'plural' => 'Products',
                'archive_page' => 'products',
                'single_page' => 'product'
            ],
        ];
    }

    function services_post_type()
    {
        $labels = array(
            'name' => 'SERVICES',
            'singular_name' => 'Service',
            'add_new' => 'Add ' . 'Service',
            'all_items' => 'Services',
            'add_new_item' => 'Add New ' . 'Service',
            'edit_item' => 'Edit ' . 'Service',
            'new_item' => 'New ' . 'Service',
            'view_item' => 'View ' . 'Service',
            'search_item' => 'Search ' . 'Services',
            'not_found' => 'No ' . 'Services' . ' were Found',
            'not_found_in_trash' => 'No ' . 'Service' . ' found in trash',
            'parent_item_colon' => 'Parent ' . 'Service'
        );

        $args = array(
            'labels' => $labels,
            'show_ui' => true,
            'menu_icon' => '',
            'show_in_rest' => true,
            'show_in_nav_menus' => true,
            'public' => true,
            'has_archive' => true,
            'publicly_queryable' => true,
            'query_var' => true,
            'rewrite' => array(
                'with_front' => false,
                'slug'       => 'services'
            ),
            'hierarchical' => true,
            'supports' => [
                'title',
                'editor',
                'excerpt',
                'thumbnail',
                'custom-fields',
                'revisions',
                'page-attributes',
            ],
            'taxonomies' => array('category', 'post_tag'),
            'menu_position' => 13,
            'exclude_from_search' => false
        );

        register_post_type('services', $args);
    }
}
