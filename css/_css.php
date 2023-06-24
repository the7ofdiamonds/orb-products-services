<?php
namespace ORB\Services\CSS;

include 'customizer/_customizer.php';

use ORB\Services\CSS\Customizer\ORB_Services_Customizer;

class ORB_Services_CSS {
    
    public function __construct() {
        add_action('wp_head', [$this, 'load_css']);

        new ORB_Services_Customizer;
    }

    //Load Plugin CSS & JS
    function load_css(){
        wp_enqueue_style('orb-services',  ORB_SERVICES_URL . '/css/orb-services.css', array(), false, 'all', 'orb-services' );
    }  
}