<?php

namespace ORB_Services\Templates;

class Templates
{

    public function __construct()
    {
        add_filter('archive_template', [$this, 'get_archive_page_template']);
        add_filter('single_template', [$this, 'get_single_page_template']);
        add_filter('template_include', [$this, 'get_custom_start_page_template']);
        add_filter('template_include', [$this, 'get_custom_selections_page_template']);
        add_filter('template_include', [$this, 'get_custom_quote_page_template']);
        add_filter('template_include', [$this, 'get_custom_invoice_page_template']);
        add_filter('template_include', [$this, 'get_custom_payment_page_template']);
        add_filter('template_include', [$this, 'get_custom_receipt_page_template']);
        add_filter('template_include', [$this, 'get_custom_schedule_page_template']);
        add_filter('page_template', [$this, 'get_custom_faq_page_template']);
        add_filter('page_template', [$this, 'get_custom_support_page_template']);
        add_filter('page_template', [$this, 'get_custom_contact_page_template']);
        add_filter('page_template', [$this, 'get_custom_contact_success_page_template']);
    }

    function get_archive_page_template($archive_template)
    {
        if (is_post_type_archive('services')) {
            $archive_template = ORB_SERVICES . 'Pages/archive-services.php';
        }

        return $archive_template;
    }

    function get_single_page_template($single_template)
    {
        if (is_singular('services')) {
            $single_template = ORB_SERVICES . 'Pages/single-services.php';
        }

        return $single_template;
    }

    function get_custom_start_page_template($template)
    {
        $start_page = get_page_by_path('client/start');

        if ($start_page && is_page($start_page->ID)) {
            $custom_template = ORB_SERVICES . 'Pages/page-start.php';

            if (file_exists($custom_template)) {
                return $custom_template;
            }
        }
        return $template;
    }

    function get_custom_selections_page_template($template)
    {
        $selections_page = get_page_by_path('client/selections');

        if ($selections_page && is_page($selections_page->ID)) {
            $custom_template = ORB_SERVICES . 'Pages/page-selections.php';

            if (file_exists($custom_template)) {
                return $custom_template;
            }
        }
        return $template;
    }

    function get_custom_quote_page_template($template)
    {
        $quote_page = get_page_by_path('billing/quote');

        if ($quote_page && is_page($quote_page->ID)) {
            $custom_template = ORB_SERVICES . 'Pages/page-quote.php';

            if (file_exists($custom_template)) {
                return $custom_template;
            }
        }
        return $template;
    }

    function get_custom_invoice_page_template($template)
    {
        $invoice_page = get_page_by_path('billing/invoice');

        if ($invoice_page && is_page($invoice_page->ID)) {
            $custom_template = ORB_SERVICES . 'Pages/page-invoice.php';

            if (file_exists($custom_template)) {
                return $custom_template;
            }
        }
        return $template;
    }

    function get_custom_payment_page_template($template)
    {
        $payment_page = get_page_by_path('billing/payment');

        if ($payment_page && is_page($payment_page->ID)) {
            $custom_template = ORB_SERVICES . 'Pages/page-payment.php';

            if (file_exists($custom_template)) {
                return $custom_template;
            }
        }
        return $template;
    }

    function get_custom_receipt_page_template($template)
    {
        $receipt_page = get_page_by_path('billing/receipt');

        if ($receipt_page && is_page($receipt_page->ID)) {
            $custom_template = ORB_SERVICES . 'Pages/page-receipt.php';

            if (file_exists($custom_template)) {
                return $custom_template;
            }
        }
        return $template;
    }

    function get_custom_schedule_page_template($template)
    {
        $schedule_page = get_page_by_path('schedule');

        if ($schedule_page && is_page($schedule_page->ID)) {
            $custom_template = ORB_SERVICES . 'Pages/page-schedule.php';

            if (file_exists($custom_template)) {
                return $custom_template;
            }
        }
        return $template;
    }

    function get_custom_faq_page_template($page_template)
    {

        if (is_page('faq')) {
            $page_template = ORB_SERVICES . 'Pages/page-faq.php';
        }

        return $page_template;
    }

    function get_custom_support_page_template($page_template)
    {

        if (is_page('support')) {
            $page_template = ORB_SERVICES . 'Pages/page-support.php';
        }

        return $page_template;
    }


    function get_custom_contact_page_template($page_template)
    {

        if (is_page('contact')) {
            $page_template = ORB_SERVICES . 'Pages/page-contact.php';
        }

        return $page_template;
    }

    function get_custom_contact_success_page_template($page_template)
    {

        if (is_page('contact/success')) {
            $page_template = ORB_SERVICES . 'Pages/page-contact-success.php';
        }

        return $page_template;
    }
}
