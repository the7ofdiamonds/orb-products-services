<?php

namespace ORB\Products_Services\Router;

use Exception;

use ORB\Products_Services\Templates\Templates;

class Router
{
    private $templates;

    public function __construct(
        Templates $templates
    ) {
        $this->templates = $templates;
    }

    function load_page()
    {
        try {
            add_filter('frontpage_template', [$this->templates, 'get_front_page_template']);

            add_filter('archive_template', [$this->templates, 'get_archive_page_template']);

            add_filter('single_template', [$this->templates, 'get_single_page_template']);

            add_filter('template_include', [$this->templates, 'get_custom_page_template']);

            add_filter('template_include', [$this->templates, 'get_protected_page_template']);

            add_filter('template_include', [$this->templates, 'get_page_template']);
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
