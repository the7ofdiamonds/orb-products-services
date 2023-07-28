<?php

namespace ORB_Services\API;

use WP_REST_Request;
use WP_Query;

class Service
{
    private $stripeClient;

    public function __construct($stripeClient)
    {
        $this->stripeClient = $stripeClient;

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/service/(?P<slug>[a-z0-9-]+)', [
                'methods' => 'POST',
                'callback' => [$this, 'add_service'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/service/(?P<slug>[a-z0-9-]+)', [
                'methods' => 'GET',
                'callback' => [$this, 'get_service'],
                'permission_callback' => '__return_true',
            ]);
        });
    }

    function add_service(WP_REST_Request $request)
    {
        $name = $request['name'];
        $description = $request['description'];
        $cost = $request['cost'];
        $id = $request['id'];

        $product = $this->stripeClient->products->create([
            'name' => $name,
            'description' => $description,
            'metadata' => [
                'service_id' => $id
            ]
        ]);

        $price = $this->stripeClient->prices->create([
            'unit_amount' => str_replace('.', '', $cost),
            'currency' => 'usd',
            'product' => $product->id,
        ]);

        return rest_ensure_response($price);
    }

    function get_service(WP_REST_Request $request)
    {
        $slug = $request->get_param('slug');
        $args = array(
            'post_type' => 'services',
            'pagename' => $slug,
            'posts_per_page' => 1,
        );
        $query = new WP_Query($args);

        if ($query->have_posts()) {
            $query->the_post();
            $post_data = array(
                'id' => get_the_ID(),
                'title' => get_the_title(),
                'description' => get_post_meta(get_the_ID(), '_service_description', true),
                'content' => strip_tags(strip_shortcodes(get_the_content())),
                'features' => get_post_meta(get_the_ID(), '_service_features', true),
                'icon' => get_post_meta(get_the_ID(), '_service_icon', true),
                'action_word' => get_post_meta(get_the_ID(), '_services_button', true),
                'slug' => get_post_field('post_name', get_the_ID()),
                'cost' => get_post_meta(get_the_ID(), '_service_cost', true),
            );
            return rest_ensure_response($post_data, 200);
        } else {
            return rest_ensure_response('Post not found');
        }
    }
}
