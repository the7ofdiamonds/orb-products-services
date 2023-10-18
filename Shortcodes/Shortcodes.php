<?php
namespace ORB_Products_Services\Shortcodes;

class Shortcodes
{

    public function __construct()
    {
        add_shortcode('orb-services-hero', [$this, 'orb_services_hero_shortcode']);
        add_shortcode('orb-services', [$this, 'orb_services_shortcode']);
        add_shortcode('orb-services-support', [$this, 'orb_services_support_shortcode']);
    }

    function orb_services_hero_shortcode()
    {
        include ORB_PRODUCTS_SERVICES . 'includes/main-hero.php';
    }

    function orb_services_shortcode()
    {
        include ORB_PRODUCTS_SERVICES . 'includes/section-services.php';
    }

    function orb_services_support_shortcode()
    {
        include ORB_PRODUCTS_SERVICES . 'includes/section-support.php';
    }
}
