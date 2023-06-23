<?php
namespace ORB\Services\Shortcodes;

class ORB_Services_Shortcodes
{

    public function __construct()
    {
        add_shortcode('orb-services-hero', [$this, 'orb_services_hero_shortcode']);
        add_shortcode('orb-services', [$this, 'orb_services_shortcode']);
        add_shortcode('orb-services-office-hours', [$this, 'orb_services_office_hours_shortcode']);
        add_shortcode('orb-services-headquarters', [$this, 'orb_services_headquarters_shortcode']);
        add_shortcode('orb-services-support', [$this, 'orb_services_support_shortcode']);
    }

    function orb_services_hero_shortcode()
    {
        include WP_PLUGIN_DIR . '/orb-services/includes/main-hero.php';
    }

    function orb_services_shortcode()
    {
        include WP_PLUGIN_DIR . '/orb-services/includes/section-services.php';
    }

    function orb_services_office_hours_shortcode()
    {
        include WP_PLUGIN_DIR . '/orb-services/includes/part-office-hours.php';
    }

    function orb_services_headquarters_shortcode()
    {
        include WP_PLUGIN_DIR . '/orb-services/includes/part-headquarters.php';
    }

    function orb_services_support_shortcode()
    {
        include WP_PLUGIN_DIR . '/orb-services/includes/section-support.php';
    }
}
