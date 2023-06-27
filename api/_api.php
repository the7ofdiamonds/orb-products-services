<?php

namespace ORB\Services\API;

require_once '1_service.php';
require_once '2_customer.php';
require_once '2_invoice.php';
require_once '3_payment.php';
require_once '4_receipt.php';

use API\Quote\ORB_Services_API_Service;
use API\Customer\ORB_Services_API_Customer;
use API\Invoice\ORB_Services_API_Invoice;
use API\Payment\ORB_Services_API_Payment;
use API\Receipt\ORB_Services_API_Receipt;
use WP_REST_Request;
use WP_Error;
use WP_REST_Response;
use WP_Query;

class ORB_Services_API
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

        new ORB_Services_API_Service;
        new ORB_Services_API_Customer;
        new ORB_Services_API_Invoice;
        new ORB_Services_API_Payment;
        new ORB_Services_API_Receipt;
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
                    'title' => get_the_title(),
                    'description' => get_the_excerpt(),
                    'content' => get_the_content(),
                    'features' => get_post_meta(get_the_ID(), '_service_features', true),
                    'icon' => get_post_meta(get_the_ID(), '_services_button_icon', true),
                    'action_word' => get_post_meta(get_the_ID(), '_services_button', true),
                    'slug' => get_post_field( 'post_name', get_the_ID() ),
                    'cost' => get_post_meta(get_the_ID(), '_service_cost', true),
                );
            }

            return new WP_REST_Response($post_data, 200);
        } else {
            return new WP_Error('post_not_found', 'No service posts found', array('status' => 404));
        }
    }
}
