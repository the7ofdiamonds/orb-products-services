<?php

namespace ORB_Services\API\Stripe;

use Stripe\Exception\ApiErrorException;

class StripePaymentMethods
{
    private $stripeClient;
    private $list_limit;

    public function __construct($stripeClient, $list_limit)
    {
        $this->$stripeClient = $stripeClient;
        $this->$list_limit = $list_limit;
    }

    public function createPaymentMethod($type, $details)
    {
        try {
            $payment_method = $this->stripeClient->paymentMethods->create([
                'type' => $type,
                $details
            ]);

            return $payment_method;
        } catch (ApiErrorException $e) {
            $error_message = $e->getMessage();
            $status_code = $e->getHttpStatus();
            $response_data = [
                'message' => $error_message,
                'status' => $status_code
            ];

            $response = rest_ensure_response($response_data);
            $response->set_status($status_code);

            return $response;
        }
    }

    public function getPaymentMethod($stripe_payment_method_id)
    {
        try {
            $payment_method = $this->stripeClient->paymentMethods->retrieve(
                $stripe_payment_method_id,
                []
            );

            return $payment_method;
        } catch (ApiErrorException $e) {
            $error_message = $e->getMessage();
            $status_code = $e->getHttpStatus();
            $response_data = [
                'message' => $error_message,
                'status' => $status_code
            ];

            $response = rest_ensure_response($response_data);
            $response->set_status($status_code);

            return $response;
        }
    }

    public function updatePaymentMethod($stripe_payment_method_id, $billing_details = '', $card = '', $link = '', $us_bank_account = '')
    {
        try {
            $updated_payment_method = $this->stripeClient->paymentMethods->update(
                $stripe_payment_method_id,
                [
                    'billing_details' => $billing_details,
                    'card' => $card,
                    'link' => $link,
                    'us_bank_account' => $us_bank_account
                ]
            );

            return $updated_payment_method;
        } catch (ApiErrorException $e) {
            $error_message = $e->getMessage();
            $status_code = $e->getHttpStatus();
            $response_data = [
                'message' => $error_message,
                'status' => $status_code
            ];

            $response = rest_ensure_response($response_data);
            $response->set_status($status_code);

            return $response;
        }
    }


    public function getPaymentMethods($type = '', $customer = '', $ending_before = '', $starting_after = '')
    {
        try {
            $payment_methods = $this->stripeClient->paymentMethods->all([
                'type' => $type,
                'customer' => $customer,
                'ending_before' => $ending_before,
                'starting_after' => $starting_after,
                'limit' => $this->list_limit
            ]);

            return $payment_methods;
        } catch (ApiErrorException $e) {
            $error_message = $e->getMessage();
            $status_code = $e->getHttpStatus();
            $response_data = [
                'message' => $error_message,
                'status' => $status_code
            ];

            $response = rest_ensure_response($response_data);
            $response->set_status($status_code);

            return $response;
        }
    }

    public function attachPaymentMethod($stripe_payment_method_id, $stripe_customer_id)
    {
        try {
            $payment_methods = $this->stripeClient->paymentMethods->attach(
                $stripe_payment_method_id,
                ['customer' => $stripe_customer_id]
            );

            return $payment_methods;
        } catch (ApiErrorException $e) {
            $error_message = $e->getMessage();
            $status_code = $e->getHttpStatus();
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
