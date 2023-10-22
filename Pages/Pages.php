<?php

namespace ORB_Products_Services\Pages;

class Pages
{
    public $page_titles;
    public $react_pages;

    public function __construct()
    {
        $this->page_titles = [
            'BILLING',
            'CLIENT',
            'FAQ',
            'SUPPORT',
            'CONTACT',
        ];

        $this->react_pages = [
            'billing',
            'client',
            'FAQ',
            'support',
            'contact',
        ];
    }

    public function add_pages()
    {
        global $wpdb;

        foreach ($this->page_titles as $page_title) {
            $page_exists = $wpdb->get_var($wpdb->prepare("SELECT ID FROM $wpdb->posts WHERE post_title = %s AND post_type = 'page'", $page_title));

            if (!$page_exists) {
                $page_data = array(
                    'post_title'   => $page_title,
                    'post_type'    => 'page',
                    'post_content' => '',
                    'post_status'  => 'publish',
                );

                wp_insert_post($page_data);
            }
        }
    }
}
