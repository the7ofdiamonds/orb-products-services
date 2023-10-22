<?php

namespace ORB_Products_Services\Templates;

use ORB_Products_Services\CSS\CSS;
use ORB_Products_Services\JS\JS;
use ORB_Products_Services\Pages\Pages;
use ORB_Products_Services\Post_Types\Post_Types;

class Templates
{

    private $page_titles;
    private $post_types;
    private $css_file;
    private $js_file;

    public function __construct()
    {
        add_filter('archive_template', [$this, 'get_archive_page_template'], 10, 1);
        add_filter('single_template', [$this, 'get_single_page_template'], 10, 1);
        add_filter('page_template', [$this, 'get_custom_client_page_template'], 1, 1);
        add_filter('page_template', [$this, 'get_custom_start_page_template'], 1, 1);
        add_filter('page_template', [$this, 'get_custom_selections_page_template'], 1, 1);
        add_filter('page_template', [$this, 'get_custom_billing_page_template'], 1, 1);
        add_filter('page_template', [$this, 'get_custom_quote_page_template'], 1, 1);
        add_filter('page_template', [$this, 'get_custom_invoice_page_template'], 1, 1);
        add_filter('page_template', [$this, 'get_custom_payment_page_template'], 1, 1);
        add_filter('page_template', [$this, 'get_custom_card_page_template'], 1, 1);
        add_filter('page_template', [$this, 'get_custom_wallet_page_template'], 1, 1);
        add_filter('page_template', [$this, 'get_custom_receipt_page_template'], 1, 1);
        add_filter('page_template', [$this, 'get_custom_faq_page_template'], 1, 1);
        add_filter('page_template', [$this, 'get_custom_support_page_template'], 1, 1);
        add_filter('page_template', [$this, 'get_custom_contact_page_template'], 1, 1);
        add_filter('page_template', [$this, 'get_custom_contact_success_page_template'], 1, 1);
    
        $pages = new Pages;
        $posttypes = new Post_Types();

        $this->page_titles = $pages->page_titles;
        $this->post_types = $posttypes->post_types;
        $this->css_file = new CSS;
        $this->js_file = new JS;
    }

    function get_archive_page_template($archive_template)
    {
        foreach ($this->post_types as $post_type) {

            if (is_post_type_archive($post_type['name'])) {
                $archive_template = ORB_PRODUCTS_SERVICES . 'Post_Types/' . $post_type['plural'] . '/archive-' . $post_type['name'] . '.php';

                if (file_exists($archive_template)) {
                    add_action('wp_head', [$this->css_file, 'load_post_types_css']);
                    add_action('wp_footer', [$this->js_file, 'load_post_types_archive_react']);

                    return $archive_template;
                } else {
                    error_log('Post Type ' . $post_type['name'] . ' archive template not found.');
                }
            }
        }
    }

    function get_single_page_template($single_template)
    {
        foreach ($this->post_types as $post_type) {

            if (is_singular($post_type['name'])) {
                $single_template = ORB_PRODUCTS_SERVICES . 'Post_Types/' . $post_type['plural'] . '/single-' . $post_type['name'] . '.php';

                if (file_exists($single_template)) {
                    add_action('wp_head', [$this->css_file, 'load_post_types_css']);
                    add_action('wp_footer', [$this->js_file, 'load_post_types_single_react']);

                    return $single_template;
                } else {
                    error_log('Post Type ' . $post_type['name'] . ' single template not found.');
                }
            }
        }
    }


    function get_custom_client_page_template($page_template)
    {
        $start_page = get_page_by_path('client');

        if ($start_page && is_page($start_page->ID)) {
            $page_template = ORB_PRODUCTS_SERVICES . 'Pages/page-client.php';

            if (file_exists($page_template)) {
                return $page_template;
            } else {
                error_log('Client Page Template does not exist.');
            }
        }

        return $page_template;
    }

    function get_custom_start_page_template($page_template)
    {
        $start_page = get_page_by_path('client/start');

        if ($start_page && is_page($start_page->ID)) {
            $page_template = ORB_PRODUCTS_SERVICES . 'Pages/page-start.php';

            if (file_exists($page_template)) {
                return $page_template;
            } else {
                error_log('Start Page Template does not exist.');
            }
        }

        return $page_template;
    }

    function get_custom_selections_page_template($page_template)
    {
        $selections_page = get_page_by_path('client/selections');

        if ($selections_page && is_page($selections_page->ID)) {
            $page_template = ORB_PRODUCTS_SERVICES . 'Pages/page-selections.php';

            if (file_exists($page_template)) {
                return $page_template;
            } else {
                error_log('Selections Page Template does not exist.');
            }
        }

        return $page_template;
    }

    function get_custom_billing_page_template($page_template)
    {
        $quote_page = get_page_by_path('billing');

        if ($quote_page && is_page($quote_page->ID)) {
            $page_template = ORB_PRODUCTS_SERVICES . 'Pages/page-billing.php';

            if (file_exists($page_template)) {
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
            $page_template = ORB_PRODUCTS_SERVICES . 'Pages/page-quote.php';

            if (file_exists($page_template)) {
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
            $page_template = ORB_PRODUCTS_SERVICES . 'Pages/page-invoice.php';

            if (file_exists($page_template)) {
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
            $page_template = ORB_PRODUCTS_SERVICES . 'Pages/page-payment.php';

            if (file_exists($page_template)) {
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
            $page_template = ORB_PRODUCTS_SERVICES . 'Pages/page-card.php';

            if (file_exists($page_template)) {
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
            $page_template = ORB_PRODUCTS_SERVICES . 'Pages/page-wallet.php';

            if (file_exists($page_template)) {
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
            $page_template = ORB_PRODUCTS_SERVICES . 'Pages/page-receipt.php';

            if (file_exists($page_template)) {
                return $page_template;
            } else {
                error_log('Receipt Page Template does not exist.');
            }
        }

        return $page_template;
    }

    function get_custom_faq_page_template($page_template)
    {

        if (is_page('faq')) {
            $page_template = ORB_PRODUCTS_SERVICES . 'Pages/page-faq.php';

            if (file_exists($page_template)) {
                return $page_template;
            } else {
                error_log('Faq Page Template does not exist.');
            }
        }

        return $page_template;
    }

    function get_custom_support_page_template($page_template)
    {

        if (is_page('support')) {
            $page_template = ORB_PRODUCTS_SERVICES . 'Pages/page-support.php';

            if (file_exists($page_template)) {
                return $page_template;
            } else {
                error_log('Support Page Template does not exist.');
            }
        }

        return $page_template;
    }


    function get_custom_contact_page_template($page_template)
    {

        if (is_page('contact')) {
            $page_template = ORB_PRODUCTS_SERVICES . 'Pages/page-contact.php';

            if (file_exists($page_template)) {
                return $page_template;
            } else {
                error_log('Contact Page Template does not exist.');
            }
        }

        return $page_template;
    }

    function get_custom_contact_success_page_template($page_template)
    {

        if (is_page('contact/success')) {
            $page_template = ORB_PRODUCTS_SERVICES . 'Pages/page-contact-success.php';

            if (file_exists($page_template)) {
                return $page_template;
            } else {
                error_log('Contact Success Page Template does not exist.');
            }
        }

        return $page_template;
    }
}
