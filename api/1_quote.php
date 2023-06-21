<?php
namespace API\Quote;

use WP_REST_Request;
use WP_Error;
use WP_REST_Response;
use WP_Query;

class ORB_Services_API_Quote
{
    public function __construct()
    {
        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/services/(?P<slug>[a-z0-9-]+)', [
                'methods' => 'GET',
                'callback' => [$this, 'get_single_services'],
                'permission_callback' => '__return_true',
            ]);
        });
    }

    function get_single_services(WP_REST_Request $request)
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
                'content' => get_the_content(),
                'cost' => get_post_meta(get_the_ID(), '_service_cost', true),
                'features' => get_post_meta(get_the_ID(), '_service_features', true)

            );

            return new WP_REST_Response($post_data, 200);
        } else {
            return new WP_Error('post_not_found', 'Post not found', array('status' => 404));
        }
    }
}