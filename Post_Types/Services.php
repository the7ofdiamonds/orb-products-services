<?php

namespace ORB_Products_Services\Post_Types;

use ORB_Products_Services\Post_Types\Meta;

class Services
{    
    public function __construct($stripeClient)
    {
        add_action('init', [$this, 'services_custom_post_type']);
        
        new Meta($stripeClient);
    }

    public function services_custom_post_type()
    {
        $labels = array(
            'name' => 'SERVICES',
            'singular_name' => 'Service',
            'add_new' => 'Add Service',
            'all_items' => 'Services',
            'add_new_item' => 'Add New Service',
            'edit_item' => 'Edit Item',
            'new_item' => 'New Item',
            'view_item' => 'View Item',
            'search_item' => 'Search Services',
            'not_found' => 'No Items Found',
            'not_found_in_trash' => 'No items found in trash',
            'parent_item_colon' => 'Parent Item'
        );

        $args = array(
            'labels' => $labels,
            'show_ui' => true,
            'show_in_rest' => true,
            'show_in_nav_menus' => true,
            'public' => true,
            "has_archive" => true,
            'publicly_queryable' => true,
            'query_var' => true,
            'rewrite' => array(
                'with_front' => false,
                'slug'       => 'services'
            ),
            'capability_type' => 'post',
            'hierarchical' => true,
            'supports' => array(
                'title',
                'editor',
                'excerpt',
                'thumbnail',
                'custom-fields',
                'revisions',
                'page-attributes',
                'comments'
            ),
            'taxonomies' => array('category', 'post_tag', 'features'),
            'menu_position' => 7,
            'exclude_from_search' => false
        );
        register_post_type('services', $args);
    }
}