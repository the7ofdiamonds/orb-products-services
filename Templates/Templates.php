<?php

namespace ORB\Products_Services\Templates;

use ORB\Products_Services\CSS\CSS;
use ORB\Products_Services\JS\JS;
use ORB\Products_Services\Pages\Pages;
use ORB\Products_Services\Post_Types\Post_Types;

class Templates
{
    private $css;
    private $js;
    public $pages;
    public $posttypes;
    private $custom_pages_list;
    private $protected_pages_list;
    private $pages_list;
    private $post_types;

    public function __construct(
        CSS $css,
        JS $js,
        Pages $pages,
        Post_Types $posttypes
    ) {
        $this->css = $css;
        $this->js = $js;

        $this->custom_pages_list = $pages->custom_pages_list;
        $this->protected_pages_list = $pages->protected_pages_list;
        $this->pages_list = $pages->pages_list;
        $this->post_types = $posttypes->post_types;
    }

    function get_front_page_template($frontpage_template)
    {
        if (is_front_page()) {
            add_action('wp_head', [$this->css, 'load_front_page_css']);
            add_action('wp_footer', [$this->js, 'load_front_page_react']);
        }

        return $frontpage_template;
    }

    function get_custom_page_template($template)
    {
        if (!empty($this->custom_pages_list)) {
            foreach ($this->custom_pages_list as $custom_page) {
                $custom_template = ORB_PRODUCTS_SERVICES . "Pages/page-{$custom_page['name']}.php";

                if (file_exists($custom_template)) {
                    add_action('wp_head', [$this->css, 'load_pages_css']);
                    add_action('wp_footer', [$this->js, 'load_pages_react']);

                    return $custom_template;
                }
            }
        }

        return $template;
    }

    function get_protected_page_template($template)
    {
        if (!empty($this->protected_pages_list)) {
            foreach ($this->protected_pages_list as $protected_page) {
                $template = ORB_PRODUCTS_SERVICES . 'Pages/page-protected.php';

                if (file_exists($template)) {
                    add_action('wp_head', [$this->css, 'load_pages_css']);
                    add_action('wp_footer', [$this->js, 'load_pages_react']);

                    return $template;
                } else {
                    error_log('Protected Page Template does not exist.');
                }
            }
        }

        return $template;
    }

    function get_page_template($template)
    {
        if (!empty($this->pages_list)) {
            foreach ($this->pages_list as $page) {

                $template = ORB_PRODUCTS_SERVICES . 'Pages/page.php';;

                if (file_exists($template)) {
                    add_action('wp_head', [$this->css, 'load_pages_css']);
                    add_action('wp_footer', [$this->js, 'load_pages_react']);

                    return $template;
                } else {
                    error_log('Page Template does not exist.');
                }
            }
        }

        return $template;
    }

    function get_archive_page_template($archive_template)
    {
        if (!empty($this->post_types)) {
            foreach ($this->post_types as $post_type) {
                $custom_archive_template = ORB_PRODUCTS_SERVICES . 'Post_Types/' . $post_type['plural'] . '/archive-' . $post_type['name'] . '.php';

                if (file_exists($custom_archive_template)) {
                    add_action('wp_head', [$this->css, 'load_post_types_css']);
                    add_action('wp_footer', [$this->js, 'load_post_types_archive_react']);

                    return $custom_archive_template;
                }
            }
        }

        return $archive_template;
    }


    function get_single_page_template($single_template)
    {
        if (!empty($this->post_types)) {
            foreach ($this->post_types as $post_type) {
                $custom_single_template = ORB_PRODUCTS_SERVICES . 'Post_Types/' . $post_type['plural'] . '/single-' . $post_type['name'] . '.php';

                if (file_exists($custom_single_template)) {
                    add_action('wp_head', [$this->css, 'load_post_types_css']);
                    add_action('wp_footer', [$this->js, 'load_post_types_single_react']);

                    return $custom_single_template;
                }
            }
        }

        return $single_template;
    }
}
