<?php

namespace ORB\Products_Services\CSS;

use Exception;

use ORB\Products_Services\Pages\Pages;
use ORB\Products_Services\Post_Types\Post_Types;

// use ORB\Products_Services\CSS\Customizer\Customizer;

class CSS
{
    private $handle_prefix;
    private $dir;
    private $dirURL;
    private $cssFolderPath;
    private $cssFolderPathURL;
    private $cssFileName;
    private $filePath;
    // private $page_titles;
    // private $post_types;

    public function __construct()
    {
        $this->handle_prefix = 'orb_products_services_';
        $this->dir = ORB_PRODUCTS_SERVICES;
        $this->dirURL = ORB_PRODUCTS_SERVICES_URL;
        $this->cssFileName = 'orb-products-services.css';

        $this->cssFolderPath = $this->dir . 'CSS/';
        $this->cssFolderPathURL = $this->dirURL . 'CSS/';

        $this->filePath = $this->cssFolderPath . $this->cssFileName;

        // $pages = new Pages;
        // $posttypes = new Post_Types;

        // $this->page_titles = [
        //     ...$pages->custom_pages_list,
        //     ...$pages->protected_pages_list,
        //     ...$pages->pages_list,
        // ];
        // $this->post_types = $posttypes->post_types;
    }

    function load_front_page_css($section)
    {
        try {
            if (!empty($section) && is_array($section)) {
                if ($this->filePath) {
                    wp_register_style($this->handle_prefix . 'css',  $this->cssFolderPathURL . $this->cssFileName, array(), false, 'all');
                    wp_enqueue_style($this->handle_prefix . 'css');
                } else {
                    throw new Exception('CSS file is missing at :' . $this->filePath, 404);
                }
            }
        } catch (Exception $e) {
            $errorMessage = $e->getMessage();
            $errorCode = $e->getCode();
            $response = $errorMessage . ' ' . $errorCode;

            error_log($response . ' at load_front_page_css');

            return $response;
        }
    }

    function load_pages_css($page)
    {
        try {
            if (!empty($page)) {
                if ($this->filePath) {
                    wp_register_style($this->handle_prefix . 'css',  $this->cssFolderPathURL . $this->cssFileName, array(), false, 'all');
                    wp_enqueue_style($this->handle_prefix . 'css');
                } else {
                    throw new Exception('CSS file is missing at :' . $this->filePath, 404);
                }
            }
        } catch (Exception $e) {
            $errorMessage = $e->getMessage();
            $errorCode = $e->getCode();
            $response = $errorMessage . ' ' . $errorCode;

            error_log($response . ' at load_pages_css');

            return $response;
        }
    }

    function load_post_types_css($post_type)
    {
        try {
            if (!empty($post_type) && (is_array($post_type) || is_object($post_type)) && (is_post_type_archive($post_type) || is_singular($post_type))) {
                if ($this->filePath) {
                    wp_register_style($this->handle_prefix . 'css',  $this->cssFolderPathURL . $this->cssFileName, array(), false, 'all');
                    wp_enqueue_style($this->handle_prefix . 'css');
                } else {
                    throw new Exception('CSS file is missing at :' . $this->filePath, 404);
                }
            }
        } catch (Exception $e) {
            $errorMessage = $e->getMessage();
            $errorCode = $e->getCode();
            $response = $errorMessage . ' ' . $errorCode;

            error_log($response . ' at load_post_types_css');

            return $response;
        }
    }

    function load_taxonomies_css($taxonomy)
    {
        try {
            if (!empty($taxonomy['name']) && is_tax($taxonomy['name'])) {
                if ($this->filePath) {
                    wp_register_style($this->handle_prefix . 'css',  $this->cssFolderPathURL . $this->cssFileName, array(), false, 'all');
                    wp_enqueue_style($this->handle_prefix . 'css');
                } else {
                    throw new Exception('CSS file is missing at :' . $this->filePath, 404);
                }
            }
        } catch (Exception $e) {
            $errorMessage = $e->getMessage();
            $errorCode = $e->getCode();
            $response = $errorMessage . ' ' . $errorCode;

            error_log($response . ' at load_taxonomies_css');

            return $response;
        }
    }
}
