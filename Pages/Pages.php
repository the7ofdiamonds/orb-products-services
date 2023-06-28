<?php

namespace ORBServices\Pages;

use ORBServices\Pages\Templates\Templates;

class Pages
{
    public function __construct()
    {
        new Templates();
        add_action('init', [$this, 'react_rewrite_rules'], 10, 0);
    }

    public function add_pages()
    {
        $pages = array(
            'services' => 'SERVICES',
            'faq' => 'FAQ',
            'support' => 'SUPPORT',
            'contact' => 'CONTACT',
        );

        foreach ($pages as $slug => $title) {
            if (!post_exists($title)) {
                $page = array(
                    'post_title' => $title,
                    'post_type' => 'page',
                    'post_content' => '',
                    'post_status' => 'publish',
                    'post_name' => $slug,
                );

                $result = wp_insert_post($page, true);

                if (is_wp_error($result)) {
                    echo $result->get_error_message();
                }
            }
        }
    }

    public function react_rewrite_rules()
    {
        $services_page = get_page_by_path('services');
        if ($services_page) {
            $services_page_id = $services_page->ID;

            $custom_routes = [
                'quote'   => 'quote',
                'schedule' => 'schedule',
            ];

            $custom_routes_id = [
                'invoice'  => 'invoice',
                'payment'  => 'payment',
                'receipt'  => 'receipt',
            ];

            foreach ($custom_routes as $route => $slug) {
                add_rewrite_rule('^services/' . $route . '/?$', 'index.php?page_id=' . $services_page_id . '&custom_route=' . $slug, 'top');
            }

            foreach ($custom_routes_id as $route => $slug) {
                add_rewrite_rule('^services/' . $route . '/([0-9]+)/?$', 'index.php?page_id=' . $services_page_id . '&custom_route=' . $slug . '&id=$matches[1]', 'top');
            }

            add_rewrite_rule('^services/payment/([0-9]+)/([^/]+)/?$', 'index.php?page_id=' . $services_page_id . '&custom_route=payment&id=$matches[1]&extra_param=$matches[2]', 'top');
        }
    }
}
