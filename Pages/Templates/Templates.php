<?php

namespace ORBServices\Pages\Templates;

class Templates
{

    public function __construct()
    {
        add_filter('page_template', [$this, 'get_archive_page_template']);
        add_filter('single_template', [$this, 'get_single_page_template']);
        add_filter('page_template', [$this, 'get_custom_faq_page_template']);
        add_filter('page_template', [$this, 'get_custom_support_page_template']);
        add_filter('page_template', [$this, 'get_custom_contact_page_template']);
    }

    function get_archive_page_template($single_template)
    {
        $request_path = $_SERVER['REQUEST_URI'];
        $path_segments = explode('/', $request_path);

        if ($path_segments[1] === 'services') {
            $single_template = ORB_SERVICES . '/pages/templates/archive-services.php';
        }

        return $single_template;
    }

    function get_single_page_template($single_template)
    {
        global $post;

        if ($post->post_type === 'services') {
            $single_template = ORB_SERVICES . '/pages/templates/single-services.php';
        }

        return $single_template;
    }

    function get_custom_faq_page_template($page_template)
    {

        if (is_page('faq')) {
            $page_template = ORB_SERVICES . '/pages/templates/page-faq.php';
        }

        return $page_template;
    }

    function get_custom_support_page_template($page_template)
    {

        if (is_page('support')) {
            $page_template = ORB_SERVICES . '/pages/templates/page-support.php';
        }

        return $page_template;
    }


    function get_custom_contact_page_template($page_template)
    {

        if (is_page('contact')) {
            $page_template = ORB_SERVICES . '/pages/templates/page-contact.php';
        }

        return $page_template;
    }
}

$orb_services_pages = new Templates();
