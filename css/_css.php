<?php
include 'customizer/_customizer.php';

class ORB_Services_CSS {
    
    public function __construct() {
        add_action('wp_head', [$this, 'load_react']);
        add_action('wp_head', [$this, 'load_css']);

        new ORB_Services_Customizer;
    }

    function load_react(){
        
        wp_enqueue_script('orb_services_react',  WP_PLUGIN_URL . '/orb-services/build/index.js',['wp-element'], 1.0, true );
    }  

    //Load Plugin CSS & JS
    function load_css(){
        
        wp_enqueue_style('orb_services_css',  WP_PLUGIN_URL . '/orb-services/css/orb-services.css', array(), false, 'all' );
    }  
}