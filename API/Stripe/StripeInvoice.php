<?php

namespace ORB\Products_Services\API\Stripe;

use Stripe\Exception\ApiErrorException;

class StripeInvoice
{
    private $stripeClient;

    public function __construct($stripeClient)
    {
        $this->stripeClient = $stripeClient;
    }

    public function createStripeInvoice($stripe_customer_id, $selections, $tax_enabled = false)
    {
        try {
            if (empty($stripe_customer_id)) {
                $msg = 'Stripe Customer ID is required';
                $message = array(
                    'message' => $msg,
                );
                $response = rest_ensure_response($message);
                $response->set_status(404);

                return $response;
            }

            if (empty($selections)) {
                $msg = 'Selections are required';
                $message = array(
                    'message' => $msg,
                );
                $response = rest_ensure_response($message);
                $response->set_status(404);

                return $response;
            }

            $line_items = [];

            foreach ($selections as $selection) {
                $price_id = $selection['price_id'];

                $line_items[] = [
                    'price' => $price_id
                ];
            }

            $stripe_quote = $this->stripeClient->quotes->create([
                'automatic_tax' => [
                    'enabled' => $tax_enabled,
                ],
                'collection_method' => 'send_invoice',
                'invoice_settings' => [
                    'days_until_due' => 7
                ],
                'customer' => $stripe_customer_id,
                'line_items' => $line_items,
            ]);

            return rest_ensure_response($stripe_quote);
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

    public function getStripeInvoice($stripe_invoice_id)
    {

        try {
            $stripe_invoice = $this->stripeClient->invoices->retrieve(
                $stripe_invoice_id,
                []
            );

            return $stripe_invoice;
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

    public function getStripeInvoices($list_limit = '')
    {

        try {
            $stripe_invoice = $this->stripeClient->invoices->all(
                ['limit' => $list_limit]
            );

            return $stripe_invoice;
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

    public function getStripeClientInvoices($stripe_customer_id, $list_limit = 10)
    {
        try {
            if (empty($stripe_customer_id)) {
                $msg = 'Customer ID is required';
                $response = rest_ensure_response($msg);
                $response->set_status(404);

                return $response;
            }

            $invoices = $this->stripeClient->invoices->all(
                [
                    'customer' => $stripe_customer_id,
                    'limit' => $list_limit
                ],
            );

            return $invoices;
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

    public function updateStripeInvoice($stripe_invoice_id, $invoice_id)
    {
        try {
            $stripe_invoice = $this->stripeClient->invoices->update(
                $stripe_invoice_id,
                ['metadata' => ['invoice_id' => $invoice_id]]
            );

            return $stripe_invoice;
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

    public function finalizeInvoice($stripe_invoice_id)
    {
        try {
            $stripe_invoice = $this->stripeClient->invoices->finalizeInvoice(
                $stripe_invoice_id,
                ['expand' => ['payment_intent']]
            );

            return $stripe_invoice;
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
