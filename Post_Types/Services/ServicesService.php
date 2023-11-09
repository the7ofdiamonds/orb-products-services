<?php

namespace ORB\Products_Services\Post_Types\Services;

use Exception;

use ORB\Products_Services\API\Stripe\StripeProducts;
use ORB\Products_Services\API\Stripe\StripePrices;

class ServicesService
{
    private $stripe_products;
    private $stripe_prices;

    public function __construct($stripeClient)
    {
        $this->stripe_products = new StripeProducts($stripeClient);
        $this->stripe_prices = new StripePrices($stripeClient);
    }

    function add_service_to_stripe($service_id, $service_name, $service_description, $service_price)
    {
        try {
            if (!isset($service_id)) {
                throw new Exception('Service ID is required.', 404);
            }

            if (!isset($service_name)) {
                throw new Exception('Service Name is required.', 404);
            }

            if (!isset($service_description)) {
                throw new Exception('Service Description is required.', 404);
            }

            if (!isset($service_price)) {
                throw new Exception('Service Price is required.', 404);
            }

            if (!isset($service_currency)) {
                throw new Exception('Service Currency is required.', 404);
            }

            if (!isset($service_id)) {
                throw new Exception('Service ID is required.', 404);
            }

            $unit_amount = str_replace('.', '', $service_price);

            $product = $this->stripe_products->createProduct(
                $service_id,
                $service_name,
                $service_description,
            );

            $price = $this->stripe_prices->createPrice(
                $service_currency,
                $unit_amount,
                $product->id
            );

            return $price;
        } catch (Exception $e) {
            $errorMessage = $e->getMessage();
            $errorCode = $e->getCode();
            $response = $errorMessage . ' ' . $errorCode;

            return $response;
        }
    }

    function update_service_at_stripe($service_id, $service_description)
    {
        try {
            $product = $this->stripe_products->updateProduct($service_id, $service_description);

            return $product;
        } catch (Exception $e) {
            $errorMessage = $e->getMessage();
            $errorCode = $e->getCode();
            $response = $errorMessage . ' ' . $errorCode;

            return $response;
        }
    }

    function update_service_price_at_stripe($price_id, $unit_amount, $service_currency)
    {
        try {
            $price = $this->stripe_prices->updatePrice($price_id, $unit_amount, $service_currency);

            return $price;
        } catch (Exception $e) {
            $errorMessage = $e->getMessage();
            $errorCode = $e->getCode();
            $response = $errorMessage . ' ' . $errorCode;

            return $response;
        }
    }
}
