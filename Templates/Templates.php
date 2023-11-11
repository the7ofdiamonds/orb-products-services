<?php

namespace ORB\Products_Services\Templates;

use ORB\Products_Services\CSS\CSS;
use ORB\Products_Services\JS\JS;
use ORB\Products_Services\Pages\Pages;
use ORB\Products_Services\Post_Types\Post_Types;

class Templates
{
    private $pages;
    private $protected_pages;
    private $post_types;
    private $css_file;
    private $js_file;

    public function __construct()
    {
        $pages = new Pages;
        $posttypes = new Post_Types();
        $this->css_file = new CSS;
        $this->js_file = new JS;

        $this->pages = $pages->pages;
        $this->protected_pages = $pages->protected_pages;
        $this->post_types = $posttypes->post_types;

        $this->load_page();
    }

    function load_page()
    {
        if ($_SERVER['REQUEST_URI'] === '/') {
            add_filter('frontpage_template', [$this, 'get_custom_front_page']);
        }

        if (!empty($this->protected_pages)) {
            foreach ($this->protected_pages as $page) {
                $full_url = explode('/', $page);
                $full_path = explode('/', $_SERVER['REQUEST_URI']);

                $full_url = array_filter($full_url, function ($value) {
                    return $value !== "";
                });

                $full_path = array_filter($full_path, function ($value) {
                    return $value !== "";
                });

                $full_url = array_values($full_url);
                $full_path = array_values($full_path);

                $differences = array_diff($full_url, $full_path);

                if (empty($differences)) {
                    add_filter('template_include', [$this, 'get_custom_protected_page_templates']);
                }
            }
        }

        if (!empty($this->pages)) {
            foreach ($this->pages as $page) {
                $full_url = explode('/', $page);
                $full_path = explode('/', $_SERVER['REQUEST_URI']);

                $full_url = array_filter($full_url, function ($value) {
                    return $value !== "";
                });

                $full_path = array_filter($full_path, function ($value) {
                    return $value !== "";
                });

                $full_url = array_values($full_url);
                $full_path = array_values($full_path);

                $differences = array_diff($full_url, $full_path);

                if (empty($differences)) {
                    add_filter('template_include', [$this, 'get_custom_page_templates']);
                }
            }
        }

        if (!empty($this->post_types)) {
            add_filter('archive_template', [$this, 'get_archive_page_template']);
            add_filter('single_template', [$this, 'get_single_page_template']);
        }
    }

    function get_custom_front_page($frontpage_template)
    {
        if ($_SERVER['REQUEST_URI'] === '/') {
            add_action('wp_head', [$this->css_file, 'load_front_page_css']);
            add_action('wp_footer', [$this->js_file, 'load_front_page_react']);
        }

        return $frontpage_template;
    }

    function get_custom_page_templates($template)
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

    function get_custom_protected_page_templates($template)
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
}
