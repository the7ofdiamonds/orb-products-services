<?php

namespace ORB_Services\API;

use WP_REST_Request;
use WP_REST_Response;
use WP_Error;

use Stripe\Exception\ApiErrorException;

require ORB_SERVICES . 'vendor/autoload.php';
require_once ABSPATH . 'wp-load.php';

class Customers
{
    private $stripeSecretKey;
    private $stripeClient;

    public function __construct()
    {
        $this->stripeSecretKey = $_ENV['STRIPE_SECRET_KEY'];
        \Stripe\Stripe::setApiKey($this->stripeSecretKey);
        $this->stripeClient = new \Stripe\StripeClient($this->stripeSecretKey);

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
    }

    public function add_stripe_customer(WP_REST_Request $request)
    {
        $status_code = 200;
        $error_message = '';

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

            return new WP_REST_Response($customer->id, $status_code);
        } catch (ApiErrorException $e) {
            return rest_ensure_response($e);
        }

        $data = array(
            'status' => $status_code,
            'message' => $error_message,
        );

        return new WP_Error('rest_error', $error_message, $data);
    }

    public function get_stripe_customer(WP_REST_Request $request)
    {
        $status_code = 200;
        $error_message = '';

        $customer_id = $request->get_param('slug');

        try {

            $customer = $this->stripeClient->customers->retrieve(
                $customer_id,
                []
            );

            return new WP_REST_Response($customer, $status_code);
        } catch (\Stripe\Exception\InvalidRequestException $e) {
            // Handle specific InvalidRequestException
            $error_message = 'Invalid request. Please check your input.';
            $status_code = 400;
        } catch (\Stripe\Exception\AuthenticationException $e) {
            // Handle specific AuthenticationException
            $error_message = 'Authentication failed. Please check your API credentials.';
            $status_code = 401;
        } catch (\Stripe\Exception\ApiConnectionException $e) {
            // Handle specific ApiConnectionException
            $error_message = 'Network error occurred. Please try again later.';
            $status_code = 500;
        } catch (\Exception $e) {
            // Handle any other generic exceptions
            $error_message = 'An error occurred while creating the payment intent.';
            $status_code = 500;
        }

        $data = array(
            'status' => $status_code,
            'message' => $error_message,
        );

        return new WP_Error('rest_error', $error_message, $data);
    }
}
