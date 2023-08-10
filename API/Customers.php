<?php

namespace ORB_Services\API;

use WP_REST_Request;

use Stripe\Exception\ApiErrorException;

class Customers
{
    private $stripeClient;

    public function __construct($stripeClient)
    {
        $this->stripeClient = $stripeClient;

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/stripe/customers', [
                'methods' => 'POST',
                'callback' => [$this, 'add_stripe_customer'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/stripe/customers/(?P<slug>[a-zA-Z0-9-_]+)', [
                'methods' => 'GET',
                'callback' => [$this, 'get_stripe_customer'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/stripe/customers/(?P<slug>[a-zA-Z0-9-_]+)', [
                'methods' => 'PATCH',
                'callback' => [$this, 'update_stripe_customer'],
                'permission_callback' => '__return_true',
            ]);
        });
    }

    public function add_stripe_customer(WP_REST_Request $request)
    {
        try {
            $client_id = $request['client_id'];
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
                    'client_id' => $client_id,
                    'client_name' => $first_name . ' ' . $last_name
                ]
            ]);

            return rest_ensure_response($customer->id);
        } catch (ApiErrorException $e) {
            return rest_ensure_response($e);
        }
    }

    public function get_stripe_customer(WP_REST_Request $request)
    {
        $customer_id = $request->get_param('slug');

        try {
            $customer = $this->stripeClient->customers->retrieve(
                $customer_id,
                []
            );

            return rest_ensure_response($customer);
        } catch (ApiErrorException $e) {
            return rest_ensure_response($e);
        }
    }

    public function update_stripe_customer(WP_REST_Request $request)
    {
        try {
            $stripe_customer_id = $request->get_param('slug');
            $client_id = $request['client_id'];
            $company_name = $request['company_name'];
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

            if (!$company_name) {
                $company_name = $first_name . ' ' . $last_name;
            }

            $customer = $this->stripeClient->customers->update(
                $stripe_customer_id,
                [
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
                    // 'tax_id_data' => [
                    //     [
                    //         'type' => 'us_ein',
                    //         'value' => $tax_id
                    //     ]
                    // ],
                    'metadata' => [
                        'client_id' => $client_id,
                        'client_name' => $first_name . ' ' . $last_name
                    ]
                ]
            );

            return rest_ensure_response($customer);
        } catch (ApiErrorException $e) {

            $request = rest_ensure_response($e->getMessage());
            $request->set_status($e->getCode());

            return $request;
        }
    }
}
