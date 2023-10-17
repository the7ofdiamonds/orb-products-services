<?php

namespace ORB_Products_Services\API\Stripe;

use Stripe\Exception\ApiErrorException;

class StripePrices
{
    private $stripeClient;

    public function __construct($stripeClient)
    {
        $this->stripeClient = $stripeClient;
    }

    public function createPrice(
        $currency,
        $unit_amount = '',
        $stripe_product_id = '',
        $active = '',
        $nick_name = '',
        $recurring = '',
        $custom_unit_amount = '',
        $product_data = '',
        $tiers = '',
        $tiers_mode = '',
        $billing_scheme = '',
        $currency_options = '',
        $lookup_key = '',
        $tax_behavior = '',
        $transfer_lookup_key = '',
        $transform_quantity = '',
        $unit_amount_decimal = '',
        $metadata = '',
    ) {
        try {
            $price = $this->stripeClient->prices->create([
                'currency' => $currency,
                'unit_amount' => $unit_amount,
                'product' => $stripe_product_id,
                'active' => $active,
                'nick_name' => $nick_name,
                'recurring' => $recurring,
                'custom_unit_amount' => $custom_unit_amount,
                'product_data' => $product_data,
                'tiers' => $tiers,
                'tiers_mode' => $tiers_mode,
                'billing_scheme' => $billing_scheme,
                'currency_options' => $currency_options,
                'lookup_key' => $lookup_key,
                'tax_behavior' => $tax_behavior,
                'transfer_lookup_key' => $transfer_lookup_key,
                'transform_quantity' => $transform_quantity,
                'unit_amount_decimal' => $unit_amount_decimal,
                'metadata' => $metadata,
            ]);

            return $price;
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

    public function getPrice($stripe_price_id)
    {
        try {
            $price = $this->stripeClient->prices->retrieve(
                $stripe_price_id,
                []
            );

            return $price;
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

    public function updatePrice(
        $stripe_price_id,
        $active = '',
        $currency_options = '',
        $lookup_key = '',
        $metadata = '',
        $tax_behavior = '',
        $transfer_lookup_key = '',
    ) {
        try {
            $updated_price = $this->stripeClient->prices->update(
                $stripe_price_id,
                [
                    'active' => $active,
                    'currency_options' => $currency_options,
                    'lookup_key' => $lookup_key,
                    'tax_behavior' => $tax_behavior,
                    'transfer_lookup_key' => $transfer_lookup_key,
                    'metadata' => $metadata,
                ]
            );

            return $updated_price;
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

    public function getPrices($list_limit = 10)
    {
        try {
            $prices = $this->stripeClient->prices->all(['limit' => $list_limit]);

            return $prices;
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

    public function searchPrices($query)
    {
        try {
            $prices = $this->stripeClient->prices->search([
                'query' => $query
            ]);

            return $prices;
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
