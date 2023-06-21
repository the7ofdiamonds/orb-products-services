<?php

class ORB_Services_Pages
{

    public function __construct()
    {
        add_filter('archive_template', [$this, 'get_archive_page_template']);
        add_filter('single_template', [$this, 'get_single_page_template']);
        add_filter('page_template', [$this, 'get_custom_support_page_template']);
    }

    function get_archive_page_template($archive_template)
    {

        if (is_archive('services')) {
            $archive_template = WP_PLUGIN_DIR . '/orb-services/pages/archive-services.php';
        }
        
        return $archive_template;
    }

    function get_single_page_template($single_template)
    {   
        global $post;

        if ($post->post_type === 'services') {
            $single_template = WP_PLUGIN_DIR . '/orb-services/pages/single-services.php';
        }

        return $single_template;
    }

    function get_custom_support_page_template($page_template)
    {

        if (is_page('support')) {
            $page_template = WP_PLUGIN_DIR . '/orb-services/pages/page-support.php';
        }

        return $page_template;
    }


    function add_pages()
    {

        if (!post_exists('support')) {

            $support_page = array(
                'post_title' => 'SUPPORT',
                'post_type' => 'page',
                'post_content' => '',
                'post_status' => 'publish',
            );

            wp_insert_post($support_page, true);
        }

        if (!post_exists('invoice')) {

            $invoice_page = array(
                'post_title' => 'INVOICE',
                'post_type' => 'page',
                'post_content' => '',
                'post_status' => 'publish',
            );

            wp_insert_post($invoice_page, true);
        }
    }
}

$orb_services_pages = new ORB_Services_Pages();
