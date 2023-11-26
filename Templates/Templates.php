<?php

namespace ORB\Products_Services\Templates;

use ORB\Products_Services\CSS\CSS;
use ORB\Products_Services\JS\JS;
use ORB\Products_Services\Post_Types\Post_Types;

class Templates
{
    private $css_file;
    private $js_file;
    private $post_types;

    public function __construct()
    {
        $this->css_file = new CSS;
        $this->js_file = new JS;
        $posttypes = new Post_Types;

        $this->post_types = $posttypes->post_types;

        add_filter('template_include', [$this, 'get_custom_page_template']);
        add_filter('custom_archive_template', [$this, 'get_archive_page_template'], 10, 2);
        add_filter('single_template', [$this, 'get_single_page_template'], 10, 2);
    }

    function get_front_page_template($frontpage_template)
    {
        if (is_front_page()) {
            add_action('wp_head', [$this->css_file, 'load_front_page_css']);
            add_action('wp_footer', [$this->js_file, 'load_front_page_react']);
        }

        return $frontpage_template;
    }

    function get_custom_page_template($name)
    {
        $custom_template = ORB_PRODUCTS_SERVICES . "Pages/page-{$name}.php";

        if (file_exists($custom_template)) {
            add_action('wp_head', [$this->css_file, 'load_pages_css']);
            add_action('wp_footer', [$this->js_file, 'load_pages_react']);

            return $custom_template;
        } else {
            return ORB_PRODUCTS_SERVICES . "Pages/page.php";
        }
    }

    function get_protected_page_template($template)
    {
        $template = ORB_PRODUCTS_SERVICES . 'Pages/page-protected.php';

        if (file_exists($template)) {
            add_action('wp_head', [$this->css_file, 'load_pages_css']);
            add_action('wp_footer', [$this->js_file, 'load_pages_react']);

            return $template;
        } else {
            error_log('Protected Page Template does not exist.');
        }

        return $template;
    }

    function get_page_template($template)
    {
        $template = ORB_PRODUCTS_SERVICES . 'Pages/page.php';;

        if (file_exists($template)) {
            add_action('wp_head', [$this->css_file, 'load_pages_css']);
            add_action('wp_footer', [$this->js_file, 'load_pages_react']);

            return $template;
        } else {
            error_log('Page Template does not exist.');
        }

        return $template;
    }

    function get_archive_page_template($post_type)
    {
        error_log(print_r($post_type, true));
        $custom_archive_template = ORB_PRODUCTS_SERVICES . 'Post_Types/' . $post_type['plural'] . '/archive-' . $post_type['name'] . '.php';

        if (file_exists($custom_archive_template)) {
            add_action('wp_head', [$this->css_file, 'load_post_types_css']);
            add_action('wp_footer', [$this->js_file, 'load_post_types_archive_react']);
            error_log('get_archive_page_template');
            return $custom_archive_template;
        }
    }


    function get_single_page_template($post_type)
    {
        $single_template = ORB_PRODUCTS_SERVICES . 'Post_Types/' . $post_type['plural'] . '/single-' . $post_type['name'] . '.php';

        if (file_exists($single_template)) {
            add_action('wp_head', [$this->css_file, 'load_post_types_css']);
            add_action('wp_footer', [$this->js_file, 'load_post_types_single_react']);
        }

        return $single_template;
    }
}
