<?php

namespace ORB_Services\API;

use Exception;

use WP_REST_Request;

use ORB_Services\API\Stripe\StripeCustomers;
use ORB_Services\Database\DatabaseClient;

class Clients
{
    private $stripe_customers;
    private $database_client;

    public function __construct($stripeClient)
    {
        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/users/clients', array(
                'methods' => 'POST',
                'callback' => array($this, 'add_client'),
                'permission_callback' => '__return_true',
            ));
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/users/client/(?P<slug>[a-zA-Z0-9-_%.]+)', array(
                'methods' => 'GET',
                'callback' => array($this, 'get_client'),
                'permission_callback' => '__return_true',
            ));
        });

        $this->stripe_customers = new StripeCustomers($stripeClient);
        $this->database_client = new DatabaseClient();
    }

    function add_client(WP_REST_Request $request)
    {
        try {
            $company_name = $request['company_name'];
            $tax_id = $request['tax_id'];
            $first_name = $request['first_name'];
            $last_name = $request['last_name'];
            $email = $request['user_email'];
            $phone = $request['phone'];
            $address_line_1 = $request['address_line_1'];
            $address_line_2 = $request['address_line_2'];
            $city = $request['city'];
            $state = $request['state'];
            $zipcode = $request['zipcode'];
            $country = $request['country'];
            $metadata = $request['metadata'];
            $payment_method_id = $request['payment_method_id'];
            $description = $request['description'];
            $balance = $request['balance'];
            $cash_balance = $request['cash_balance'];
            $coupon = $request['coupon'];
            $invoice_prefix = $request['invoice_prefix'];
            $invoice_settings = $request['invoice_settings'];
            $next_invoice_sequence = $request['next_invoice_sequence'];
            $preferred_locales = $request['preferred_locales'];
            $promotion_code = $request['promotion_code'];
            $source = $request['source'];
            $tax = $request['tax'];
            $tax_id_type = $request['tax_id_type'];
            $tax_exempt = $request['tax_exempt'];
            $test_clock = $request['test_clock'];

            $address = [
                'line1' => $address_line_1,
                'line2' => $address_line_2,
                'city' => $city,
                'state' => $state,
                'postal_code' => $zipcode,
                'country' => $country
            ];

            if (!isset($shipping)) {
                $shipping = [
                    'line1' => $address_line_1,
                    'line2' => $address_line_2,
                    'city' => $city,
                    'state' => $state,
                    'postal_code' => $zipcode,
                    'country' => $country
                ];
            }

            $tax_id_data = array(
                'type' => $tax_id_type,
                'value' => $tax_id
            );

            $user = get_user_by('email', $email);

            if (is_wp_error($user)) {
                $error_message = $user->get_error_message();
                return rest_ensure_response(array('error' => $error_message));
            }

            $user_id = $user->ID;

            if (isset($first_name)) {
                update_user_meta($user_id, 'first_name', sanitize_text_field($first_name));
            }

            if (isset($last_name)) {
                update_user_meta($user_id, 'last_name', sanitize_text_field($last_name));
            }

            if (isset($first_name) && isset($last_name)) {
                $name = $first_name . ' ' . $last_name;
            }

            if (isset($company_name)) {
                $name = $company_name;
            }

            $metadata = array(
                'user_id' => $user_id,
                'client_name' => $first_name . ' ' . $last_name
            );

            $customer = $this->stripe_customers->createCustomer(
                $name,
                $email,
                $address,
                $shipping,
                $phone,
                $payment_method_id,
                $description,
                $balance,
                $cash_balance,
                $coupon,
                $invoice_prefix,
                $invoice_settings,
                $next_invoice_sequence,
                $preferred_locales,
                $promotion_code,
                $source,
                $tax,
                $tax_exempt,
                $tax_id_data,
                $test_clock,
                $metadata
            );

            $stripe_customer_id = $customer->id;

            $client_id = $this->database_client->saveClient($user_id, $stripe_customer_id, $first_name, $last_name);

            $data = [
                'client_id' => $client_id,
                'stripe_customer_id' => $stripe_customer_id
            ];

            return rest_ensure_response($data);
        } catch (Exception $e) {
            $error_message = $e->getMessage();
            $status_code = $e->getCode();

            $response_data = [
                'message' => $error_message,
                'status' => $status_code
            ];

            $response = rest_ensure_response($response_data);
            $response->set_status($status_code);

            return $response;
        }
    }

    public function get_client(WP_REST_Request $request)
    {
        try {
            $user_email_encoded = $request->get_param('slug');
            $user_email = urldecode($user_email_encoded);
            $user = get_user_by('email', $user_email);
            $user_id = $user->id;

            $client = $this->database_client->getClient($user_id);

            return rest_ensure_response($client);
        } catch (Exception $e) {
            $error_message = $e->getMessage();
            $status_code = $e->getCode();

            $response_data = [
                'message' => $error_message,
                'status' => $status_code
            ];

            $response = rest_ensure_response($response_data);
            $response->set_status($status_code);

            return $response;
        }
    }

    public function update_client(WP_REST_Request $request)
    {
        try {
            $stripe_customer_id = $request->get_param('slug');
            $company_name = $request['company_name'];
            $first_name = $request['first_name'];
            $last_name = $request['last_name'];

            $updated_client = $this->database_client->updateClient($stripe_customer_id, $company_name, $first_name, $last_name);

            return rest_ensure_response($updated_client);
        } catch (Exception $e) {
            $error_message = $e->getMessage();
            $status_code = $e->getCode();

            $response_data = [
                'message' => $error_message,
                'status' => $status_code
            ];

            $response = rest_ensure_response($response_data);
            $response->set_status($status_code);

            return $response;
        }
    }
}
