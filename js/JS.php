<?php

namespace ORB_Services\JS;

class JS
{

    public function __construct()
    {
        // add_action('wp_footer', [$this, 'load_js']);
        add_action('wp_footer', [$this, 'load_hero_js']);
        add_action('wp_footer', [$this, 'load_react']);
    }

    function get_js_files($directory)
    {
        $jsFiles = array();
        $files = scandir($directory);

        foreach ($files as $file) {
            if (pathinfo($file, PATHINFO_EXTENSION) === 'js') {
                $jsFiles[] = $file;
            }
        }
        return $jsFiles;
    }

    function load_js()
    {
        wp_enqueue_script('orb_services_js', ORB_SERVICES_URL . 'JS/orb-services.js');
    }

    function load_hero_js()
    {
        if (is_front_page()) {
            wp_enqueue_script('orb_services_hero_js', ORB_SERVICES_URL . 'JS/orb-services-hero.js');
        }
    }

    function load_react()
    {
        $directory = ORB_SERVICES . 'build';
        $pages = [
            'about',
            'contact',
            'contact/success',
            'support',
            'support/success',
            'dashboard',
            'schedule',
            'client/start',
            'client/selections',
            'billing/quote',
            'billing/invoice',
            'billing/payment',
            'billing/receipt',
        ];

        if (is_front_page() || is_post_type_archive('services') || is_singular('services') || is_page($pages)) {
            $jsFiles = $this->get_js_files($directory);

            if ($jsFiles) {
                foreach ($jsFiles as $jsFile) {
                    $handle = 'orb_services_react_' . basename($jsFile);
                    wp_enqueue_script($handle, ORB_SERVICES_URL . 'build/' . $jsFile, ['wp-element'], 1.0, true);
                }
            }
        }
    }
}
