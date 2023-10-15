<?php

namespace ORB_Services\API;

use Exception;

use WP_REST_Request;
use WP_Error;

use ORB_Services\API\Stripe\StripeQuote;
use ORB_Services\Database\DatabaseQuote;

use Stripe\Exception\ApiErrorException;

class Quote
{
    private $stripe_quote;
    private $database_quote;

    public function __construct($stripeClient)
    {
        $this->stripe_quote = new StripeQuote($stripeClient);
        $this->database_quote = new DatabaseQuote();

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/quote', array(
                'methods' => 'POST',
                'callback' => array($this, 'create_stripe_quote'),
                'permission_callback' => '__return_true',
            ));
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/quote/(?P<slug>[a-zA-Z0-9-_]+)', array(
                'methods' => 'POST',
                'callback' => array($this, 'get_quote'),
                'permission_callback' => '__return_true',
            ));
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/quote/(?P<slug>[a-zA-Z0-9-_]+)/id', array(
                'methods' => 'POST',
                'callback' => array($this, 'get_quote_by_id'),
                'permission_callback' => '__return_true',
            ));
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/stripe/quotes/(?P<slug>[a-zA-Z0-9-_]+)', array(
                'methods' => 'GET',
                'callback' => array($this, 'get_stripe_quote'),
                'permission_callback' => '__return_true',
            ));
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/quote/(?P<slug>[a-zA-Z0-9-_]+)', array(
                'methods' => 'PATCH',
                'callback' => array($this, 'update_quote'),
                'permission_callback' => '__return_true',
            ));
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/stripe/quotes/(?P<slug>[a-zA-Z0-9-_]+)', array(
                'methods' => 'POST',
                'callback' => array($this, 'update_stripe_quote'),
                'permission_callback' => '__return_true',
            ));
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/stripe/quotes/(?P<slug>[a-zA-Z0-9-_]+)/finalize', array(
                'methods' => 'POST',
                'callback' => [$this, 'finalize_quote'],
                'permission_callback' => '__return_true',
            ));
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/stripe/quotes/(?P<slug>[a-zA-Z0-9-_]+)/accept', array(
                'methods' => 'POST',
                'callback' => array($this, 'accept_quote'),
                'permission_callback' => '__return_true',
            ));
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/stripe/quotes/(?P<slug>[a-zA-Z0-9-_]+)/cancel', array(
                'methods' => 'POST',
                'callback' => array($this, 'cancel_quote'),
                'permission_callback' => '__return_true',
            ));
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/quote/(?P<slug>[a-zA-Z0-9-_]+)', array(
                'methods' => 'POST',
                'callback' => array($this, 'update_quote_status'),
                'permission_callback' => '__return_true',
            ));
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/quote/(?P<slug>[a-zA-Z0-9-_]+)/pdf', array(
                'methods' => 'GET',
                'callback' => array($this, 'pdf_quote'),
                'permission_callback' => '__return_true',
            ));
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/quotes', array(
                'methods' => 'GET',
                'callback' => array($this, 'get_quotes'),
                'permission_callback' => '__return_true',
            ));
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/quotes/client/(?P<slug>[a-zA-Z0-9-_]+)', array(
                'methods' => 'GET',
                'callback' => array($this, 'get_client_quotes'),
                'permission_callback' => '__return_true',
            ));
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/stripe/quotes', array(
                'methods' => 'GET',
                'callback' => array($this, 'get_stripe_quotes'),
                'permission_callback' => '__return_true',
            ));
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/stripe/quotes/(?P<slug>[a-zA-Z0-9-_]+)', array(
                'methods' => 'GET',
                'callback' => array($this, 'get_stripe_client_quotes'),
                'permission_callback' => '__return_true',
            ));
        });
    }

    public function create_stripe_quote(WP_REST_Request $request)
    {
        $request_body = $request->get_body();
        $body = json_decode($request_body, true);
        $stripe_customer_id = $body['stripe_customer_id'];
        $selections = $body['selections'];

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

        return rest_ensure_response($this->stripe_quote->createStripeQuote($stripe_customer_id, $selections));
    }

    public function get_quote(WP_REST_Request $request)
    {
        $stripe_quote_id = $request->get_param('slug');

        return rest_ensure_response($this->database_quote->getQuote($stripe_quote_id));
    }

    public function get_quote_by_id(WP_REST_Request $request)
    {
        $id = $request->get_param('slug');

        return rest_ensure_response($this->database_quote->getQuoteByID($id));
    }

    public function get_stripe_quote(WP_REST_Request $request)
    {
        $stripe_quote_id = $request->get_param('slug');

        return rest_ensure_response($this->stripe_quote->getStripeQuote($stripe_quote_id));
    }

    public function update_quote(WP_REST_Request $request)
    {
        $stripe_quote_id = $request->get_param('slug');
        $selections = $request['selections'];

        $stripe_quote = $this->stripe_quote->updateStripeQuote($stripe_quote_id, $selections);

        return rest_ensure_response($this->database_quote->updateQuote($stripe_quote, $selections));
    }

    public function update_quote_status(WP_REST_Request $request)
    {
        $stripe_quote_id = $request->get_param('slug');

        $quote = $this->stripe_quote->getStripeQuote($stripe_quote_id);

        return rest_ensure_response($this->database_quote->updateQuote($quote));
    }

    public function update_stripe_quote(WP_REST_Request $request)
    {
        $stripe_quote_id = $request->get_param('slug');
        $selections = $request['selections'];

        return rest_ensure_response($this->stripe_quote->updateStripeQuote($stripe_quote_id, $selections));
    }

    public function finalize_quote(WP_REST_Request $request)
    {
        $stripe_quote_id = $request->get_param('slug');
        $request_body = $request->get_body();
        $body = json_decode($request_body, true);
        $selections = $body['selections'];

        if (empty($selections)) {
            $msg = 'Selections are required';
            $message = array(
                'message' => $msg,
            );
            $response = rest_ensure_response($message);
            $response->set_status(404);

            return $response;
        }

        $quote = $this->stripe_quote->finalizeQuote($stripe_quote_id);

        $quote_id = $this->database_quote->saveQuote($quote, $selections);

        if ($quote_id) {
            $amount_subtotal = intval($quote->amount_subtotal) / 100;
            $amount_discount = intval($quote->computed->upfront->total_details->amount_discount) / 100;
            $amount_shipping = intval($quote->computed->upfront->total_details->amount_shipping) / 100;
            $amount_tax = intval($quote->computed->upfront->total_details->amount_tax) / 100;
            $amount_total = intval($quote->amount_total) / 100;

            $quote_saved = [
                'quote_id' => $quote_id,
                'stripe_customer_id' => $quote->customer,
                'stripe_quote_id' => $quote->id,
                'status' => $quote->status,
                'expires_at' => $quote->expires_at,
                'selections' => $selections,
                'amount_subtotal' => $amount_subtotal,
                'amount_discount' => $amount_discount,
                'amount_shipping' => $amount_shipping,
                'amount_tax' => $amount_tax,
                'amount_total' => $amount_total
            ];

            return rest_ensure_response($quote_saved);
        } else {

            return rest_ensure_response($quote_id);
        }
    }

    public function accept_quote(WP_REST_Request $request)
    {
        try {
            $stripe_quote_id = $request->get_param('slug');

            $accept_quote = $this->stripe_quote->acceptQuote($stripe_quote_id);
            $quoteUpdated = $this->database_quote->updateQuoteStatus($accept_quote->id, $accept_quote->status);

            if($quoteUpdated === 1){
            return rest_ensure_response($accept_quote);
        } else {
            throw new Exception('Quote could not be updated.', 404);
        }
    } catch (Exception $e) {

            $error_message = $e->getMessage();
            $status_code = $e->getCode();

            $response_data = [
                'message' => $error_message,
                'status' => $status_code
            ];

            $response = rest_ensure_response($response_data);
            $response->set_status($status_code);

            return $response;
        }
    }

    public function cancel_quote(WP_REST_Request $request)
    {
        $stripe_quote_id = $request->get_param('slug');

        $quote = $this->stripe_quote->cancelQuote($stripe_quote_id);

        return rest_ensure_response($this->database_quote->updateQuoteStatus($stripe_quote_id, $quote->status));
    }

    public function pdf_quote(WP_REST_Request $request)
    {
        try {
            // $pdf_data = '';

            // $stripe_quote_id = $request->get_param('slug');

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

    public function get_quotes(WP_REST_Request $request)
    {

        return rest_ensure_response($this->database_quote->getQuotes());
    }

    public function get_client_quotes(WP_REST_Request $request)
    {
        $stripe_customer_id = $request->get_param('slug');

        return rest_ensure_response($this->database_quote->getClientQuotes($stripe_customer_id));
    }

    public function get_stripe_quotes()
    {
        return rest_ensure_response($this->stripe_quote->getStripeQuotes());
    }

    public function get_stripe_client_quotes(WP_REST_Request $request)
    {
        $stripe_customer_id = $request->get_param('slug');

        if (empty($stripe_customer_id)) {
            $msg = 'Customer ID is required';
            $response = rest_ensure_response($msg);
            $response->set_status(404);

            return $response;
        }

        return rest_ensure_response($this->stripe_quote->getStripeClientQuotes($stripe_customer_id));
    }
}
