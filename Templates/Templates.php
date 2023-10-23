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
        add_filter('frontpage_template', [$this, 'get_custom_front_page']);

        add_filter('page_template', [$this, 'get_custom_client_page_template']);
        add_filter('page_template', [$this, 'get_custom_start_page_template']);
        add_filter('page_template', [$this, 'get_custom_selections_page_template']);

        add_filter('page_template', [$this, 'get_custom_faq_page_template']);
        add_filter('page_template', [$this, 'get_custom_support_page_template']);
        add_filter('page_template', [$this, 'get_custom_contact_page_template']);
        add_filter('page_template', [$this, 'get_custom_contact_success_page_template']);

        $pages = new Pages;
        $posttypes = new Post_Types();

        $this->page_titles = $pages->page_titles;
        $this->post_types = $posttypes->post_types;
        $this->css_file = new CSS;
        $this->js_file = new JS;

        new Templates_Post_types;
        new Templates_Billing;
    }

    function get_custom_front_page($frontpage_template)
    {
        if (is_front_page()) {
            add_action('wp_head', [$this->css_file, 'load_front_page_css']);
            add_action('wp_footer', [$this->js_file, 'load_front_page_react']);
        }

        return $frontpage_template;
    }

    function get_custom_client_page_template($page_template)
    {
        $start_page = get_page_by_path('client');

        if ($start_page && is_page($start_page->ID)) {
            $page_template = ORB_PRODUCTS_SERVICES . 'Pages/page-protected.php';

            if (file_exists($page_template)) {
                add_action('wp_head', [$this->css_file, 'load_pages_css']);
                add_action('wp_footer', [$this->js_file, 'load_pages_react']);

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
            $page_template = ORB_PRODUCTS_SERVICES . 'Pages/page-protected.php';

            if (file_exists($page_template)) {
                add_action('wp_head', [$this->css_file, 'load_pages_css']);
                add_action('wp_footer', [$this->js_file, 'load_pages_react']);

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
            $page_template = ORB_PRODUCTS_SERVICES . 'Pages/page-protected.php';

            if (file_exists($page_template)) {
                add_action('wp_head', [$this->css_file, 'load_pages_css']);
                add_action('wp_footer', [$this->js_file, 'load_pages_react']);

                return $page_template;
            } else {
                error_log('Selections Page Template does not exist.');
            }
        }

        return $page_template;
    }

    function get_custom_faq_page_template($page_template)
    {

        if (is_page('faq')) {
            $page_template = ORB_PRODUCTS_SERVICES . 'Pages/page.php';

            if (file_exists($page_template)) {
                add_action('wp_head', [$this->css_file, 'load_pages_css']);
                add_action('wp_footer', [$this->js_file, 'load_pages_react']);

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
            $page_template = ORB_PRODUCTS_SERVICES . 'Pages/page.php';

            if (file_exists($page_template)) {
                add_action('wp_head', [$this->css_file, 'load_pages_css']);
                add_action('wp_footer', [$this->js_file, 'load_pages_react']);

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
            $page_template = ORB_PRODUCTS_SERVICES . 'Pages/page.php';

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
            $page_template = ORB_PRODUCTS_SERVICES . 'Pages/page.php';

            if (file_exists($page_template)) {
                return $page_template;
            } else {
                error_log('Contact Success Page Template does not exist.');
            }
        }

        return $page_template;
    }
}
