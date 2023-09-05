<?php

namespace ORB_Services\API;

use WP_REST_Request;

class Payment
{
    private $stripe_payment_intents;
    private $stripe_payment_methods;

    public function __construct($stripe_payment_intents, $stripe_payment_methods)
    {
        $this->stripe_payment_intents = $stripe_payment_intents;
        $this->stripe_payment_methods = $stripe_payment_methods;

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/stripe/payment_intents', [
                'methods' => 'POST',
                'callback' => [$this, 'create_payment_intent'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/stripe/payment_intents/(?P<slug>[a-zA-Z0-9-_]+)', [
                'methods' => 'GET',
                'callback' => [$this, 'get_payment_intent'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/stripe/payment_intents/(?P<slug>[a-zA-Z0-9-_]+)', [
                'methods' => 'PATCH',
                'callback' => [$this, 'update_payment_intent'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/stripe/payment_methods/(?P<slug>[a-zA-Z0-9-_]+)', [
                'methods' => 'GET',
                'callback' => [$this, 'get_payment_method'],
                'permission_callback' => '__return_true',
            ]);
        });
    }

    public function create_payment_intent(WP_REST_Request $request)
    {
        $email = $request['email'];
        $amount = $request['amount'];
        $automatic_payment_methods = $request['automatic_payment_methods'];
        $currency = $request['currency'];
        $invoice_id = $request['invoice_id'];

        $payment_intent = $this->stripe_payment_intents->createPaymentIntent($amount, $automatic_payment_methods, $currency, $email, $invoice_id);

        return rest_ensure_response($payment_intent);
    }

    public function get_payment_intent(WP_REST_Request $request)
    {
        $payment_intent_id = $request->get_param('slug');

        $payment_intent = $this->stripe_payment_intents->getPaymentIntent($payment_intent_id);

        return rest_ensure_response($payment_intent);
    }

    public function update_payment_intent(WP_REST_Request $request)
    {
        $stripe_payment_intent_id = $request->get_param('slug');
        $email = $request['email'];
        $invoice_id = $request['invoice_id'];

        $payment_intent = $this->stripe_payment_intents->updatePaymentIntent($stripe_payment_intent_id, $email, $invoice_id);

        return rest_ensure_response($payment_intent);
    }

    public function get_payment_method(WP_REST_Request $request)
    {
        $payment_method_id = $request->get_param('slug');

        $payment_method = $this->stripe_payment_methods->getPaymentMethods($payment_method_id);

        return rest_ensure_response($payment_method);
    }
}
