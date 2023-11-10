<?php

namespace ORB\Products_Services\Post_Types\Services;

use Exception;

use ORB\Products_Services\API\Stripe\StripeProducts;
use ORB\Products_Services\API\Stripe\StripePrices;

class ServicesStripe
{
    private $stripe_products;
    private $stripe_prices;

    public function __construct($stripeClient)
    {
        $this->stripe_products = new StripeProducts($stripeClient);
        $this->stripe_prices = new StripePrices($stripeClient);
    }

    function add_service_to_stripe($service_id, $service_name, $service_description)
    {
        try {
            if (empty($service_id)) {
                throw new Exception('Service ID is required.', 404);
            }

            if (empty($service_name)) {
                throw new Exception('Service Name is required.', 404);
            }

            if (isset($service_description) && empty($service_description)) {
                throw new Exception('Service Description is required.', 404);
            }

            $product = $this->stripe_products->createProduct(
                $service_id,
                $service_name,
                $service_description,
            );

            return $product;
        } catch (Exception $e) {
            $errorMessage = $e->getMessage();
            $errorCode = $e->getCode();
            $response = $errorMessage . ' ' . $errorCode;

            error_log($response . ' at add_service_to_stripe');
            return $response;
        }
    }

    function add_service_price_to_stripe($product_id, $service_price, $service_currency)
    {
        try {
            if (empty($product_id)) {
                throw new Exception('Service ID is required.', 404);
            }

            if (empty($service_price)) {
                throw new Exception('Service Price is required.', 404);
            }

            if (empty($service_currency)) {
                throw new Exception('Service Currency is required.', 404);
            }

            $unit_amount = str_replace('.', '', $service_price);

            $price = $this->stripe_prices->createPrice(
                $service_currency,
                $unit_amount,
                $product_id
            );

            return $price;
        } catch (Exception $e) {
            $errorMessage = $e->getMessage();
            $errorCode = $e->getCode();
            $response = $errorMessage . ' ' . $errorCode;

            error_log($response . ' at add_service_price_to_stripe');
            return $response;
        }
    }

    function get_service_from_stripe($post_id)
    {
        try {
            $service = $this->stripe_products->getProduct($post_id);

            return $service;
        } catch (Exception $e) {
            $errorMessage = $e->getMessage();
            $errorCode = $e->getCode();
            $response = $errorMessage . ' ' . $errorCode;

            error_log($response . 'at get_service_from_stripe');
            return $response;
        }
    }

    function get_service_prices_from_stripe($post_id)
    {
        try {
            $query = 'active:\'true\' AND product:' . $post_id;
            $prices = $this->stripe_prices->searchPrices($query);

            return $prices->data;
        } catch (Exception $e) {
            $errorMessage = $e->getMessage();
            $errorCode = $e->getCode();
            $response = $errorMessage . ' ' . $errorCode;

            error_log($response . 'at get_service_prices_from_stripe');
            return $response;
        }
    }

    function update_service_at_stripe($service_id, $service_description)
    {
        try {
            if (empty($service_id)) {
                throw new Exception('Service ID is required.', 404);
            }

            if (empty($service_description)) {
                throw new Exception('Service Description is required.', 404);
            }
            $product = $this->stripe_products->updateProduct($service_id, $service_description);

            return $product;
        } catch (Exception $e) {
            $errorMessage = $e->getMessage();
            $errorCode = $e->getCode();
            $response = $errorMessage . ' ' . $errorCode;

            error_log($response . ' at update_service_at_stripe');
            return $response;
        }
    }

    function update_service_price_at_stripe($price_id, $unit_amount, $service_currency)
    {
        try {
            if (empty($price_id)) {
                throw new Exception('Stripe Price ID is required.', 404);
            }

            if (empty($unit_amount)) {
                throw new Exception('Unit Amount is required.', 404);
            }

            if (empty($service_currency)) {
                throw new Exception('Service Currency is required.', 404);
            }

            $price = $this->stripe_prices->updatePrice($price_id, $unit_amount, $service_currency);

            return $price;
        } catch (Exception $e) {
            $errorMessage = $e->getMessage();
            $errorCode = $e->getCode();
            $response = $errorMessage . ' ' . $errorCode;

            error_log($response . ' at update_service_price_at_stripe');
            return $response;
        }
    }
}
