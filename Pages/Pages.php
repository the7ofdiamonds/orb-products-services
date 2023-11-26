<?php

namespace ORB\Products_Services\Pages;

class Pages
{
    public $front_page_react;
    public $custom_pages_list;
    public $protected_pages_list;
    public $pages_list;
    public $pages;
    public $page_titles;

    public function __construct()
    {
        $this->front_page_react = [
            'Frontpage'
        ];

        $this->custom_pages_list = [
            [
                'url' => 'contact',
                'regex' => '#^/contact#',
                'file_name' => 'Contact',
                'title' => 'CONTACT',
                'name' => 'contact'
            ],
            [
                'url' => 'contact/success',
                'regex' => '#^/contact/success#',
                'file_name' => 'ContactSuccess',
                'title' => 'CONTACT SUCCESS',
                'name' => 'contact-success'
            ],
            [
                'url' => 'support',
                'regex' => '#^/support#',
                'file_name' => 'Support',
                'title' => 'SUPPORT',
                'name' => 'support'
            ],
            [
                'url' => 'support/success',
                'regex' => '#^/support/success#',
                'file_name' => 'SupportSuccess',
                'title' => 'SUPPORT SUCCESS',
                'name' => 'support-success'
            ],
        ];

        $this->protected_pages_list = [];

        $this->pages_list = [];

        $this->pages = [
            ['title' => 'FAQ']
        ];

        $this->page_titles = [
            ...$this->custom_pages_list,
            ...$this->protected_pages_list,
            ...$this->pages_list,
        ];
    }

    function add_pages()
    {
        global $wpdb;

        foreach ($this->pages as $page) {
            if (!empty($page['title'])) {
                $page_exists = $wpdb->get_var($wpdb->prepare("SELECT ID FROM $wpdb->posts WHERE post_title = %s AND post_type = 'page'", $page['title']));

                if (!$page_exists) {
                    $page_data = array(
                        'post_title'   => $page['title'],
                        'post_type'    => 'page',
                        'post_content' => '',
                        'post_status'  => 'publish',
                    );

                    wp_insert_post($page_data);

                    error_log($page['title'] . ' page added.');
                }
            }
        }
    }

    function add_query_vars($query_vars)
    {
        if (is_array($this->page_titles) && count($this->page_titles) > 0) {

            foreach ($this->page_titles as $page_title) {
                $url = explode('/', $page_title['url']);
                $segment = count($url) - 1;

                if (!in_array($url[$segment], $query_vars)) {
                    $query_vars[] = $url[$segment];
                } else {
                    continue;
                }
            }

            return array_unique($query_vars);
        }

        return $query_vars;
    }

    function is_user_logged_in()
    {
        return isset($_SESSION['idToken']);
    }
}
