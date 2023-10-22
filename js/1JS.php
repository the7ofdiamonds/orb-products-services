<?php

namespace ORB_Products_Services\JS;

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
            $filePath = ORB_PRODUCTS_SERVICES . 'JS/orb-services-hero.js';

            if (file_exists($filePath)) {
                wp_enqueue_script('orb_services_hero_js', ORB_PRODUCTS_SERVICES_URL . 'JS/orb-services-hero.js');
            } else {
                error_log('ORB Hero javascript file does not exists in the build folder.');
            }

            $sections = [
                'Products',
                'Services',
                'Schedule'
            ];

            foreach ($sections as $section) {
                $filePath = ORB_PRODUCTS_SERVICES . 'build/' . 'src_views_' . $section . '_jsx.js';

                if (file_exists($filePath)) {
                    wp_enqueue_script('orb_services_react' . $section, ORB_PRODUCTS_SERVICES_URL . 'build/' . 'src_views_' . $section . '_jsx.js');
                } else {
                    error_log($section . ' react file does not exists in the build folder.');
                }
            }

            if (file_exists(ORB_PRODUCTS_SERVICES . 'build/' . 'index.js')) {
                wp_enqueue_script('orb_services_react_index', ORB_PRODUCTS_SERVICES_URL . 'build/' . 'index.js', ['wp-element'], 1.0, true);
            } else {
                error_log('Index react file does not exists in the build folder.');
            }
        }
    }

    function load_about_page_jsx()
    {
        if (is_page('about')) {
            wp_enqueue_script('orb_services_react_schedule', ORB_PRODUCTS_SERVICES_URL . 'build/' . 'src_views_Schedule_jsx.js', ['wp-element'], 1.0, true);

            wp_enqueue_script('orb_services_react_index', ORB_PRODUCTS_SERVICES_URL . 'build/' . 'index.js', ['wp-element'], 1.0, true);
        }
    }

    function load_pages_jsx()
    {
        $pages = [
            'billing',
            'billing/quote',
            'billing/invoice',
            'billing/payment',
            'billing/payment/card',
            'billing/payment/mobile',
            'billing/receipt',
            'client',
            'client/selections',
            'client/start',
            'contact',
            'contact/success',
            'dashboard',
            'faq',
            'schedule',
            'support',
            'support/success',
        ];

        foreach ($pages as $page) {
            if (is_page($page)) {
                $parts = explode('/', $page);
                $fileName = implode('', array_map('ucwords', $parts));
                $filePath = ORB_PRODUCTS_SERVICES_URL . 'build/' . 'src_views_' . $fileName . '_jsx.js';

                if ($filePath) {
                    wp_enqueue_script('orb_services_react_' . $fileName, $filePath, ['wp-element'], 1.0, true);
                } else {
                    error_log($page . ' page has not been created.');
                }

                wp_enqueue_script('orb_services_react_index', ORB_PRODUCTS_SERVICES_URL . 'build/' . 'index.js', ['wp-element'], 1.0, true);
            }
        }
    }

    function load_post_types_jsx()
    {
        $post_types = [
            'services',
            'products',
        ];

        foreach ($post_types as $post_type) {
            if (is_post_type_archive($post_type) || is_singular($post_type)) {
                $fileName = ucwords($post_type);
                $filePath = ORB_PRODUCTS_SERVICES_URL . 'build/' . 'src_views_' . $fileName . '_jsx.js';

                if ($filePath) {
                    wp_enqueue_script('orb_services_react_' . $fileName, $filePath, ['wp-element'], 1.0, true);
                } else {
                    error_log('Post Type' . $post_type . 'has not been created.');
                }

                wp_enqueue_script('orb_services_react_index', ORB_PRODUCTS_SERVICES_URL . 'build/' . 'index.js', ['wp-element'], 1.0, true);
            }
        }
    }

    function load_js()
    {
        wp_enqueue_script('orb_services_js', ORB_PRODUCTS_SERVICES_URL . 'JS/orb-services.js');
    }
}
