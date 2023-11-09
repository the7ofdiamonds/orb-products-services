<?php

namespace ORB\Products_Services\API;

use ORB\Products_Services\Database\DatabaseServices;
use WP_REST_Request;
use WP_Query;

class Service
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

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/service/(?P<slug>[a-z0-9-]+)', [
                'methods' => 'GET',
                'callback' => [$this, 'get_service'],
                'permission_callback' => '__return_true',
            ]);
        });
    }

    function get_service(WP_REST_Request $request)
    {
        $slug = $request->get_param('slug');
        $args = array(
            'post_type' => $this->post_type,
            'pagename' => $slug,
            'posts_per_page' => 1,
        );
        $query = new WP_Query($args);

        if ($query->have_posts()) {
            $query->the_post();

            $service = $this->services_database->getService(get_the_ID());

            $post_data = array(
                'id' => get_the_ID(),
                'title' => get_the_title(),
                'price' => isset($service['price']) ? $service['price'] : '',
                'description' => isset($service['description']) ? $service['description'] : '',
                'content' => strip_tags(strip_shortcodes(get_the_content())),
                'features' => isset($service['features_list']) ? unserialize($service['features_list']) : '',
                'onboarding_link' => isset($service['onboarding_link']) ? $service['onboarding_link'] : '',
                'icon' => isset($service['service_icon']) ? $service['service_icon'] : '',
                'action_word' => isset($service['service_button']) ? $service['service_button'] : '',
                'slug' => get_post_field('post_name', get_the_ID()),
            );

            return rest_ensure_response($post_data, 200);
        } else {
            return rest_ensure_response('Service not found');
        }
    }
}
