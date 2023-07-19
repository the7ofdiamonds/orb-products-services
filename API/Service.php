<?php

namespace ORBServices\API;

use WP_REST_Request;
use WP_Error;
use WP_REST_Response;
use WP_Query;

class Service
{
    private $stripeSecretKey;
    private $stripeClient;

    public function __construct()
    {
        $this->stripeSecretKey = $_ENV['STRIPE_SECRET_KEY'];
        \Stripe\Stripe::setApiKey($this->stripeSecretKey);
        $this->stripeClient = new \Stripe\StripeClient($this->stripeSecretKey);

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

        return new WP_REST_Response( $price, 200);
    }

    function get_service(WP_REST_Request $request)
    {
        $slug = $request->get_param('slug');
        $args = array(
            'post_type' => 'services',
            'pagename' => $slug,
            'posts_per_page' => 1,
        );
        $post = get_post($args);
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
            return new WP_REST_Response($post_data, 200);
        } else {
            return new WP_Error('post_not_found', 'Post not found', array('status' => 404));
        }
    }
}
