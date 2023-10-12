<?php

namespace ORB_Services\JS;

class JS
{

    public function __construct()
    {
        add_action('wp_footer', [$this, 'load_front_page_jsx']);
        add_action('wp_footer', [$this, 'load_about_page_jsx']);
        add_action('wp_footer', [$this, 'load_pages_jsx']);
        add_action('wp_footer', [$this, 'load_post_types_jsx']);
        // add_action('wp_footer', [$this, 'load_js']);
    }

    function load_front_page_jsx()
    {
        if (is_front_page()) {
            wp_enqueue_script('orb_services_hero_js', ORB_SERVICES_URL . 'JS/orb-services-hero.js');

            wp_enqueue_script('orb_services_react_schedule', ORB_SERVICES_URL . 'build/' . 'src_views_Schedule_jsx.js', ['wp-element'], 1.0, true);

            wp_enqueue_script('orb_services_react_index', ORB_SERVICES_URL . 'build/' . 'index.js', ['wp-element'], 1.0, true);
        }
    }

    function load_about_page_jsx()
    {
        if (is_page('about')) {
            wp_enqueue_script('orb_services_react_schedule', ORB_SERVICES_URL . 'build/' . 'src_views_Schedule_jsx.js', ['wp-element'], 1.0, true);

            wp_enqueue_script('orb_services_react_index', ORB_SERVICES_URL . 'build/' . 'index.js', ['wp-element'], 1.0, true);
        }
    }

    function load_pages_jsx()
    {
        $pages = [
            'contact',
            'contact/success',
            'schedule',
            'support',
            'support/success',
            'dashboard',
            'client/start',
            'client/selections',
            'billing/quote',
            'billing/invoice',
            'billing/payment',
            'billing/receipt',
        ];

        foreach ($pages as $page) {
            if (is_page($page)) {
                $parts = explode('/', $page);
                $fileName = implode('', array_map('ucwords', $parts));
                $filePath = ORB_SERVICES_URL . 'build/' . 'src_views_' . $fileName . '_jsx.js';

                if ($filePath) {
                    wp_enqueue_script('orb_services_react_' . $fileName, $filePath, ['wp-element'], 1.0, true);
                } else {
                    error_log($page . ' page has not been created.');
                }

                wp_enqueue_script('orb_services_react_index', ORB_SERVICES_URL . 'build/' . 'index.js', ['wp-element'], 1.0, true);
            }
        }
    }

    function load_post_types_jsx()
    {
        $post_types = [
            'services',
            'products'
        ];

        foreach ($post_types as $post_type) {
            if (is_post_type_archive($post_type) || is_singular($post_type)) {
                $fileName = ucwords($post_type);
                $filePath = ORB_SERVICES_URL . 'build/' . 'src_views_' . $fileName . '_jsx.js';

                if ($filePath) {
                    wp_enqueue_script('orb_services_react_' . $fileName, $filePath, ['wp-element'], 1.0, true);
                } else {
                    error_log('Post Type' . $post_type . 'has not been created.');
                }
                
                wp_enqueue_script('orb_services_react_index', ORB_SERVICES_URL . 'build/' . 'index.js', ['wp-element'], 1.0, true);
            }
        }
    }

    function load_js()
    {
        wp_enqueue_script('orb_services_js', ORB_SERVICES_URL . 'JS/orb-services.js');
    }
}
