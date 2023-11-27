<?php

namespace ORB\Products_Services\Templates;

use ORB\Products_Services\CSS\CSS;
use ORB\Products_Services\JS\JS;
use ORB\Products_Services\Pages\Pages;
use ORB\Products_Services\Post_Types\Post_Types;
use ORB\Products_Services\Taxonomies\Taxonomies;

class Templates
{
    private $css;
    private $js;
    private $front_page_react;
    private $custom_pages_list;
    private $protected_pages_list;
    private $pages_list;
    private $post_types;
    private $taxonomies_list;

    public function __construct(
        CSS $css,
        JS $js,
        Pages $pages,
        Post_Types $posttypes,
        Taxonomies $taxonomies
    ) {
        $this->css = $css;
        $this->js = $js;

        $this->front_page_react = $pages->front_page_react;
        $this->custom_pages_list = $pages->custom_pages_list;
        $this->protected_pages_list = $pages->protected_pages_list;
        $this->pages_list = $pages->pages_list;
        
        $this->post_types = $posttypes->post_types;
        $this->taxonomies_list = $taxonomies->taxonomies_list;
    }

    function get_front_page_template($frontpage_template)
    {
        if (is_front_page()) {
            if (!empty($this->front_page_react)) {
                foreach ($this->front_page_react as $section) {
                    add_action('wp_head', function () use ($section) {
                        $this->css->load_front_page_css($section);
                    });
                    add_action('wp_footer', function () use ($section) {
                        $this->js->load_front_page_react($section);
                    });
                }
            }
        }

        return $frontpage_template;
    }

    function get_custom_page_template($template)
    {
        if (!empty($this->custom_pages_list)) {
            foreach ($this->custom_pages_list as $custom_page) {
                $custom_template = ORB_PRODUCTS_SERVICES . "Pages/page-{$custom_page['name']}.php";

                if (file_exists($custom_template)) {
                    add_action('wp_head', function () use ($custom_page) {
                        $this->css->load_pages_css($custom_page);
                    });
                    add_action('wp_footer', function () use ($custom_page) {
                        $this->js->load_pages_react($custom_page);
                    });

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
            }
        }

        return $template;
    }

    function get_archive_page_template($archive_template)
    {
        if (!empty($this->post_types)) {
            foreach ($this->post_types as $post_type) {

                if (is_post_type_archive($post_type['name'])) {
                    $custom_archive_template = ORB_PRODUCTS_SERVICES . 'Post_Types/' . $post_type['plural'] . '/archive-' . $post_type['name'] . '.php';

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
            }
        }

        return $archive_template;
    }


    function get_single_page_template($single_template)
    {
        if (!empty($this->post_types)) {
            foreach ($this->post_types as $post_type) {

                if (is_singular($post_type['name'])) {
                    $custom_single_template = ORB_PRODUCTS_SERVICES . 'Post_Types/' . $post_type['plural'] . '/single-' . $post_type['name'] . '.php';

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
            }
        }

        return $single_template;
    }

    function get_taxonomy_page_template($taxonomy_template)
    {
        if (!empty($this->taxonomies_list)) {
            foreach ($this->taxonomies_list as $taxonomy) {

                if (is_tax($taxonomy['taxonomy'])) {
                    $custom_taxonomy_template = ORB_PRODUCTS_SERVICES . "Taxonomies/taxonomy-{$taxonomy['file_name']}.php";

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
            }
        }

        return $taxonomy_template;
    }
}
