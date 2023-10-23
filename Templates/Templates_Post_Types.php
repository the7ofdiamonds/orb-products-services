<?php

namespace ORB_Products_Services\Templates;

use ORB_Products_Services\CSS\CSS;
use ORB_Products_Services\JS\JS;
use ORB_Products_Services\Pages\Pages;
use ORB_Products_Services\Post_Types\Post_Types;

class Templates_Post_types
{
    private $page_titles;
    private $post_types;
    private $css_file;
    private $js_file;

    public function __construct()
    {
        add_filter('archive_template', [$this, 'get_archive_page_template']);
        add_filter('single_template', [$this, 'get_single_page_template']);

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
}
