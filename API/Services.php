<?php

namespace ORB_Services\API;

use WP_REST_Request;
use WP_Error;
use WP_REST_Response;
use WP_Query;

class Services
{
    public function __construct()
    {
        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/services', [
                'methods' => 'GET',
                'callback' => [$this, 'get_services'],
                'permission_callback' => '__return_true',
            ]);
        });
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
                    'description' => get_post_meta(get_the_ID(), '_service_description', true),
                    'cost' => get_post_meta(get_the_ID(), '_service_cost', true),
                    'title' => get_the_title(),
                    'content' => get_the_content(),
                    'features' => get_post_meta(get_the_ID(), '_service_features', true),
                    'icon' => get_post_meta(get_the_ID(), '_service_icon', true),
                    'action_word' => get_post_meta(get_the_ID(), '_services_button', true),
                    'slug' => get_post_field('post_name', get_the_ID()),
                    'price_id' => get_post_meta(get_the_ID(), '_service_price_id', true),
                );
            }

            return new WP_REST_Response($post_data, 200);
        } else {
            return new WP_Error('post_not_found', 'No service posts found', array('status' => 404));
        }
    }
}
