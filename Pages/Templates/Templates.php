<?php

namespace ORBServices\Pages\Templates;

class Templates
{

    public function __construct()
    {
        add_filter('page_template', [$this, 'get_archive_page_template']);
        add_filter('single_template', [$this, 'get_single_page_template']);
        add_filter('template_include', [$this, 'get_custom_start_page_template']);
        add_filter('template_include', [$this, 'get_custom_quote_page_template']);
        add_filter('template_include', [$this, 'get_custom_invoice_page_template']);
        add_filter('template_include', [$this, 'get_custom_payment_page_template']);
        add_filter('template_include', [$this, 'get_custom_receipt_page_template']);
        add_filter('page_template', [$this, 'get_custom_faq_page_template']);
        add_filter('page_template', [$this, 'get_custom_support_page_template']);
        add_filter('page_template', [$this, 'get_custom_contact_page_template']);
    }

    function get_archive_page_template($single_template)
    {
        $request_path = $_SERVER['REQUEST_URI'];
        $path_segments = explode('/', $request_path);

        if ($path_segments[1] === 'services') {
            $single_template = ORB_SERVICES . '/pages/templates/archive-services.php';
        }

        return $single_template;
    }

    function get_single_page_template($single_template)
    {
        global $post;

        if ($post->post_type === 'services') {
            $single_template = ORB_SERVICES . '/pages/templates/single-services.php';
        }

        return $single_template;
    }

    function get_custom_start_page_template($template)
    {
        $start_page = get_page_by_path('services/start');

        if ($start_page && is_page($start_page->ID)) {
            $custom_template = ORB_SERVICES . '/pages/templates/page-start.php';

            if (file_exists($custom_template)) {
                return $custom_template;
            }
        }
        return $template;
    }

    function get_custom_quote_page_template($template)
    {
        $quote_page = get_page_by_path('services/quote');

        if ($quote_page && is_page($quote_page->ID)) {
            $custom_template = ORB_SERVICES . '/pages/templates/page-quote.php';

            if (file_exists($custom_template)) {
                return $custom_template;
            }
        }
        return $template;
    }

    function get_custom_invoice_page_template($template)
    {
        $services_invoice = get_page_by_path('services/invoice');

        if ($services_invoice && is_page($services_invoice->ID)) {
            $custom_template = ORB_SERVICES . '/pages/templates/page-invoice.php';

            if (file_exists($custom_template)) {
                return $custom_template;
            }
        }
        return $template;
    }

    function get_custom_payment_page_template($template)
    {
        $services_payment = get_page_by_path('services/payment');

        if ($services_payment && is_page($services_payment->ID)) {
            $custom_template = ORB_SERVICES . '/pages/templates/page-payment.php';

            if (file_exists($custom_template)) {
                return $custom_template;
            }
        }
        return $template;
    }

    function get_custom_receipt_page_template($template)
    {
        $services_receipt = get_page_by_path('services/receipt');

        if ($services_receipt && is_page($services_receipt->ID)) {
            $custom_template = ORB_SERVICES . '/pages/templates/page-receipt.php';

            if (file_exists($custom_template)) {
                return $custom_template;
            }
        }
        return $template;
    }

    function get_custom_faq_page_template($page_template)
    {

        if (is_page('faq')) {
            $page_template = ORB_SERVICES . '/pages/templates/page-faq.php';
        }

        return $page_template;
    }

    function get_custom_support_page_template($page_template)
    {

        if (is_page('support')) {
            $page_template = ORB_SERVICES . '/pages/templates/page-support.php';
        }

        return $page_template;
    }


    function get_custom_contact_page_template($page_template)
    {

        if (is_page('contact')) {
            $page_template = ORB_SERVICES . '/pages/templates/page-contact.php';
        }

        return $page_template;
    }
}
