<?php

namespace ORB_Services\API;

use WP_REST_Request;

use ORB_Services\API\Stripe\StripeInvoice;
use ORB_Services\API\Stripe\StripeCharges;
use ORB_Services\API\Stripe\StripePaymentIntents;
use ORB_SERVICES\Database\DatabaseReceipt;

use Stripe\Exception\ApiErrorException;

class Receipt
{
    private $stripe_invoice;
    private $stripe_payment_intent;
    private $stripe_charges;
    private $database_receipt;
    private $email;

    public function __construct($stripeClient)
    {
        $this->stripe_invoice = new StripeInvoice($stripeClient);
        $this->stripe_payment_intent = new StripePaymentIntents($stripeClient);
        $this->stripe_charges = new StripeCharges($stripeClient);
        $this->database_receipt = new DatabaseReceipt($stripeClient);

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/receipt', [
                'methods' => 'POST',
                'callback' => [$this, 'save_receipt'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/receipt/(?P<slug>[a-z0-9-_]+)', [
                'methods' => 'POST',
                'callback' => [$this, 'get_receipt'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/receipt/(?P<slug>[a-z0-9-_]+)/id', [
                'methods' => 'POST',
                'callback' => [$this, 'get_receipt_by_id'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/receipts/client/(?P<slug>[a-z0-9-_]+)', [
                'methods' => 'GET',
                'callback' => [$this, 'get_client_receipts'],
                'permission_callback' => '__return_true',
            ]);
        });
    }

    public function save_receipt(WP_REST_Request $request)
    {
        try {
            $stripe_customer_id = $request['stripe_customer_id'];
            $invoice_id = $request['invoice_id'];
            $stripe_invoice_id = $request['stripe_invoice_id'];
            $payment_method = $request['payment_method'];
            $first_name = $request['first_name'];
            $last_name = $request['last_name'];

            $stripe_invoice = $this->stripe_invoice->getStripeInvoice(
                $stripe_invoice_id,
                []
            );

            if ($stripe_customer_id !== $stripe_invoice->customer) {
                $error_message = 'This is not the customer for this transaction.';
                $status_code = 404;

                $response_data = [
                    'message' => $error_message,
                    'status' => $status_code
                ];

                $response = rest_ensure_response($response_data);
                $response->set_status($status_code);

                return $response;
            };

            $payment_intent_id = $stripe_invoice->payment_intent;

            $payment_intent = $this->stripe_payment_intent->getPaymentIntent($payment_intent_id);

            $payment_method_id = $payment_intent->payment_method;
            $charge_id = $payment_intent->latest_charge;

            $charges = $this->stripe_charges->getCharge($charge_id);

            $receipt_id = $this->database_receipt->saveReceipt($invoice_id, $stripe_invoice, $payment_method_id, $payment_method, $first_name, $last_name, $charges);

            return rest_ensure_response($receipt_id);
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

    function get_receipt(WP_REST_Request $request)
    {
        $stripe_invoice_id = $request->get_param('slug');
        $stripe_customer_id = $request['stripe_customer_id'];

        if (empty($stripe_customer_id)) {
            $msg = 'Stripe Customer ID is required.';
            $message = array(
                'message' => $msg,
            );
            $response = rest_ensure_response($message);
            $response->set_status(404);

            return $response;
        }

        $receipt = $this->database_receipt->getReceipt($stripe_invoice_id, $stripe_customer_id);

        return rest_ensure_response($receipt);
    }

    function get_receipt_by_id(WP_REST_Request $request)
    {
        $id = $request->get_param('slug');
        $stripe_customer_id = $request['stripe_customer_id'];

        if (empty($stripe_customer_id)) {
            $msg = 'Stripe Customer ID is required.';
            $message = array(
                'message' => $msg,
            );
            $response = rest_ensure_response($message);
            $response->set_status(404);

            return $response;
        }

        $receipt = $this->database_receipt->getReceiptByID($id, $stripe_customer_id);
        error_log(print_r($receipt, true));
        return rest_ensure_response($receipt);
    }

    function get_client_receipts(WP_REST_Request $request)
    {
        $stripe_customer_id = $request->get_param('slug');

        if (empty($stripe_customer_id)) {
            $msg = 'Invalid Stripe Customer ID';
            $message = array(
                'message' => $msg,
            );
            $response = rest_ensure_response($message);
            $response->set_status(404);

            return $response;
        }

        $receipts = $this->database_receipt->getClientReceipts($stripe_customer_id);

        return rest_ensure_response($receipts);
    }
}
