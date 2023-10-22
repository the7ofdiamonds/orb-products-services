<?php

namespace ORB_Products_Services\Pages;

class Pages
{
    public $page_titles;

    public function __construct()
    {
        add_action('init', [$this, 'react_rewrite_rules'], 10, 0);
        add_action('init', [$this, 'react_rewrite_rules_billing'], 10, 0);
        add_action('init', [$this, 'react_rewrite_rules_client'], 10, 0);

        $this->page_titles = [
            'BILLING',
            'CLIENT',
            'FAQ',
            'SUPPORT',
            'CONTACT',
        ];
    }

    function add_pages()
    {
        global $wpdb;

        foreach ($this->page_titles as $page_title) {
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

    function add_client_subpages()
    {
        global $wpdb;

        $page_titles = [
            'START',
            'SELECTIONS',
        ];

        foreach ($page_titles as $page_title) {
            $page_exists = $wpdb->get_var($wpdb->prepare("SELECT ID FROM $wpdb->posts WHERE post_title = %s AND post_type = 'page'", $page_title));
            $parent_id = get_page_by_path('client')->ID;

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

    function add_billing_subpages()
    {
        global $wpdb;

        $page_titles = [
            'QUOTE',
            'INVOICE',
            'PAYMENT',
            'RECEIPT'
        ];

        foreach ($page_titles as $page_title) {
            $page_exists = $wpdb->get_var($wpdb->prepare("SELECT ID FROM $wpdb->posts WHERE post_title = %s AND post_type = 'page'", $page_title));
            $parent_id = get_page_by_path('billing')->ID;

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

    function add_payment_subpages()
    {
        global $wpdb;

        $page_titles = [
            'CARD',
            'WALLET',
        ];

        foreach ($page_titles as $page_title) {
            $page_exists = $wpdb->get_var($wpdb->prepare("SELECT ID FROM $wpdb->posts WHERE post_title = %s AND post_type = 'page'", $page_title));
            $parent_id = get_page_by_path('billing/payment')->ID;

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

    function add_contact_subpage()
    {
        global $wpdb;

        $page_title = 'success';

        $page_exists = $wpdb->get_var($wpdb->prepare("SELECT ID FROM $wpdb->posts WHERE post_title = %s AND post_type = 'page'", $page_title));
        $parent_id = get_page_by_path('contact')->ID;

        if (!$page_exists) {
            $page_data = array(
                'post_title'   => $page_title,
                'post_type'    => 'page',
                'post_content' => '',
                'post_status'  => 'publish',
                'post_parent'   => $parent_id,
            );

            return wp_insert_post($page_data);
        }
    }

    function add_support_subpages()
    {
        global $wpdb;

        $page_titles = [
            'SUCCESS',
        ];

        foreach ($page_titles as $page_title) {
            $page_exists = $wpdb->get_var($wpdb->prepare("SELECT ID FROM $wpdb->posts WHERE post_title = %s AND post_type = 'page'", $page_title));
            $parent_id = get_page_by_path('support')->ID;

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
        $contact_page_id = get_page_by_path('contact')->ID;
        $support_page_id = get_page_by_path('support')->ID;

        if ($contact_page_id && $support_page_id) {
            add_rewrite_rule('^contact/?$', 'index.php?page_id=' . $contact_page_id . '&id=$matches[1]', 'top');
            add_rewrite_rule('^support/?$', 'index.php?page_id=' . $support_page_id . '&id=$matches[1]', 'top');
        }
    }

    function react_rewrite_rules_client()
    {
        $start_page_id = get_page_by_path('client/start')->ID;
        $selections_page_id = get_page_by_path('client/selections')->ID;

        if ($start_page_id && $selections_page_id) {
            add_rewrite_rule('^client/start/?$', 'index.php?page_id=' . $start_page_id . '&id=$matches[1]', 'top');
            add_rewrite_rule('^client/selections/?$', 'index.php?page_id=' . $selections_page_id . '&id=$matches[1]', 'top');
        }
    }

    function react_rewrite_rules_billing()
    {
        $quote_page_id = get_page_by_path('billing/quote')->ID;
        $invoice_page_id = get_page_by_path('billing/invoice')->ID;
        $payment_page_id = get_page_by_path('billing/payment')->ID;
        $receipt_page_id = get_page_by_path('billing/receipt')->ID;

        if ($quote_page_id && $invoice_page_id && $payment_page_id && $receipt_page_id) {
            add_rewrite_rule('^billing/quote/([0-9]+)/?$', 'index.php?page_id=' . $quote_page_id . '&id=$matches[1]', 'top');
            add_rewrite_rule('^billing/invoice/([0-9]+)/?$', 'index.php?page_id=' . $invoice_page_id . '&id=$matches[1]', 'top');
            add_rewrite_rule('^billing/payment/([0-9]+)/?$', 'index.php?page_id=' . $payment_page_id . '&id=$matches[1]', 'top');
            add_rewrite_rule('^billing/receipt/([0-9]+)/?$', 'index.php?page_id=' . $receipt_page_id . '&id=$matches[1]', 'top');
        }

        $card_page_id = get_page_by_path('billing/payment/card')->ID;
        $wallet_page_id = get_page_by_path('billing/payment/wallet')->ID;

        if ($card_page_id && $wallet_page_id) {
            add_rewrite_rule('^billing/payment/card/([0-9]+)/?$', 'index.php?page_id=' . $card_page_id . '&id=$matches[1]', 'top');
            add_rewrite_rule('^billing/payment/wallet/([0-9]+)/([^/]+)/?$', 'index.php?page_id=' . $wallet_page_id . '&custom_route=payment&id=$matches[1]&extra_param=$matches[2]', 'top');
        }
    }

    function is_user_logged_in()
    {
        return isset($_SESSION['idToken']);
    }
}
