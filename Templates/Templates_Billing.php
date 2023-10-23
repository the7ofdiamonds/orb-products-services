<?php

namespace ORB_Products_Services\Templates;

use ORB_Products_Services\CSS\CSS;
use ORB_Products_Services\JS\JS;
use ORB_Products_Services\Pages\Pages;
use ORB_Products_Services\Post_Types\Post_Types;

class Templates_Billing
{
    private $page_titles;
    private $post_types;
    private $css_file;
    private $js_file;

    public function __construct()
    {
        add_filter('page_template', [$this, 'get_custom_billing_page_template']);
        add_filter('page_template', [$this, 'get_custom_quote_page_template']);
        add_filter('page_template', [$this, 'get_custom_invoice_page_template']);
        add_filter('page_template', [$this, 'get_custom_payment_page_template']);
        add_filter('page_template', [$this, 'get_custom_card_page_template']);
        add_filter('page_template', [$this, 'get_custom_wallet_page_template']);
        add_filter('page_template', [$this, 'get_custom_receipt_page_template']);

        $pages = new Pages;
        $posttypes = new Post_Types();

        $this->page_titles = $pages->page_titles;
        $this->post_types = $posttypes->post_types;
        $this->css_file = new CSS;
        $this->js_file = new JS;
    }

    function get_custom_billing_page_template($page_template)
    {
        $quote_page = get_page_by_path('billing');

        if ($quote_page && is_page($quote_page->ID)) {
            $page_template = ORB_PRODUCTS_SERVICES . 'Pages/page-protected.php';;

            if (file_exists($page_template)) {
                add_action('wp_head', [$this->css_file, 'load_pages_css']);
                add_action('wp_footer', [$this->js_file, 'load_pages_react']);

                return $page_template;
            } else {
                error_log('Billing Page Template does not exist.');
            }
        }

        return $page_template;
    }

    function get_custom_quote_page_template($page_template)
    {
        $quote_page = get_page_by_path('billing/quote');

        if ($quote_page && is_page($quote_page->ID)) {
            $page_template = ORB_PRODUCTS_SERVICES . 'Pages/page-protected.php';

            if (file_exists($page_template)) {
                add_action('wp_head', [$this->css_file, 'load_pages_css']);
                add_action('wp_footer', [$this->js_file, 'load_pages_react']);

                return $page_template;
            } else {
                error_log('Quote Page Template does not exist.');
            }
        }

        return $page_template;
    }

    function get_custom_invoice_page_template($page_template)
    {
        $invoice_page = get_page_by_path('billing/invoice');

        if ($invoice_page && is_page($invoice_page->ID)) {
            $page_template = ORB_PRODUCTS_SERVICES . 'Pages/page-protected.php';

            if (file_exists($page_template)) {
                add_action('wp_head', [$this->css_file, 'load_pages_css']);
                add_action('wp_footer', [$this->js_file, 'load_pages_react']);

                return $page_template;
            } else {
                error_log('Invoice Page Template does not exist.');
            }
        }

        return $page_template;
    }

    function get_custom_payment_page_template($page_template)
    {
        $payment_page = get_page_by_path('billing/payment');

        if ($payment_page && is_page($payment_page->ID)) {
            $page_template = ORB_PRODUCTS_SERVICES . 'Pages/page-protected.php';

            if (file_exists($page_template)) {
                add_action('wp_head', [$this->css_file, 'load_pages_css']);
                add_action('wp_footer', [$this->js_file, 'load_pages_react']);

                return $page_template;
            } else {
                error_log('Payment Page Template does not exist.');
            }
        }

        return $page_template;
    }

    function get_custom_card_page_template($page_template)
    {
        $card_page = get_page_by_path('billing/payment/card');

        if ($card_page && is_page($card_page->ID)) {
            $page_template = ORB_PRODUCTS_SERVICES . 'Pages/page-protected.php';

            if (file_exists($page_template)) {
                add_action('wp_head', [$this->css_file, 'load_pages_css']);
                add_action('wp_footer', [$this->js_file, 'load_pages_react']);

                return $page_template;
            } else {
                error_log('Card Page Template does not exist.');
            }
        }

        return $page_template;
    }

    function get_custom_wallet_page_template($page_template)
    {
        $mobile_page = get_page_by_path('billing/payment/wallet');

        if ($mobile_page && is_page($mobile_page->ID)) {
            $page_template = ORB_PRODUCTS_SERVICES . 'Pages/page-protected.php';

            if (file_exists($page_template)) {
                add_action('wp_head', [$this->css_file, 'load_pages_css']);
                add_action('wp_footer', [$this->js_file, 'load_pages_react']);

                return $page_template;
            } else {
                error_log('Wallet Page Template does not exist.');
            }
        }

        return $page_template;
    }

    function get_custom_receipt_page_template($page_template)
    {
        $receipt_page = get_page_by_path('billing/receipt');

        if ($receipt_page && is_page($receipt_page->ID)) {
            $page_template = ORB_PRODUCTS_SERVICES . 'Pages/page-protected.php';

            if (file_exists($page_template)) {
                add_action('wp_head', [$this->css_file, 'load_pages_css']);
                add_action('wp_footer', [$this->js_file, 'load_pages_react']);

                return $page_template;
            } else {
                error_log('Receipt Page Template does not exist.');
            }
        }

        return $page_template;
    }
}
