<?php

namespace ORBServices\Pages;

// include_once 'templates/_templates.php';

use ORBServices\Pages\Templates\Templates;

class Pages
{

    public function __construct()
    {
        new Templates();
        add_action('init', [$this, 'react_rewrite_rules'], 10, 0);
    }

    function add_pages()
    {

        if (!post_exists('services')) {

            $services_page = array(
                'post_title' => 'SERVICES',
                'post_type' => 'page',
                'post_content' => '',
                'post_status' => 'publish',
            );

            wp_insert_post($services_page, true);
        }

        if (!post_exists('faq')) {

            $faq_page = array(
                'post_title' => 'FAQ',
                'post_type' => 'page',
                'post_content' => '',
                'post_status' => 'publish',
            );

            wp_insert_post($faq_page, true);
        }

        if (!post_exists('support')) {

            $support_page = array(
                'post_title' => 'SUPPORT',
                'post_type' => 'page',
                'post_content' => '',
                'post_status' => 'publish',
            );

            wp_insert_post($support_page, true);
        }

        if (!post_exists('contact')) {

            $contact_page = array(
                'post_title' => 'CONTACT',
                'post_type' => 'page',
                'post_content' => '',
                'post_status' => 'publish',
            );

            wp_insert_post($contact_page, true);
        }
    }

    function react_rewrite_rules()
    {
        $services_page_id = get_page_by_path('services')->ID;

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
            // Create a rewrite rule without the ID at the end
            add_rewrite_rule('^services/' . $route . '/?$', 'index.php?page_id=' . $services_page_id . '&custom_route=' . $slug, 'top');
        }

        foreach ($custom_routes_id as $route => $slug) {
            // Create a rewrite rule with the ID at the end
            add_rewrite_rule('^services/' . $route . '/([0-9]+)/?$', 'index.php?page_id=' . $services_page_id . '&custom_route=' . $slug . '&id=$matches[1]', 'top');
        }

        add_rewrite_rule('^services/payment/([0-9]+)/([^/]+)/?$', 'index.php?page_id=' . $services_page_id . '&custom_route=payment&id=$matches[1]&extra_param=$matches[2]', 'top');
    }
}

$orb_services_pages = new Pages();
