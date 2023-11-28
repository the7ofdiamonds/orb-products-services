<?php
namespace ORB\Products_Services\Shortcodes;

class Shortcodes
{

    public function __construct()
    {
        add_shortcode('orb-products-services-frontpage', [$this, 'orb_products_services_frontpage_shortcode']);
        add_shortcode('orb-services-hero', [$this, 'orb_services_hero_shortcode']);
        add_shortcode('orb-services', [$this, 'orb_services_shortcode']);
        add_shortcode('orb-products-hero', [$this, 'orb_products_hero_shortcode']);
        add_shortcode('orb-products', [$this, 'orb_products_shortcode']);
        add_shortcode('orb-dashboard', [$this, 'orb_dashboard_shortcode']);
    }

    function orb_products_services_frontpage_shortcode()
    {
        include ORB_PRODUCTS_SERVICES . 'includes/react.php';
    }

    function orb_services_hero_shortcode()
    {
        include ORB_PRODUCTS_SERVICES . 'includes/services-hero.php';
    }

    function orb_services_shortcode()
    {
        include ORB_PRODUCTS_SERVICES . 'includes/react.php';
    }

    function orb_products_hero_shortcode()
    {
        include ORB_PRODUCTS_SERVICES . 'includes/products-hero.php';
    }

    function orb_products_shortcode()
    {
        include ORB_PRODUCTS_SERVICES . 'includes/react.php';
    }

    function orb_dashboard_shortcode()
    {
        include ORB_PRODUCTS_SERVICES . 'includes/react.php';
    }
}
