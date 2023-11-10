<?php

namespace ORB\Products_Services\API\Stripe;

use Exception;

use Stripe\Exception\ApiErrorException;

class StripeProducts
{
    private $stripeClient;

    public function __construct($stripeClient)
    {
        $this->stripeClient = $stripeClient;
    }

    public function createProduct(
        $id,
        $name,
        $description,
        $active = true,
        $default_price_data = '',
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
                // 'default_price_data' => $default_price_data,
                'description' => $description,
                // 'features' => $features,
                // 'images' => $images,
                // 'package_dimensions' => $package_dimensions,
                // 'shippable' => $shippable,
                // 'statement_descriptor' => $statement_descriptor,
                // 'tax_code' => $tax_code,
                // 'unit_label' => $unit_label,
                // 'url' => $url,
            ]);

            return $product;
        } catch (ApiErrorException $e) {
            $error_message = $e->getMessage();
            $status_code = $e->getHttpStatus();
            $response = $error_message . ' ' . $status_code;

            error_log($response . ' at createProduct');
            return $response;
        } catch (Exception $e) {
            $error_message = $e->getMessage();
            $status_code = $e->getCode();
            $response = $error_message . ' ' . $status_code;

            error_log($response . ' at createProduct');
            return $response;
        }
    }

    public function getProduct($stripe_product_id)
    {
        try {
            $product = $this->stripeClient->products->retrieve(
                $stripe_product_id,
                ['expand' => ['default_price']]
            );

            return $product;
        } catch (ApiErrorException $e) {
            $error_message = $e->getMessage();
            $status_code = $e->getHttpStatus();
            $response = $error_message . ' ' . $status_code;

            error_log($response . ' at getProduct');
            return $response;
        } catch (Exception $e) {
            $error_message = $e->getMessage();
            $status_code = $e->getCode();
            $response = $error_message . ' ' . $status_code;

            error_log($response . ' at getProduct');
            return $response;
        }
    }

    public function updateProduct(
        $stripe_product_id,
        $description = '',
        $features = '',
        $active = true,
        $default_price = '',
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
                    // 'active' => $active,
                    // 'default_price' => $default_price,
                    'description' => $description,
                    // 'features' => $features,
                    // 'images' => $images,
                    // 'package_dimensions' => $package_dimensions,
                    // 'shippable' => $shippable,
                    // 'statement_descriptor' => $statement_descriptor,
                    // 'tax_code' => $tax_code,
                    // 'unit_label' => $unit_label,
                    // 'url' => $url,
                ]
            );
            error_log(print_r($updated_product, true));
            return $updated_product;
        } catch (ApiErrorException $e) {
            $error_message = $e->getMessage();
            $status_code = $e->getHttpStatus();
            $response = $error_message . ' ' . $status_code;

            error_log($response . ' at updateProduct');
            return $response;
        } catch (Exception $e) {
            $error_message = $e->getMessage();
            $status_code = $e->getCode();
            $response = $error_message . ' ' . $status_code;

            error_log($response . ' at updateProduct');
            return $response;
        }
    }

    public function getProducts($list_limit = 10)
    {
        try {
            $products = $this->stripeClient->products->all(['limit' => $list_limit]);

            return $products;
        } catch (ApiErrorException $e) {
            $error_message = $e->getMessage();
            $status_code = $e->getHttpStatus();
            $response = $error_message . ' ' . $status_code;

            error_log($response . ' at getProducts');
            return $response;
        } catch (Exception $e) {
            $error_message = $e->getMessage();
            $status_code = $e->getCode();
            $response = $error_message . ' ' . $status_code;

            error_log($response . ' at getProducts');
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
            $response = $error_message . ' ' . $status_code;

            error_log($response . ' at deleteProduct');
            return $response;
        } catch (Exception $e) {
            $error_message = $e->getMessage();
            $status_code = $e->getCode();
            $response = $error_message . ' ' . $status_code;

            error_log($response . ' at deleteProduct');
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
            $response = $error_message . ' ' . $status_code;

            error_log($response . ' at searchProducts');
            return $response;
        } catch (Exception $e) {
            $error_message = $e->getMessage();
            $status_code = $e->getCode();
            $response = $error_message . ' ' . $status_code;

            error_log($response . ' at searchProducts');
            return $response;
        }
    }
}
