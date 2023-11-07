<?php

namespace ORB\Products_Services\API\Stripe;

use Stripe\Exception\ApiErrorException;

class StripePaymentIntents
{
    private $stripeClient;

    public function __construct($stripeClient)
    {
        $this->stripeClient = $stripeClient;
    }

    public function createPaymentIntent($amount, $automatic_payment_methods, $currency, $email, $invoice_id)
    {
        try {
            $payment_intent = $this->stripeClient->paymentIntents->create([
                'amount' => $amount,
                'automatic_payment_methods' => [
                    'enabled' => $automatic_payment_methods,
                ],
                'currency' => $currency,
                'receipt_email' => $email,
                'metadata' => [
                    'invoice_id' => $invoice_id
                ]
            ]);

            return $payment_intent;
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

    public function getPaymentIntent($stripe_payment_intent_id)
    {
        try {
            $payment_intent = $this->stripeClient->paymentIntents->retrieve(
                $stripe_payment_intent_id,
                []
            );

            return $payment_intent;
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

    public function updatePaymentIntent($stripe_payment_intent_id, $email, $invoice_id)
    {
        try {
            $updated_payment_intent = $this->stripeClient->paymentIntents->update(
                $stripe_payment_intent_id,
                [
                    'customer' => $email,
                    'invoice' => $invoice_id,
                    'receipt_email' => $email
                ]
            );

            return $updated_payment_intent;
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

    public function confirmPaymentIntent($stripe_payment_intent_id)
    {
        try {
            $payment_intent = $this->stripeClient->paymentIntents->confirm(
                $stripe_payment_intent_id,
                ['payment_method' => 'pm_card_visa']
            );

            return $payment_intent;
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

    public function capturePaymentIntent($stripe_payment_intent_id)
    {
        try {
            $payment_intent = $this->stripeClient->paymentIntents->capture(
                $stripe_payment_intent_id,
            );

            return $payment_intent;
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

    public function cancelPaymentIntent($stripe_payment_intent_id)
    {
        try {
            $payment_intent = $this->stripeClient->paymentIntents->cancel(
                $stripe_payment_intent_id,
            );

            return $payment_intent;
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

    public function getPaymentIntents($list_limit = '')
    {
        try {
            $payment_intents = $this->stripeClient->paymentIntents->all(['limit' => $list_limit]);

            return $payment_intents;
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
