<?php

namespace ORB_Services\API;

use WP_REST_Request;

use Stripe\PaymentIntent;
use Stripe\Exception\ApiErrorException;

class Payment
{
    private $stripeClient;

    public function __construct($stripeClient)
    {
        $this->stripeClient = $stripeClient;

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/stripe/payment_intents', [
                'methods' => 'POST',
                'callback' => [$this, 'createPaymentIntent'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/stripe/payment_intents/(?P<slug>[a-zA-Z0-9-_]+)', [
                'methods' => 'GET',
                'callback' => [$this, 'getPaymentIntent'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/stripe/payment_intents/(?P<slug>[a-zA-Z0-9-_]+)', [
                'methods' => 'PATCH',
                'callback' => [$this, 'updatePaymentIntent'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/stripe/payment_methods/(?P<slug>[a-zA-Z0-9-_]+)', [
                'methods' => 'GET',
                'callback' => [$this, 'getPaymentMethod'],
                'permission_callback' => '__return_true',
            ]);
        });
    }

    public function createPaymentIntent(WP_REST_Request $request)
    {
        try {
            $email = $request['email'];
            $amount = $request['amount'];
            $invoice_id = $request['invoice_id'];

            $paymentIntent = PaymentIntent::create([
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

            return rest_ensure_response($paymentIntent);
        } catch (ApiErrorException $e) {
            return rest_ensure_response($e);
        }
    }

    public function getPaymentIntent(WP_REST_Request $request)
    {
        $payment_intent_id = $request->get_param('slug');

        try {
            $payment_intent = $this->stripeClient->paymentIntents->retrieve(
                $payment_intent_id,
                []
            );

            return rest_ensure_response($payment_intent);
        } catch (ApiErrorException $e) {
            return rest_ensure_response($e);
        }
    }

    public function updatePaymentIntent(WP_REST_Request $request)
    {
        try {
            $id = $request->get_param('slug');
            $email = $request['email'];
            $invoice_id = $request['invoice_id'];

            $paymentIntent = PaymentIntent::update(
                $id,
                [
                    'customer' => $email,
                    'invoice' => $invoice_id,
                    'receipt_email' => $email
                ]
            );

            return rest_ensure_response($paymentIntent);
        } catch (ApiErrorException $e) {
            return rest_ensure_response($e);
        }
    }

    public function getPaymentMethod(WP_REST_Request $request)
    {
        $payment_method_id = $request->get_param('slug');

        try {
            $payment_method = $this->stripeClient->paymentMethods->retrieve(
                $payment_method_id,
                []
            );
            return rest_ensure_response($payment_method);
        } catch (ApiErrorException $e) {
            return rest_ensure_response($e);
        }
    }
}
