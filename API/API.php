<?php

namespace ORBServices\API;

use ORBServices\API\Service;
use ORBServices\API\Client;
use ORBServices\API\Invoice;
use ORBServices\API\Payment;
use ORBServices\API\Receipt;

use WP_REST_Request;
use WP_Error;
use WP_REST_Response;
use WP_Query;

class API
{
    public function __construct()
    {
        add_action('rest_api_init', [$this, 'add_to_rest_api']);
        add_action('rest_api_init', [$this, 'allow_cors_headers']);
        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/services', [
                'methods' => 'GET',
                'callback' => [$this, 'get_services'],
                'permission_callback' => '__return_true',
            ]);
        });

        new Service;
        new Client;
        new Invoice;
        new Payment;
        new Receipt;
    }

    public function add_to_rest_api()
    {
        register_meta(
            'post',
            '_service_cost',
            [
                'type' => 'number',
                'description' => 'Service Cost',
                'single' => true,
                'show_in_rest' => true
            ]
        );

        register_meta(
            'post',
            '_service_features',
            [
                'type' => 'string',
                'description' => 'Service Features',
                'single' => true,
                'show_in_rest' => true
            ]
        );
    }

    public function allow_cors_headers()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
    }

    function get_services(WP_REST_Request $request)
    {
        $args = array(
            'post_type' => 'services',
            'posts_per_page' => -1,
        );
        $services = new WP_Query($args);

        if ($services->have_posts()) {
            $post_data = array();

            while ($services->have_posts()) {
                $services->the_post();
                $post_data[] = array(
                    'id' => get_the_ID(),
                    'description' => get_the_excerpt(),
                    'cost' => get_post_meta(get_the_ID(), '_service_cost', true),
                    'title' => get_the_title(),
                    'content' => get_the_content(),
                    'features' => get_post_meta(get_the_ID(), '_service_features', true),
                    'icon' => get_post_meta(get_the_ID(), '_services_button_icon', true),
                    'action_word' => get_post_meta(get_the_ID(), '_services_button', true),
                    'slug' => get_post_field( 'post_name', get_the_ID() ),
                );
            }

            return new WP_REST_Response($post_data, 200);
        } else {
            return new WP_Error('post_not_found', 'No service posts found', array('status' => 404));
        }
    }
}
