<?php

namespace ORBServices\API;

use WP_REST_Request;
use WP_REST_Response;
use WP_Error;
use Dotenv\Dotenv;

require ORB_SERVICES . '/vendor/autoload.php';
require_once ABSPATH . 'wp-load.php';

$dotenv = Dotenv::createImmutable(ORB_SERVICES);
$dotenv->load(__DIR__);

class Payment
{
    private $stripeSecretKey;
    private $stripeClient;

    public function __construct()
    {
        $this->stripeSecretKey = $_ENV['STRIPE_SECRET_KEY'];
        \Stripe\Stripe::setApiKey($this->stripeSecretKey);
        $this->stripeClient = new \Stripe\StripeClient($this->stripeSecretKey);

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/payment/finalize/invoice', [
                'methods' => 'POST',
                'callback' => [$this, 'finalizeInvoice'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/payment/intent', [
                'methods' => 'POST',
                'callback' => [$this, 'createPaymentIntent'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/payment/intent/(?P<slug>[a-zA-Z0-9-_]+)', [
                'methods' => 'POST',
                'callback' => [$this, 'updatePaymentIntent'],
                'permission_callback' => '__return_true',
            ]);
        });
    }

    public function finalizeInvoice(WP_REST_Request $request)
    {
        $status_code = 200;
        $error_message = '';

        try {
            $invoice_id = $request['invoice_id'];

            if ($request) {

                $invoice = $this->stripeClient->invoices->finalizeInvoice(
                    $invoice_id,
                    ['expand' => ['payment_intent']]
                );

                $client_secret = $invoice->payment_intent->client_secret;

                return new WP_REST_Response($client_secret, $status_code);
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

    public function createPaymentIntent(WP_REST_Request $request)
    {
        $status_code = 200;
        $error_message = '';

        try {
            $email = $request['email'];
            $subtotal = $request['subtotal'];
            $invoice_id = $request['invoice_id'];
            $customer_id = $request['customer_id'];

            if (is_numeric($subtotal) && $subtotal > 0) {
                $amount = $subtotal * 100;

                // Create a PaymentIntent with amount and currency
                $paymentIntent = \Stripe\PaymentIntent::create([
                    'amount' => $amount,
                    'automatic_payment_methods' => [
                        'enabled' => true,
                    ],
                    'currency' => 'usd',
                    'receipt_email' => $email,
                    'metadata' => [
                        'invoice_id' => $invoice_id
                    ]
                ]);

                return new WP_REST_Response($paymentIntent, $status_code);
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

    public function updatePaymentIntent(WP_REST_Request $request)
    {
        $status_code = 200;
        $error_message = '';

        try {
            $id = $request->get_param('slug');
            $email = $request['email'];
            $invoice_id = $request['invoice_id'];

            if (!empty($email) && !empty($invoice_id)) {
                // Update the PaymentIntent with customer, invoice, and receipt_email
                $paymentIntent = \Stripe\PaymentIntent::update(
                    $id,
                    [
                        'customer' => $email,
                        'invoice' => $invoice_id,
                        'receipt_email' => $email
                    ]
                );

                return new WP_REST_Response($paymentIntent, $status_code);
            } else {
                $error_message = 'Invalid request. Please check your input.';
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
            $error_message = 'An error occurred while updating the payment intent.';
            $status_code = 500;
        }

        $data = array(
            'status' => $status_code,
            'message' => $error_message,
        );

        return new WP_Error('rest_error', $error_message, $data);
    }
}

$payment = new Payment();
