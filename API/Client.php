<?php

namespace ORBServices\API;

use WP_REST_Request;
use WP_REST_Response;
use WP_Error;
use WP_User;

use Dotenv\Dotenv;

require ORB_SERVICES . '/vendor/autoload.php';
require_once ABSPATH . 'wp-load.php';

$dotenv = Dotenv::createImmutable(ORB_SERVICES);
$dotenv->load(__DIR__);

class Client
{
    private $stripeSecretKey;
    private $stripeClient;

    public function __construct()
    {
        $this->stripeSecretKey = $_ENV['STRIPE_SECRET_KEY'];
        \Stripe\Stripe::setApiKey($this->stripeSecretKey);
        $this->stripeClient = new \Stripe\StripeClient($this->stripeSecretKey);

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/clients', array(
                'methods' => 'POST',
                'callback' => [$this, 'create_client'],
                'permission_callback' => '__return_true',
            ));
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/customers', [
                'methods' => 'POST',
                'callback' => [$this, 'create_customer'],
                'permission_callback' => '__return_true',
            ]);
        });
    }

    function user_client_creation_permission($request)
    {
        // Implement your custom logic to check if the current user has the required capabilities or role.
        // For example, you can use the `current_user_can()` function to check the user's capabilities.
        return current_user_can('add_user');
    }

    function create_client($request)
    {
        // Retrieve the user data from the request
        $username = $request->get_param('username');
        $email = $request->get_param('email');
        $password = $request->get_param('password');

        // Create the user using wp_create_user() or other appropriate methods
        $client_id = wp_create_user($username, $password, $email);

        $user = new WP_User($client_id);
        $user->add_role('subscriber');
        $user->add_role('client');

        // Return the created user data or an appropriate response
        if (!is_wp_error($client_id)) {
            return rest_ensure_response($client_id);
        } else {
            $error_message = $client_id->get_error_message();
            return rest_ensure_response(array('error' => $error_message));
        }
    }

    public function create_customer(WP_REST_Request $request)
    {
        $status_code = 200;
        $error_message = '';

        try {
            $customer_id = $request['customer_id'];
            $name = $request['name'];
            $email = $request['email'];
            $phone = $request['phone'];
            $address_line1 = $request['line1'];
            $address_line2 = $request['line2'];
            $city = $request['city'];
            $state = $request['state'];
            $zipcode = $request['zipcode'];
            $country = $request['country'];
            $description = $request['description'];

            if ($request) {

                $customer = $this->stripeClient->customers->create([
                    'name' => $name,
                    'email' => $email,
                    'phone' => $phone,
                    'address' => [
                        'line1' => $address_line1,
                        'line2' => $address_line2,
                        'city' => $city,
                        'state' => $state,
                        'postal_code' => $zipcode,
                        'country' => $country
                    ],
                    'description' => $description,
                    'metadata' => [
                        'customer_id' => $customer_id
                    ]
                ]);

                return new WP_REST_Response($customer->id, $status_code);
            } else {
                $error_message = 'Invalid amount. Please provide a positive value.';
                $status_code = 400;
            }
        } catch (\Stripe\Exception\CardException $e) {
            // Handle specific CardException
            $error_message = 'Card declined.';
            $status_code = 400;
        } catch (\Stripe\Exception\RateLimitException $e) {
            // Handle specific RateLimitException
            $error_message = 'Too many requests. Please try again later.';
            $status_code = 429;
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

$customer = new Client();
