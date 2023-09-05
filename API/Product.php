<?php

namespace ORB_Services\API;

use WP_REST_Request;
use WP_Query;

class Product
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
            register_rest_route('orb/v1', '/product', [
                'methods' => 'GET',
                'callback' => [$this, 'add_product'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/product/available', [
                'methods' => 'GET',
                'callback' => [$this, 'get_product'],
                'permission_callback' => '__return_true',
            ]);
        });
    }

    //Create service at the backend ???
    function add_product(WP_REST_Request $request)
    {
        $id = $request['id'];
        $name = $request['name'];
        $active = $request['active'];
        $default_price_data = $request['default_price_data'];
        $description = $request['description'];
        $features = $request['features'];
        $images = $request['images'];
        $package_dimensions = $request['package_dimensions'];
        $shippable = $request['shippable'];
        $statement_descriptor = $request['statement_descriptor'];
        $tax_code = $request['tax_code'];
        $unit_label = $request['unit_label'];
        $url = $request['url'];
        $price = $request['price'];
        $currency = $request['currency'];

        $product = $this->stripe_products->createProduct(
            $id,
            $name,
            $active,
            $default_price_data,
            $description,
            $features,
            $images,
            $package_dimensions,
            $shippable,
            $statement_descriptor,
            $tax_code,
            $unit_label,
            $url
        );

        $price = $this->stripe_prices->createPrice($currency, $price, $product->id);

        return rest_ensure_response($price);
    }

    function get_product(WP_REST_Request $request)
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
            $post_data = array(
                'id' => get_the_ID(),
                'title' => get_the_title(),
                'description' => get_post_meta(get_the_ID(), '_products_description', true),
                'content' => strip_tags(strip_shortcodes(get_the_content())),
                'features' => get_post_meta(get_the_ID(), '_products_features', true),
                'icon' => get_post_meta(get_the_ID(), '_products_icon', true),
                'action_word' => get_post_meta(get_the_ID(), '_productss_button', true),
                'slug' => get_post_field('post_name', get_the_ID()),
                'cost' => get_post_meta(get_the_ID(), '_products_cost', true),
            );

            return rest_ensure_response($post_data, 200);
        } else {
            return rest_ensure_response('Post not found');
        }
    }
}
