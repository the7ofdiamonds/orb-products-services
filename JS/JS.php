<?php

namespace ORB\Products_Services\JS;

use Exception;

class JS
{
    private $handle_prefix;
    private $dir;
    private $dirURL;
    private $buildDir;
    private $buildDirURL;
    private $buildFilePrefix;
    private $buildFilePrefixURL;
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

        $this->includes_url = includes_url();
    }

    function load_front_page_react($section)
    {
        try {
            if (!empty($section) && is_array($section)) {
                $filePath = $this->buildFilePrefix . $section['filename'] . '_jsx.js';
                $filePathURL = $this->buildFilePrefixURL . $section . '_jsx.js';

                wp_enqueue_script('wp-element', $this->includes_url . 'js/dist/element.min.js', [], null, true);

                if (file_exists($filePath)) {
                    wp_enqueue_script($this->handle_prefix . 'react_' . $section, $filePathURL, ['wp-element'], 1.0, true);
                } else {
                    throw new Exception($section . ' page has not been created in react JSX.', 404);
                }

                wp_enqueue_script($this->handle_prefix . 'react_index', $this->buildDirURL . 'index.js', ['wp-element'], '1.0', true);
            } 
        } catch (Exception $e) {
            $errorMessage = $e->getMessage();
            $errorCode = $e->getCode();
            $response = $errorMessage . ' ' . $errorCode;

            error_log($response . ' at load_front_page_react');

            return $response;
        }
    }

    function load_pages_react($page)
    {
        try {
            if (!empty($page) && is_array($page)) {
                $filePath = $this->buildFilePrefix . $page['file_name'] . '_jsx.js';
                $filePathURL = $this->buildFilePrefixURL . $page['file_name'] . '_jsx.js';

                wp_enqueue_script('wp-element', $this->includes_url . 'js/dist/element.min.js', [], null, true);

                if (file_exists($filePath)) {
                    wp_enqueue_script($this->handle_prefix . 'react_' . $page['file_name'], $filePathURL, ['wp-element'], 1.0, true);
                } else {
                    throw new Exception($page['file_name'] . ' page has not been created in react JSX.');
                }

                wp_enqueue_script($this->handle_prefix . 'react_index', $this->buildDirURL . 'index.js', ['wp-element'], '1.0', true);
            } 
        } catch (Exception $e) {
            $errorMessage = $e->getMessage();
            $errorCode = $e->getCode();
            $response = $errorMessage . ' ' . $errorCode;

            error_log($response . ' at load_pages_react');

            return $response;
        }
    }

    function load_taxonomies_react($taxonomy)
    {
        try {
            if (!empty($taxonomy) && is_array($taxonomy) && is_tax($taxonomy['taxonomy'])) {
                $filePath = $this->buildFilePrefix . $taxonomy['file_name'] . '_jsx.js';
                $filePathURL = $this->buildFilePrefixURL . $taxonomy['file_name'] . '_jsx.js';

                wp_enqueue_script('wp-element', $this->includes_url . 'js/dist/element.min.js', [], null, true);

                if (file_exists($filePath)) {
                    wp_enqueue_script($this->handle_prefix . 'react_' . $taxonomy['file_name'], $filePathURL, ['wp-element'], 1.0, true);
                } else {
                    throw new Exception('Taxonomy ' . ucfirst($taxonomy['name']) . ' page has not been created in react JSX.');
                }

                wp_enqueue_script($this->handle_prefix . 'react_index', $this->buildDirURL . 'index.js', ['wp-element'], '1.0', true);
            }
        } catch (Exception $e) {
            $errorMessage = $e->getMessage();
            $errorCode = $e->getCode();
            $response = $errorMessage . ' ' . $errorCode;

            error_log($response . ' at load_taxonomies_react');

            return $response;
        }
    }

    function load_post_types_archive_react($post_type)
    {
        try {
            if (!empty($post_type) && is_array($post_type) && is_post_type_archive($post_type['name'])) {
                $filePath = $this->buildFilePrefix . $post_type['archive_page'] . '_jsx.js';
                $filePathURL = $this->buildFilePrefixURL . $post_type['archive_page'] . '_jsx.js';

                wp_enqueue_script('wp-element', $this->includes_url . 'js/dist/element.min.js', [], null, true);

                if (file_exists($filePath)) {
                    wp_enqueue_script($this->handle_prefix . 'react_' . $post_type['archive_page'], $filePathURL, ['wp-element'], 1.0, true);
                } else {
                    throw new Exception('Post Type ' . ucfirst($post_type['name']) . ' page has not been created in react JSX.', 404);
                }

                wp_enqueue_script($this->handle_prefix . 'react_index', $this->buildDirURL . 'index.js', ['wp-element'], '1.0', true);
            }
        } catch (Exception $e) {
            $errorMessage = $e->getMessage();
            $errorCode = $e->getCode();
            $response = $errorMessage . ' ' . $errorCode;

            error_log($response . ' at load_post_types_archive_react');

            return $response;
        }
    }

    function load_post_types_single_react($post_type)
    {
        try {
            if (!empty($post_type) && is_array($post_type) && is_singular($post_type['name'])) {
                $filePath = $this->buildFilePrefix . $post_type['single_page'] . '_jsx.js';
                $filePathURL = $this->buildFilePrefixURL . $post_type['single_page'] . '_jsx.js';

                wp_enqueue_script('wp-element', $this->includes_url . 'js/dist/element.min.js', [], null, true);

                if (file_exists($filePath)) {
                    wp_enqueue_script($this->handle_prefix . 'react_' . $post_type['single_page'], $filePathURL, ['wp-element'], 1.0, true);
                } else {
                    throw new Exception('Post Type ' . ucfirst($post_type['name']) . ' page has not been created in react JSX.');
                }

                wp_enqueue_script($this->handle_prefix . 'react_index', $this->buildDirURL . 'index.js', ['wp-element'], '1.0', true);
            }
        } catch (Exception $e) {
            $errorMessage = $e->getMessage();
            $errorCode = $e->getCode();
            $response = $errorMessage . ' ' . $errorCode;

            error_log($response . ' at load_post_types_single_react');

            return $response;
        }
    }
}
