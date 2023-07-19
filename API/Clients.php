<?php

namespace ORBServices\API;

use WP_REST_Request;
use WP_REST_Response;
use WP_Error;

require ORB_SERVICES . 'vendor/autoload.php';
require_once ABSPATH . 'wp-load.php';

class Clients
{

    public function __construct()
    {
        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/users/clients', array(
                'methods' => 'POST',
                'callback' => array($this, 'add_client'),
                'permission_callback' => '__return_true',
            ));
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/users/clients/(?P<slug>[a-zA-Z0-9-_]+)', array(
                'methods' => 'GET',
                'callback' => array($this, 'get_client'),
                'permission_callback' => '__return_true',
            ));
        });
    }

    function add_client(WP_REST_Request $request)
    {
        $user_email = $request['user_email'];

        $user = get_user_by('email', $user_email);

        if ($user && in_array('client', $user->roles) && isset($user->caps['client'])) {
            return rest_ensure_response($user->ID);
        }

        if ($user && $user->exists()) {
            $user->add_role('client');

            return rest_ensure_response($user->ID);
        }

        if (!is_wp_error($user)) {
            return rest_ensure_response($user);
        } else {
            $error_message = $user->get_error_message();
            return rest_ensure_response(array('error' => $error_message));
        }
    }

    function get_client(WP_REST_Request $request)
    {
        $id = $request->get_param('slug');

        $user = get_userdata($id);

        $user_data = [
            "first_name" => $user->first_name,
            "last_name" => $user->last_name,
            "email" => $user->user_email
        ];

        if (!is_wp_error($user)) {
            return rest_ensure_response($user_data);
        } else {
            $error_message = $user->get_error_message();
            return rest_ensure_response(array('error' => $error_message));
        }
    }
}
