<?php

namespace ORB\Products_Services\Templates;

use ORB\Products_Services\CSS\CSS;
use ORB\Products_Services\JS\JS;

class Templates
{
    private $css;
    private $js;
    private $pluginDir;

    public function __construct(
        CSS $css,
        JS $js,
    ) {
        $this->css = $css;
        $this->js = $js;
        $this->pluginDir = ORB_PRODUCTS_SERVICES;
    }

    function get_front_page_template($frontpage_template, $section)
    {
        if (is_front_page()) {
            add_action('wp_head', function () use ($section) {
                $this->css->load_front_page_css($section);
            });
            add_action('wp_footer', function () use ($section) {
                $this->js->load_front_page_react($section);
            });

            return $frontpage_template;
        }
    }


    function get_custom_page_template($template_include, $custom_page)
    {
        $custom_template = $this->pluginDir . "Pages/page-{$custom_page['name']}.php";

        if (file_exists($custom_template)) {
            add_action('wp_head', function () use ($custom_page) {
                $this->css->load_pages_css($custom_page);
            });
            add_action('wp_footer', function () use ($custom_page) {
                $this->js->load_pages_react($custom_page);
            });

            return $custom_template;
        }

        return $template_include;
    }

    function get_protected_page_template($template_include, $protected_page)
    {
        $template = $this->pluginDir . 'Pages/page-protected.php';

        if (file_exists($template)) {
            add_action('wp_head', function () use ($protected_page) {
                $this->css->load_pages_css($protected_page);
            });
            add_action('wp_footer', function () use ($protected_page) {
                $this->js->load_pages_react($protected_page);
            });

            return $template;
        } else {
            error_log('Protected Page Template does not exist.');
        }

        return $template_include;
    }

    function get_page_template($template_include, $page)
    {
        $template = $this->pluginDir . 'Pages/page.php';;

        if (file_exists($template)) {
            add_action('wp_head', function () use ($page) {
                $this->css->load_pages_css($page);
            });
            add_action('wp_footer', function () use ($page) {
                $this->js->load_pages_react($page);
            });

            return $template;
        } else {
            error_log('Page Template does not exist.');
        }

        return $template_include;
    }

    function get_taxonomy_page_template($taxonomy_template, $taxonomy)
    {
        if (is_tax($taxonomy['taxonomy'])) {
            $custom_taxonomy_template = $this->pluginDir . "Taxonomies/taxonomy-{$taxonomy['file_name']}.php";

            if (file_exists($custom_taxonomy_template)) {
                add_action('wp_head', function () use ($taxonomy) {
                    $this->css->load_taxonomies_css($taxonomy);
                });
                add_action('wp_footer', function () use ($taxonomy) {
                    $this->js->load_taxonomies_react($taxonomy);
                });

                return $custom_taxonomy_template;
            }
        }

        return $taxonomy_template;
    }

    function get_archive_page_template($archive_template, $post_type)
    {
        if (is_post_type_archive($post_type['name'])) {
            $custom_archive_template = $this->pluginDir . 'Post_Types/' . $post_type['plural'] . '/archive-' . $post_type['name'] . '.php';

            if (file_exists($custom_archive_template)) {
                add_action('wp_head', function () use ($post_type) {
                    $this->css->load_post_types_css($post_type);
                });
                add_action('wp_footer', function () use ($post_type) {
                    $this->js->load_post_types_archive_react($post_type);
                });

                return $custom_archive_template;
            }
        }

        return $archive_template;
    }

    function get_single_page_template($single_template, $post_type)
    {
        if (is_singular($post_type['name'])) {
            $custom_single_template = $this->pluginDir . 'Post_Types/' . $post_type['plural'] . '/single-' . $post_type['name'] . '.php';

            if (file_exists($custom_single_template)) {
                add_action('wp_head', function () use ($post_type) {
                    $this->css->load_post_types_css($post_type);
                });
                add_action('wp_footer', function () use ($post_type) {
                    $this->js->load_post_types_single_react($post_type);
                });

                return $custom_single_template;
            }
        }

        return $single_template;
    }
}
