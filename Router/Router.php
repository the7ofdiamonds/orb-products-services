<?php

namespace ORB\Products_Services\Router;

use Exception;

use ORB\Products_Services\Pages\Pages;
use ORB\Products_Services\Templates\Templates;

class Router
{
    private $custom_pages_list;
    private $protected_pages_list;
    private $pages_list;
    private $templates;

    public function __construct()
    {
        $pages = new Pages;
        $this->templates = new Templates;

        $this->custom_pages_list = $pages->custom_pages_list;
        $this->protected_pages_list = $pages->protected_pages_list;
        $this->pages_list = $pages->pages_list;
    }

    function load_page()
    {
        try {
            $path = $_SERVER['REQUEST_URI'];

            if ($path === '/') {
                add_filter('frontpage_template', [$this->templates, 'get_front_page_template']);
                return;
            }

            if (!empty($this->custom_pages_list)) {
                foreach ($this->custom_pages_list as $custom_page) {

                    if (preg_match($custom_page['regex'], $path)) {
                        $template = apply_filters('template_include', $custom_page['name']);

                        return $template;
                    }
                }
            }

            if (!empty($this->protected_pages_list)) {
                foreach ($this->protected_pages_list as $protected_page) {

                    if (preg_match($protected_page['regex'], $path)) {
                        add_filter('template_include', [$this->templates, 'get_protected_page_template']);
                        break;
                    }
                }
            }

            if (!empty($this->pages_list) && $path !== '/') {
                foreach ($this->pages_list as $page) {

                    if (preg_match($page['regex'], $path)) {
                        add_filter('template_include', [$this->templates, 'get_page_template']);
                        break;
                    }
                }
            }
        } catch (Exception $e) {
            $errorMessage = $e->getMessage();
            $errorCode = $e->getCode();
            $response = $errorMessage . ' ' . $errorCode;

            error_log($response . ' at load_page');

            return $response;
        }
    }


    function react_rewrite_rules()
    {
        add_rewrite_rule('^contact/?', 'index.php?', 'top');
        add_rewrite_rule('^contact/success/?', 'index.php?', 'top');
        add_rewrite_rule('^support/?', 'index.php?', 'top');
        add_rewrite_rule('^support/success/?', 'index.php?', 'top');
    }
}
