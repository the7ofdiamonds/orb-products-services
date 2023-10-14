<?php

namespace ORB_Services\CSS;

use ORB_Services\CSS\Customizer\Customizer;

class CSS
{

    public function __construct()
    {
        add_action('wp_head', [$this, 'load_css']);

        new Customizer;
    }

    function load_css()
    {
        $pages = [
            'about',
            'billing/quote',
            'billing/invoice',
            'billing/payment',
            'billing/payment/card',
            'billing/payment/mobile',
            'billing/receipt',
            'client/start',
            'client/selections',
            'contact',
            'contact/success',
            'dashboard',
            'faq',
            'schedule',
            'support',
            'support/success'
        ];

        if (
            is_front_page() ||
            is_post_type_archive('services') || is_singular('services') ||
            is_page($pages)
        ) {
            wp_enqueue_style('orb-services',  ORB_SERVICES_URL . 'CSS/orb-services.css', array(), false, 'all', 'orb-services');
        }
    }
}
