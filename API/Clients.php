<?php

namespace ORB_Services\API;

use WP_REST_Request;

use Stripe\Exception\ApiErrorException;

class Clients
{
    private $stripeClient;

    public function __construct($stripeClient)
    {
        $this->stripeClient = $stripeClient;

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/users/clients', array(
                'methods' => 'POST',
                'callback' => array($this, 'add_client'),
                'permission_callback' => '__return_true',
            ));
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/users/clients/(?P<slug>[a-zA-Z0-9-_%.]+)', array(
                'methods' => 'GET',
                'callback' => array($this, 'get_client'),
                'permission_callback' => '__return_true',
            ));
        });
    }

    function add_client(WP_REST_Request $request)
    {
        try {
            $company_name = $request['company_name'];
            $tax_id = $request['tax_id'];
            $first_name = $request['first_name'];
            $last_name = $request['last_name'];
            $user_email = $request['user_email'];
            $phone = $request['phone'];
            $address_line_1 = $request['address_line_1'];
            $address_line_2 = $request['address_line_2'];
            $city = $request['city'];
            $state = $request['state'];
            $zipcode = $request['zipcode'];
            $country = $request['country'];

            $user = get_user_by('email', $user_email);
            $user_id = $user->ID;

            if (is_wp_error($user)) {
                $error_message = $user->get_error_message();
                return rest_ensure_response(array('error' => $error_message));
            }

            if (!isset($first_name)) {
                return rest_ensure_response('There was an error updating the users first name.');
            }

            if (!isset($last_name)) {
                return rest_ensure_response('There was an error updating the users last name.');
            }

            update_user_meta($user_id, 'first_name', sanitize_text_field($first_name));
            update_user_meta($user_id, 'last_name', sanitize_text_field($last_name));

            if (!$company_name) {
                $company_name = $first_name . ' ' . $last_name;
            }

            $customer = $this->stripeClient->customers->create([
                'name' => $company_name,
                'email' => $user_email,
                'phone' => $phone,
                'address' => [
                    'line1' => $address_line_1,
                    'line2' => $address_line_2,
                    'city' => $city,
                    'state' => $state,
                    'postal_code' => $zipcode,
                    'country' => $country
                ],
                'tax_id_data' => [
                    [
                        'type' => 'us_ein',
                        'value' => $tax_id
                    ]
                ],
                'metadata' => [
                    'user_id' => $user_id,
                    'client_name' => $first_name . ' ' . $last_name
                ]
            ]);

            $stripe_customer_id = $customer->id;

            global $wpdb;

            $table_name = 'orb_client';
            $result = $wpdb->insert(
                $table_name,
                [
                    'user_id' => $user_id,
                    'stripe_customer_id' => $stripe_customer_id,
                    "first_name" => $first_name,
                    "last_name" => $last_name,
                ]
            );

            if (!$result) {
                $error_message = $wpdb->last_error;
                return rest_ensure_response($error_message);
            }

            $client_id = $wpdb->insert_id;

            $data = [
                'client_id' => $client_id,
                'stripe_customer_id' => $stripe_customer_id
            ];

            return rest_ensure_response($data);
        } catch (ApiErrorException $e) {
            return rest_ensure_response($e);
        }
    }

    function get_client(WP_REST_Request $request)
    {
        $user_email_encoded = $request->get_param('slug');
        $user_email = urldecode($user_email_encoded);
        $user = get_user_by('email', $user_email);

        $user_id = $user->id;

        global $wpdb;

        $client = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM orb_client WHERE user_id = %d",
                $user_id
            )
        );

        if ($client === null) {
            return rest_ensure_response('Client not found');
        }

        $client_data = [
            "id" => $client->id,
            "user_id" => $client->user_id,
            "stripe_customer_id" => $client->stripe_customer_id,
            "first_name" => $client->first_name,
            "last_name" => $client->last_name,
        ];

        return rest_ensure_response($client_data);
    }
}
