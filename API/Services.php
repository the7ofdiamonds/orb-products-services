<?php

namespace ORB\Products_Services\API;

use WP_Query;

use ORB\Products_Services\Database\DatabaseServices;

class Services
{
    private $post_type;
    private $services_database;
    private $stripe_products;
    private $stripe_prices;

    public function __construct($stripe_products, $stripe_prices)
    {
        $this->post_type = 'services';
        $this->services_database = new DatabaseServices;
        $this->stripe_products = $stripe_products;
        $this->stripe_prices = $stripe_prices;
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
                $id = $service->ID;
                $service = $this->services_database->getService($id);

                if (!empty($service['description']) && is_numeric($service['price'])) {
                    $post_data[] = array(
                        'id' => $id,
                        'title' => get_the_title($id),
                        'price' => isset($service['price']) ? $service['price'] : '',
                        'description' => isset($service['description']) ? $service['description'] : '',
                        'content' => strip_tags(strip_shortcodes(get_the_content())),
                        'features' => isset($service['features_list']) ? unserialize($service['features_list']) : '',
                        'onboarding_link' => isset($service['onboarding_link']) ? $service['onboarding_link'] : '',
                        'icon' => isset($service['service_icon']) ? $service['service_icon'] : '',
                        'action_word' => isset($service['service_button']) ? $service['service_button'] : '',
                        'slug' => get_post_field('post_name', $id),
                        'price_id' =>  isset($service['stripe_price_id']) ? $service['stripe_price_id'] : ''
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
