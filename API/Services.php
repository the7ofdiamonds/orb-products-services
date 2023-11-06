<?php

namespace ORB_Products_Services\API;

use WP_Query;

class Services
{
    private $post_type;
    private $stripe_products;
    private $stripe_prices;

    public function __construct($stripe_products, $stripe_prices)
    {
        $this->post_type = 'services';
        $this->stripe_products = $stripe_products;
        $this->stripe_prices = $stripe_prices;

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/services', [
                'methods' => 'GET',
                'callback' => [$this, 'get_services'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/services/available', [
                'methods' => 'GET',
                'callback' => [$this, 'get_services_available'],
                'permission_callback' => '__return_true',
            ]);
        });
    }

    function get_services()
    {
        $args = array(
            'post_type' => $this->post_type,
            'posts_per_page' => 10,
        );

        $query = new WP_Query($args);
        $services = $query->posts;

        if ($services) {
            $post_data = array();

            foreach ($services as $service) {
                $description = get_post_meta($service->ID, '_service_description', true);
                $cost = get_post_meta($service->ID, '_service_cost', true);

                if (!empty($description) && is_numeric($cost)) {
                    $post_data[] = array(
                        'id' => $service->ID,
                        'description' => $description,
                        'cost' => floatval($cost),
                        'title' => get_the_title($service->ID),
                        'content' => get_the_content(),
                        'features' => get_post_meta($service->ID, '_service_features', true),
                        'icon' => get_post_meta($service->ID, '_service_icon', true),
                        'action_word' => get_post_meta($service->ID, '_services_button', true),
                        'slug' => get_post_field('post_name', $service->ID),
                        'price_id' => get_post_meta($service->ID, '_service_price_id', true),
                    );
                }
            }

            return rest_ensure_response($post_data);
        } else {
            return rest_ensure_response('No services were found');
        }
    }

    function get_services_available()
    {
        $args = array(
            'post_type' => $this->post_type,
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
                    'title' => get_the_title(),
                );
            }

            return rest_ensure_response($post_data);
        } else {
            return rest_ensure_response('No service posts found');
        }
    }
}
