<?php

namespace ORB_Products_Services\API\Stripe;

use ORB_Products_Services\Admin\AdminStripe;

use Stripe\Exception\ApiErrorException;

class StripeQuote
{
    private $stripeClient;
    private $adminStripe;
    private $expires_at;

    public function __construct($stripeClient)
    {
        $this->stripeClient = $stripeClient;

        $this->adminStripe = new AdminStripe;
        $this->expires_at = $this->adminStripe->days_until_expires_timestamp();
    }

    public function createStripeQuote($stripe_customer_id, $selections, $quote_id = '', $tax_enabled = false, $expires_at = 1697760000, $days_until_due = 7)
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
                'expires_at' => $this->expires_at ? $this->expires_at : $expires_at,
                'invoice_settings' => [
                    'days_until_due' => $days_until_due
                ],
                'customer' => $stripe_customer_id,
                'line_items' => $line_items,
                'metadata' => ['quote_id' => $quote_id]
            ]);

            return $stripe_quote;
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

    public function getStripeQuote($stripe_quote_id)
    {

        try {
            if (empty($stripe_quote_id)) {
                $msg = 'Stripe Customer ID is required';
                $message = array(
                    'message' => $msg,
                );
                $response = rest_ensure_response($message);
                $response->set_status(404);

                return $response;
            }

            $quote = $this->stripeClient->quotes->retrieve(
                $stripe_quote_id,
                ['expand' => ['customer', 'invoice.subscription', 'line_items']]
            );

            return $quote;
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

    public function updateStripeQuote($stripe_quote_id, $selections)
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

            $stripe_quote = $this->stripeClient->quotes->update(
                $stripe_quote_id,
                [
                    'line_items' => $line_items
                ]
            );

            return $stripe_quote;
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

    public function finalizeQuote($stripe_quote_id)
    {
        try {
            $stripe_quote = $this->stripeClient->quotes->finalizeQuote(
                $stripe_quote_id,
                []
            );

            return $stripe_quote;
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

    public function acceptQuote($stripe_quote_id)
    {
        try {
            $quote = $this->stripeClient->quotes->accept(
                $stripe_quote_id,
                []
            );

            return $quote;
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

    public function cancelQuote($stripe_quote_id)
    {
        try {
            $quote = $this->stripeClient->quotes->cancel(
                $stripe_quote_id,
                []
            );

            return $quote->status;
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

    public function pdf_quote($stripe_quote_id)
    {
        try {
            // $pdf_data = '';

            // $this->stripeClient->quotes->pdf($quote_id, function ($chunk) use (&$pdf_data) {
            //     $pdf_data .= $chunk;
            // });
            // $myfile = fopen("/tmp/tmp.pdf", "w");

            // $pdf = $this->stripeClient->quotes->pdf($stripe_quote_id, function ($chunk) use (&$myfile) {
            //     fwrite($myfile, $chunk);
            // });

            // fclose($myfile);
            // header('Content-Type: application/pdf');
            // header('Content-Disposition: inline; filename="quote.pdf"');

            // echo $pdf_data;

            // return rest_ensure_response($pdf_data);
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

    public function getStripeQuotes($list_limit = 10)
    {
        try {
            $quotes = $this->stripeClient->quotes->all(
                [
                    'limit' => $list_limit
                ],
            );

            return $quotes;
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

    public function getStripeClientQuotes($stripe_customer_id, $list_limit = 10)
    {
        try {
            if (empty($stripe_customer_id)) {
                $msg = 'Customer ID is required';
                $response = rest_ensure_response($msg);
                $response->set_status(404);

                return $response;
            }

            $quotes = $this->stripeClient->quotes->all(
                [
                    'customer' => $stripe_customer_id,
                    'limit' => $list_limit
                ],
            );

            return $quotes;
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
