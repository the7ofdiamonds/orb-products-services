<?php

namespace API\Customer;

use WP_REST_Request;
use WP_REST_Response;
use WP_Error;
use Dotenv\Dotenv;

require ORB_SERVICES . '/vendor/autoload.php';
require_once ABSPATH . 'wp-load.php';

$dotenv = Dotenv::createImmutable(ORB_SERVICES);
$dotenv->load(__DIR__);

class ORB_Services_API_Customer
{
    private $stripeSecretKey;
    private $stripeClient;

    public function __construct()
    {
        $this->stripeSecretKey = $_ENV['STRIPE_SECRET_KEY'];
        \Stripe\Stripe::setApiKey($this->stripeSecretKey);
        $this->stripeClient = new \Stripe\StripeClient($this->stripeSecretKey);

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/customer', [
                'methods' => 'POST',
                'callback' => [$this, 'createCustomer'],
                'permission_callback' => '__return_true',
            ]);
        });
    }

    public function createCustomer(WP_REST_Request $request)
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

            $success = $this->stripeClient->customers->create([
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
                    'metadata'=> [
                        'customer_id' => $customer_id
                    ] 
                ]);

                return new WP_REST_Response($success, $status_code);
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

$customer = new ORB_Services_API_Customer();
