<?php

namespace ORB_Services\API\Stripe;

use Stripe\Exception\ApiErrorException;

class StripeProducts
{
    private $stripeClient;
    private $list_limit;

    public function __construct($stripeClient, $list_limit)
    {
        $this->$stripeClient = $stripeClient;
        $this->$list_limit = $list_limit;
    }

    public function createProduct(
        $id,
        $name,
        $active = '',
        $default_price_data = '',
        $description = '',
        $features = '',
        $images = '',
        $package_dimensions = '',
        $shippable = '',
        $statement_descriptor = '',
        $tax_code = '',
        $unit_label = '',
        $url = ''
    ) {
        try {
            $product = $this->stripeClient->products->create([
                'id' => $id,
                'name' => $name,
                'active' => $active,
                'default_price_data' => $default_price_data,
                'description' => $description,
                'features' => $features,
                'images' => $images,
                'package_dimensions' => $package_dimensions,
                'shippable' => $shippable,
                'statement_descriptor' => $statement_descriptor,
                'tax_code' => $tax_code,
                'unit_label' => $unit_label,
                'url' => $url,
            ]);

            return $product;
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

    public function getProduct($stripe_payment_intent_id)
    {
        try {
            $product = $this->stripeClient->products->retrieve(
                $stripe_payment_intent_id,
                []
            );

            return $product;
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

    public function updateProduct(
        $stripe_product_id,
        $active = '',
        $default_price = '',
        $description = '',
        $features = '',
        $images = '',
        $package_dimensions = '',
        $shippable = '',
        $statement_descriptor = '',
        $tax_code = '',
        $unit_label = '',
        $url = ''
    ) {
        try {
            $updated_product = $this->stripeClient->products->update(
                $stripe_product_id,
                [
                    'active' => $active,
                    'default_price' => $default_price,
                    'description' => $description,
                    'features' => $features,
                    'images' => $images,
                    'package_dimensions' => $package_dimensions,
                    'shippable' => $shippable,
                    'statement_descriptor' => $statement_descriptor,
                    'tax_code' => $tax_code,
                    'unit_label' => $unit_label,
                    'url' => $url,
                ]
            );

            return $updated_product;
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

    public function getProducts()
    {
        try {
            $products = $this->stripeClient->products->all(['limit' => $this->list_limit]);

            return $products;
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

    public function deleteProduct($stripe_product_id)
    {
        try {
            $product = $this->stripeClient->products->delete(
                $stripe_product_id,
                []
            );

            return $product;
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

    public function searchProducts($query)
    {
        try {
            $products = $this->stripeClient->products->search([
                'query' => $query
            ]);

            return $products;
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
