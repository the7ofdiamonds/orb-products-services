<?php

namespace ORB_Products_Services\API\Stripe;

use Exception;
use Stripe\Exception\ApiErrorException;

class StripeCustomers
{

    private $stripeClient;

    public function __construct($stripeClient)
    {
        $this->stripeClient = $stripeClient;
    }

    public function createCustomer(
        $name,
        $email,
        $address = '',
        $shipping = '',
        $phone = '',
        $payment_method_id = '',
        $description = '',
        $balance = '',
        $cash_balance = '',
        $coupon = '',
        $invoice_prefix = '',
        $invoice_settings = '',
        $next_invoice_sequence = '',
        $preferred_locales = '',
        $promotion_code = '',
        $source = '',
        $tax = '',
        $tax_exempt = '',
        $tax_id_data = '',
        $test_clock = '',
        $metadata = ''
    ) {
        try {
            $customer = $this->stripeClient->customers->create([
                'name' => $name,
                'email' => $email,
                'address' => $address,
                'shipping' => $shipping,
                'phone' => $phone,
                'payment_method' => $payment_method_id,
                'description' => $description,
                'balance' => $balance,
                'cash_balance' => $cash_balance,
                'coupon' => $coupon,
                'invoice_prefix' => $invoice_prefix,
                'invoice_settings' => $invoice_settings,
                'next_invoice_sequence' => $next_invoice_sequence,
                'preferred_locales' => $preferred_locales,
                'promotion_code' => $promotion_code,
                'source' => $source,
                'tax' => $tax,
                'tax_exempt' => $tax_exempt,
                'tax_id_data' => $tax_id_data,
                'test_clock' => $test_clock,
                ['metadata' => $metadata]
            ]);

            return $customer;
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

    public function getCustomer($stripe_customer_id)
    {
        try {
            if (!empty($stripe_customer_id)) {
                $customer = $this->stripeClient->customers->retrieve(
                    $stripe_customer_id,
                    ['expand' => ['tax_ids']]
                );
                return $customer;
            } else {
                throw new Exception('A Stripe Customer ID is required.');
            }
        } catch (ApiErrorException $e) {
            $error_message = $e->getMessage();

            return $error_message;
        }
    }

    public function updateCustomer(
        $stripe_customer_id,
        $name = '',
        $email = '',
        $address = '',
        $shipping = '',
        $phone = '',
        $payment_method_id = '',
        $description = '',
        $balance = '',
        $cash_balance = '',
        $coupon = '',
        $invoice_prefix = '',
        $invoice_settings = '',
        $next_invoice_sequence = '',
        $preferred_locales = '',
        $promotion_code = '',
        $source = '',
        $tax = '',
        $tax_exempt = '',
        $tax_id_data = '',
        $test_clock = '',
        $metadata = ''
    ) {
        try {
            $customer = $this->stripeClient->customers->update(
                $stripe_customer_id,
                [
                    'name' => $name,
                    'email' => $email,
                    'address' => $address,
                    'shipping' => $shipping,
                    'phone' => $phone,
                    'payment_method' => $payment_method_id,
                    'description' => $description,
                    'balance' => $balance,
                    'cash_balance' => $cash_balance,
                    'coupon' => $coupon,
                    'invoice_prefix' => $invoice_prefix,
                    'invoice_settings' => $invoice_settings,
                    'next_invoice_sequence' => $next_invoice_sequence,
                    'preferred_locales' => $preferred_locales,
                    'promotion_code' => $promotion_code,
                    'source' => $source,
                    'tax' => $tax,
                    'tax_exempt' => $tax_exempt,
                    'tax_id_data' => $tax_id_data,
                    'test_clock' => $test_clock,
                    ['metadata' => $metadata]
                ]
            );

            return $customer;
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

    public function getcustomers($list_limit = 10)
    {
        try {
            $customers = $this->stripeClient->customers->all(['limit' => $list_limit]);
            return $customers;
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

    public function searchCustomers($query)
    {
        try {
            $customers = $this->stripeClient->customers->search([
                'query' => $query
            ]);

            return $customers;
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
