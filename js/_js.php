<?php

class ORB_Services_JS
{

    public function __construct()
    {
        add_action('wp_foot', [$this, 'load_js']);
        add_action('wp_enqueue_scripts', [$this, 'load_react']);
    }

    function load_js()
    {
        wp_enqueue_script('orb_services_js', WP_PLUGIN_URL . '/orb-services/js/orb-services.js');
    }

    function load_react()
    {
        wp_register_script('orb_services_react', WP_PLUGIN_URL . '/orb-services/js/build/index.js', ['wp-element'], 1.0, true);

        if (is_singular('services')) {
            wp_enqueue_script('orb_services');
        }
    }
}
