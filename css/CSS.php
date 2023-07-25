<?php
namespace ORB_Services\CSS;

use ORB_Services\CSS\Customizer\Customizer;

class CSS {
    
    public function __construct() {
        add_action('wp_head', [$this, 'load_css']);

        new Customizer;
    }

    //Load Plugin CSS & JS
    function load_css(){
        wp_enqueue_style('orb-services',  ORB_SERVICES_URL . 'CSS/orb-services.css', array(), false, 'all', 'orb-services' );
    }  
}