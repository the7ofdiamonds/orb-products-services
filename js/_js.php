<?php
namespace ORB\Services\JS;

class ORB_Services_JS
{

    public function __construct()
    {
        add_action('wp_enqueue_scripts', [$this, 'load_js']);
        add_action('wp_enqueue_scripts', [$this, 'load_hero_js']);
        add_action('wp_enqueue_scripts', [$this, 'load_react']);
    }

    function load_js()
    {
        wp_enqueue_script('orb_services_js', ORB_SERVICES_URL . '/js/orb-services.js');
    }

    function load_hero_js() {
        wp_enqueue_script('orb_services_hero_js', ORB_SERVICES_URL . '/js/orb-services-hero.js');
    }

    function load_react()
    {
        wp_enqueue_script('orb_services_react', ORB_SERVICES_URL . '/js/build/index.js', ['wp-element'], 1.0, true);
    }
}
