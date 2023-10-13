<?php

namespace ORB_Services\Templates;

class Templates
{

    public function __construct()
    {
        add_filter('archive_template', [$this, 'get_archive_page_template']);
        add_filter('single_template', [$this, 'get_single_page_template']);
        add_filter('page_template', [$this, 'get_custom_client_page_template']);
        add_filter('page_template', [$this, 'get_custom_start_page_template']);
        add_filter('page_template', [$this, 'get_custom_selections_page_template']);
        add_filter('page_template', [$this, 'get_custom_billing_page_template']);
        add_filter('page_template', [$this, 'get_custom_quote_page_template']);
        add_filter('page_template', [$this, 'get_custom_invoice_page_template']);
        add_filter('page_template', [$this, 'get_custom_payment_page_template']);
        add_filter('page_template', [$this, 'get_custom_receipt_page_template']);
        add_filter('page_template', [$this, 'get_custom_schedule_page_template']);
        add_filter('page_template', [$this, 'get_custom_faq_page_template']);
        add_filter('page_template', [$this, 'get_custom_support_page_template']);
        add_filter('page_template', [$this, 'get_custom_contact_page_template']);
        add_filter('page_template', [$this, 'get_custom_contact_success_page_template']);
    }

    function get_archive_page_template($archive_template)
    {
        if (is_post_type_archive('services')) {
            $archive_template = ORB_SERVICES . 'Pages/archive-services.php';

            if (file_exists($archive_template)) {
                return $archive_template;
            } else {
                error_log('Services Post Type Archive Template does not exist.');
            }
        }

        return $archive_template;
    }

    function get_single_page_template($single_template)
    {
        if (is_singular('services')) {
            $single_template = ORB_SERVICES . 'Pages/single-services.php';

            if (file_exists($single_template)) {
                return $single_template;
            } else {
                error_log('Services Post Type Single Template does not exist.');
            }
        }

        return $single_template;
    }

    function get_custom_client_page_template($page_template)
    {
        $start_page = get_page_by_path('client');

        if ($start_page && is_page($start_page->ID)) {
            $page_template = ORB_SERVICES . 'Pages/page-client.php';

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
            $page_template = ORB_SERVICES . 'Pages/page-start.php';

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
            $page_template = ORB_SERVICES . 'Pages/page-selections.php';

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
            $page_template = ORB_SERVICES . 'Pages/page-billing.php';

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
            $page_template = ORB_SERVICES . 'Pages/page-quote.php';

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
            $page_template = ORB_SERVICES . 'Pages/page-invoice.php';

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
            $page_template = ORB_SERVICES . 'Pages/page-payment.php';

            if (file_exists($page_template)) {
                return $page_template;
            } else {
                error_log('Payment Page Template does not exist.');
            }
        }

        return $page_template;
    }

    function get_custom_receipt_page_template($page_template)
    {
        $receipt_page = get_page_by_path('billing/receipt');

        if ($receipt_page && is_page($receipt_page->ID)) {
            $page_template = ORB_SERVICES . 'Pages/page-receipt.php';

            if (file_exists($page_template)) {
                return $page_template;
            } else {
                error_log('Receipt Page Template does not exist.');
            }
        }

        return $page_template;
    }

    function get_custom_schedule_page_template($page_template)
    {
        $schedule_page = get_page_by_path('schedule');

        if ($schedule_page && is_page($schedule_page->ID)) {
            $page_template = ORB_SERVICES . 'Pages/page-schedule.php';

            if (file_exists($page_template)) {
                return $page_template;
            } else {
                error_log('Schedule Page Template does not exist.');
            }
        }

        return $page_template;
    }

    function get_custom_faq_page_template($page_template)
    {

        if (is_page('faq')) {
            $page_template = ORB_SERVICES . 'Pages/page-faq.php';

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
            $page_template = ORB_SERVICES . 'Pages/page-support.php';

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
            $page_template = ORB_SERVICES . 'Pages/page-contact.php';

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
            $page_template = ORB_SERVICES . 'Pages/page-contact-success.php';

            if (file_exists($page_template)) {
                return $page_template;
            } else {
                error_log('Contact Success Page Template does not exist.');
            }
        }

        return $page_template;
    }
}
