<?php

namespace ORB\Products_Services\JS;

use ORB\Products_Services\Pages\Pages;
use ORB\Products_Services\Post_Types\Post_Types;
use ORB\Products_Services\Taxonomies\Taxonomies;

class JS
{
    private $handle_prefix;
    private $dir;
    private $dirURL;
    private $buildDir;
    private $buildDirURL;
    private $buildFilePrefix;
    private $buildFilePrefixURL;
    private $front_page_react;
    private $page_titles;
    private $post_types_list;
    private $taxonomies_list;
    private $includes_url;

    public function __construct()
    {
        $this->handle_prefix = 'orb_products_services_';
        $this->dir = ORB_PRODUCTS_SERVICES;
        $this->dirURL = ORB_PRODUCTS_SERVICES_URL;

        $this->buildDir = $this->dir . 'build/';
        $this->buildDirURL = $this->dirURL . 'build/';
        $this->buildFilePrefix = $this->buildDir . 'src_views_';
        $this->buildFilePrefixURL = $this->buildDirURL . 'src_views_';

        $pages = new Pages;
        $posttypes = new Post_Types;
        $tax = new Taxonomies;

        $this->front_page_react = $pages->front_page_react;

        $this->page_titles = $pages->page_titles;
        $this->post_types_list = $posttypes->post_types;
        $this->taxonomies_list = $tax->taxonomies_list;

        $this->includes_url = includes_url();
    }

    function load_front_page_react()
    {
        if ($_SERVER['REQUEST_URI'] === '/') {
            if (!empty($this->front_page_react) && is_array($this->front_page_react)) {
                foreach ($this->front_page_react as $section) {
                    $filePath = $this->buildFilePrefix . $section . '_jsx.js';
                    $filePathURL = $this->buildFilePrefixURL . $section . '_jsx.js';

                    wp_enqueue_script('wp-element', $this->includes_url . 'js/dist/element.min.js', [], null, true);

                    if (file_exists($filePath)) {
                        wp_enqueue_script($this->handle_prefix . 'react_' . $section, $filePathURL, ['wp-element'], 1.0, true);
                    } else {
                        error_log($section . ' page has not been created in react JSX.');
                    }

                    wp_enqueue_script($this->handle_prefix . 'react_index', $this->buildDirURL . 'index.js', ['wp-element'], '1.0', true);
                }
            } else {
                error_log('There are no front page react files to load at ' . $this->dir . ' Pages');
            }
        }
    }

    function load_pages_react()
    {
        if (!empty($this->page_titles) && is_array($this->page_titles)) {
            foreach ($this->page_titles as $page) {
                $path = $_SERVER['REQUEST_URI'];

                if (preg_match($page['regex'], $path)) {
                    $filePath = $this->buildFilePrefix . $page['file_name'] . '_jsx.js';
                    $filePathURL = $this->buildFilePrefixURL . $page['file_name'] . '_jsx.js';

                    wp_enqueue_script('wp-element', $this->includes_url . 'js/dist/element.min.js', [], null, true);

                    if (file_exists($filePath)) {
                        wp_enqueue_script($this->handle_prefix . 'react_' . $page['file_name'], $filePathURL, ['wp-element'], 1.0, true);
                    } else {
                        error_log($page['file_name'] . ' page has not been created in react JSX.');
                    }

                    wp_enqueue_script($this->handle_prefix . 'react_index', $this->buildDirURL . 'index.js', ['wp-element'], '1.0', true);
                    break;
                }
            }
        } else {
            error_log('There are no page titles in the array at ' . $this->dir . ' Pages');
        }
    }

    function load_post_types_archive_react()
    {
        if (!empty($this->post_types_list) && is_array($this->post_types_list)) {
            foreach ($this->post_types_list as $post_type) {

                $filePath = $this->buildFilePrefix . $post_type['archive_page'] . '_jsx.js';
                $filePathURL = $this->buildFilePrefixURL . $post_type['archive_page'] . '_jsx.js';

                wp_enqueue_script('wp-element', $this->includes_url . 'js/dist/element.min.js', [], null, true);

                if (file_exists($filePath)) {
                    wp_enqueue_script($this->handle_prefix . 'react_' . $post_type['archive_page'], $filePathURL, ['wp-element'], 1.0, true);
                } else {
                    error_log('Post Type ' . ucfirst($post_type['name']) . ' page has not been created in react JSX.');
                }

                wp_enqueue_script($this->handle_prefix . 'react_index', $this->buildDirURL . 'index.js', ['wp-element'], '1.0', true);
                break;
            }
        } else {
            error_log('There are no post types in the array at ' . $this->dir . ' Post_Types');
        }
    }

    function load_post_types_single_react()
    {
        if (!empty($this->post_types_list) && is_array($this->post_types_list)) {
            foreach ($this->post_types_list as $post_type) {

                if (is_singular($post_type['name'])) {
                    $filePath = $this->buildFilePrefix . $post_type['single_page'] . '_jsx.js';
                    $filePathURL = $this->buildFilePrefixURL . $post_type['single_page'] . '_jsx.js';

                    wp_enqueue_script('wp-element', $this->includes_url . 'js/dist/element.min.js', [], null, true);

                    if (file_exists($filePath)) {
                        wp_enqueue_script($this->handle_prefix . 'react_' . $post_type['single_page'], $filePathURL, ['wp-element'], 1.0, true);
                    } else {
                        error_log('Post Type ' . ucfirst($post_type['name']) . ' page has not been created in react JSX.');
                    }

                    wp_enqueue_script($this->handle_prefix . 'react_index', $this->buildDirURL . 'index.js', ['wp-element'], '1.0', true);
                    break;
                }
            }
        }
    }

    function load_taxonomies_react()
    {
        if (!empty($this->taxonomies_list) && is_array($this->taxonomies_list)) {
            foreach ($this->taxonomies_list as $taxonomy) {

                if (is_tax($taxonomy['taxonomy'])) {
                    $filePath = $this->buildFilePrefix . $taxonomy['file_name'] . '_jsx.js';
                    $filePathURL = $this->buildFilePrefixURL . $taxonomy['file_name'] . '_jsx.js';

                    wp_enqueue_script('wp-element', $this->includes_url . 'js/dist/element.min.js', [], null, true);

                    if (file_exists($filePath)) {
                        wp_enqueue_script($this->handle_prefix . 'react_' . $taxonomy['file_name'], $filePathURL, ['wp-element'], 1.0, true);
                    } else {
                        error_log('Taxonomy ' . ucfirst($taxonomy['name']) . ' page has not been created in react JSX.');
                    }

                    wp_enqueue_script($this->handle_prefix . 'react_index', $this->buildDirURL . 'index.js', ['wp-element'], '1.0', true);
                    break;
                }
            }
        }
    }
}
