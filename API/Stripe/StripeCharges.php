<?php

namespace ORB\Products_Services\API\Stripe;

use Stripe\Exception\ApiErrorException;

class StripeCharges
{
    private $stripeClient;

    public function __construct($stripeClient)
    {
        $this->stripeClient = $stripeClient;
    }

    public function createCharge($amount, $currency, $source = '', $description = '')
    {
        try {
            $charge = $this->stripeClient->charges->create([
                'amount' => $amount,
                'currency' => $currency,
                'source' => $source,
                'description' => $description
            ]);

            return $charge;
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

    public function getCharge($stripe_charge_id)
    {
        try {
            $charge = $this->stripeClient->charges->retrieve(
                $stripe_charge_id,
                []
            );

            return $charge;
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

    public function updateCharge($stripe_charge_id)
    {
        try {
            $updated_charge = $this->stripeClient->charges->update(
                $stripe_charge_id,
                ['metadata' => ['order_id' => '6735']]
            );

            return $updated_charge;
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

    public function captureCharge($stripe_charge_id)
    {
        try {
            $charge = $this->stripeClient->Charges->capture(
                $stripe_charge_id,
            );

            return $charge;
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

    public function getCharges($list_limit = 10)
    {
        try {
            $charges = $this->stripeClient->charges->all(['limit' => $list_limit]);

            return $charges;
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

    public function searchCharges($query)
    {
        try {
            $charges = $this->stripeClient->charges->search([
                'query' => $query,
            ]);

            return $charges;
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
