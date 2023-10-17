<?php

namespace ORB_Products_Services\API;

use WP_Query;

class Products
{
    private $post_type;
    private $stripe_products;
    private $stripe_prices;

    public function __construct($stripe_products, $stripe_prices)
    {
        $this->post_type = 'products';
        $this->stripe_products = $stripe_products;
        $this->stripe_prices = $stripe_prices;

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/products', [
                'methods' => 'GET',
                'callback' => [$this, 'get_products'],
                'permission_callback' => '__return_true',
            ]);
        });
    }

    function get_products()
    {
        $args = array(
            'post_type' => $this->post_type,
            'posts_per_page' => -1,
        );
        $products = new WP_Query($args);

        if ($products->have_posts()) {
            $post_data = array();

            while ($products->have_posts()) {
                $products->the_post();
                $post_data[] = array(
                    'id' => get_the_ID(),
                    'description' => get_post_meta(get_the_ID(), '_service_description', true),
                    'cost' => get_post_meta(get_the_ID(), '_service_cost', true),
                    'title' => get_the_title(),
                    'content' => get_the_content(),
                    'features' => get_post_meta(get_the_ID(), '_service_features', true),
                    'icon' => get_post_meta(get_the_ID(), '_service_icon', true),
                    'action_word' => get_post_meta(get_the_ID(), '_products_button', true),
                    'slug' => get_post_field('post_name', get_the_ID()),
                    'price_id' => get_post_meta(get_the_ID(), '_service_price_id', true),
                );
            }

            return rest_ensure_response($post_data);
        } else {
            return rest_ensure_response('No service posts found');
        }
    }
}
