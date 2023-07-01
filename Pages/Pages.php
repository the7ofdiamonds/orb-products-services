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

    function add_pages()
    {
        global $wpdb;

        $page_titles = [
            'SERVICES',
            'FAQ',
            'SUPPORT',
            'CONTACT',
        ];

        foreach ($page_titles as $page_title) {
            $page_exists = $wpdb->get_var($wpdb->prepare("SELECT ID FROM $wpdb->posts WHERE post_title = %s AND post_type = 'page'", $page_title));

            if (!$page_exists) {
                $page_data = array(
                    'post_title'   => $page_title,
                    'post_type'    => 'page',
                    'post_content' => '',
                    'post_status'  => 'publish',
                );

                wp_insert_post($page_data);
            }
        }
    }

    function add_services_subpages()
    {
        global $wpdb;

        $page_titles = [
            'SERVICE',
            'START',
            'QUOTE',
            'INVOICE',
            'PAYMENT',
            'RECEIPT',
        ];

        foreach ($page_titles as $page_title) {
            $page_exists = $wpdb->get_var($wpdb->prepare("SELECT ID FROM $wpdb->posts WHERE post_title = %s AND post_type = 'page'", $page_title));
            $parent_id = get_page_by_path('services')->ID;

            if (!$page_exists) {
                $page_data = array(
                    'post_title'   => $page_title,
                    'post_type'    => 'page',
                    'post_content' => '',
                    'post_status'  => 'publish',
                    'post_parent'   => $parent_id,
                );

                wp_insert_post($page_data);
            }
        }
    }

    public function react_rewrite_rules()
    {
        $service_page_id = get_page_by_path('services/service')->ID;

        add_rewrite_rule('^services/([0-9]+)/([^/]+)/?$', 'index.php?page_id=' . $service_page_id , 'top');

        $services_page_id = get_page_by_path('services')->ID;
        $start_page_id = get_page_by_path('services/start')->ID;
        $quote_page_id = get_page_by_path('services/quote')->ID;
        $invoice_page_id = get_page_by_path('services/invoice')->ID;
        $payment_page_id = get_page_by_path('services/payment')->ID;
        $receipt_page_id = get_page_by_path('services/receipt')->ID;

        if ($services_page_id && $start_page_id && $quote_page_id && $invoice_page_id && $payment_page_id && $receipt_page_id) {

            $custom_routes = [
                'start' => 'start',
                'quote'   => 'quote',
                'schedule' => 'schedule',
            ];

            foreach ($custom_routes as $route => $slug) {
                add_rewrite_rule('^services/' . $route . '/?$', 'index.php?page_id=' . $services_page_id . '&custom_route=' . $slug, 'top');
            }


            if ($invoice_page_id && $payment_page_id && $receipt_page_id) {
                add_rewrite_rule('^services/invoice/([0-9]+)/?$', 'index.php?page_id=' . $invoice_page_id . '&id=$matches[1]', 'top');
                add_rewrite_rule('^services/payment/([0-9]+)/?$', 'index.php?page_id=' . $payment_page_id . '&id=$matches[1]', 'top');
                add_rewrite_rule('^services/receipt/([0-9]+)/?$', 'index.php?page_id=' . $receipt_page_id . '&id=$matches[1]', 'top');
            }

            add_rewrite_rule('^services/payment/([0-9]+)/([^/]+)/?$', 'index.php?page_id=' . $payment_page_id . '&custom_route=payment&id=$matches[1]&extra_param=$matches[2]', 'top');
        }
    }
}
