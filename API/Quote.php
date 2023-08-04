<?php

namespace ORB_Services\API;

use WP_REST_Request;

use Stripe\Exception\ApiErrorException;

class Quote
{
    private $stripeClient;

    public function __construct($stripeClient)
    {
        $this->stripeClient = $stripeClient;

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/quote', array(
                'methods' => 'POST',
                'callback' => array($this, 'create_quote'),
                'permission_callback' => '__return_true',
            ));
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/quote/(?P<slug>[a-zA-Z0-9-_]+)', array(
                'methods' => 'GET',
                'callback' => array($this, 'get_quote'),
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
                'methods' => 'POST',
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
                'callback' => array($this, 'finalize_quote'),
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
            register_rest_route('orb/v1', '/quotes/(?P<slug>[a-zA-Z0-9-_]+)', array(
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

    public function create_quote(WP_REST_Request $request)
    {
        $stripe_customer_id = $request['stripe_customer_id'];
        $selections = $request['selections'];
        //Create option in the quote admin section
        $tax_enabled = get_option('orb_automatic_tax_enabled');

        if (empty($stripe_customer_id)) {
            return rest_ensure_response('Customer ID is required');
        }

        if (empty($selections)) {
            return rest_ensure_response('Selections are required');
        }

        if (empty($tax_enabled)) {
            $tax_enabled = 'true';
        }

        $line_items = [];

        foreach ($selections as $selection) {
            $price_id = $selection['price_id'];

            $line_items[] = [
                'price' => $price_id
            ];
        }

        try {
            $stripe_quote = $this->stripeClient->quotes->create([
                //Add to quote admin section collection_method & days until due make default automatic tax
                'automatic_tax' => [
                    'enabled' => $tax_enabled,
                ],
                'collection_method' => 'send_invoice',
                'invoice_settings' => [
                    'days_until_due' => 7
                ],
                'customer' => $stripe_customer_id,
                //Needs to get line items from selections
                'line_items' => $line_items,
            ]);

            //Save to database
            global $wpdb;

            $serialized_selections = json_encode($selections);

            $table_name = 'orb_quote';
            $result = $wpdb->insert(
                $table_name,
                [
                    'stripe_customer_id' => $stripe_customer_id,
                    'stripe_quote_id' => $stripe_quote->id,
                    'status' => $stripe_quote->status,
                    'selections' => $serialized_selections,
                    'amount_subtotal' => $stripe_quote->amount_subtotal,
                    'amount_discount' => $stripe_quote->computed->upfront->amount_discount,
                    'amount_shipping' => $stripe_quote->computed->upfront->amount_shipping,
                    'amount_tax' => $stripe_quote->computed->upfront->amount_tax,
                    'amount_total' => $stripe_quote->amount_total
                ]
            );

            if (!$result) {
                $error_message = $wpdb->last_error;
                return rest_ensure_response($error_message);
            }

            $quote_id = $wpdb->insert_id;

            return rest_ensure_response($quote_id, 200);
        } catch (ApiErrorException $e) {
            return rest_ensure_response($e->getMessage(), 500);
        }
    }

    public function get_quote(WP_REST_Request $request)
    {
        $id = $request->get_param('slug');

        if (empty($id)) {
            return rest_ensure_response('invalid_quote_id', 'Invalid invoice ID', array('status' => 400));
        }

        global $wpdb;

        $quote = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM orb_quote WHERE id = %d",
                $id
            )
        );

        if (!$quote) {
            return rest_ensure_response('quote_not_found', 'Quote not found', array('status' => 404));
        }

        $data = [
            'id' => $quote->id,
            'created_at' => $quote->created_at,
            'status' => $quote->status,
            'stripe_customer_id' => $quote->stripe_customer_id,
            'stripe_quote_id' => $quote->stripe_quote_id,
            'selections' => json_decode($quote->selections, true),
            'amount_subtotal' => $quote->amount_subtotal,
            'amount_discount' => $quote->amount_discount,
            'amount_shipping' => $quote->amount_shipping,
            'amount_tax' => $quote->amount_tax,
            'amount_total' => $quote->amount_total
        ];

        return rest_ensure_response($data, 200);
    }


    public function get_stripe_quote(WP_REST_Request $request)
    {
        $quote_id = $request->get_param('slug');

        try {
            $quote = $this->stripeClient->quotes->retrieve(
                $quote_id,
                []
            );
            return rest_ensure_response($quote);
        } catch (ApiErrorException $e) {
            return rest_ensure_response($e);
        }
    }

    public function update_quote(WP_REST_Request $request)
    {
        $stripe_quote_id = $request->get_param('slug');
        $selections = $request['selections'];

        $line_items = [];

        foreach ($selections as $selection) {
            $price_id = $selection['price_id'];

            $line_items[] = [
                'price' => $price_id
            ];
        }

        try {
            $this->stripeClient->quotes->update(
                $stripe_quote_id,
                //Needs data to update
                [
                    'line_items' => $line_items
                ]
            );

            $serialized_selections = json_encode($selections);

            global $wpdb;

            $table_name = 'orb_quote';
            $data = array(
                'selections' => $serialized_selections,
            );
            $where = array(
                'stripe_quote_id' => $stripe_quote_id,
            );

            $updated = $wpdb->update($table_name, $data, $where);

            if ($updated === false) {
                $error_message = $wpdb->last_error ?: 'Quote not found';
                return rest_ensure_response('quote_not_found', $error_message, array('status' => 404));
            }

            return rest_ensure_response($selections);
        } catch (ApiErrorException $e) {
            return rest_ensure_response($e);
        }
    }

    public function update_stripe_quote(WP_REST_Request $request)
    {
        //Update
        $quote_id = $request->get_param('slug');
        $selections = $request['selections'];

        $line_items = [];

        foreach ($selections as $selection) {
            $price_id = $selection['price_id'];

            $line_items[] = [
                'price' => $price_id
            ];
        }

        try {
            $quote = $this->stripeClient->quotes->update(
                $quote_id,
                //Needs data to update
                [
                    'line_items' => $line_items
                ]
            );

            return rest_ensure_response($quote);
        } catch (ApiErrorException $e) {
            return rest_ensure_response($e);
        }
    }

    public function finalize_quote(WP_REST_Request $request)
    {
        $stripe_quote_id = $request->get_param('slug');
        
        try {
            $quote = $this->stripeClient->quotes->finalizeQuote(
                $stripe_quote_id,
                []
            );

            global $wpdb;

            $table_name = 'orb_quote';
            $data = array(
                'status' => $quote->status,
            );
            $where = array(
                'stripe_quote_id' => $stripe_quote_id,
            );

            $updated = $wpdb->update($table_name, $data, $where);

            if ($updated === false) {
                $error_message = $wpdb->last_error ?: 'Quote not found';
                return rest_ensure_response('quote_not_found', $error_message, array('status' => 404));
            }

            return rest_ensure_response($quote->status);
        } catch (ApiErrorException $e) {
            return rest_ensure_response($e);
        }
    }

    public function accept_quote(WP_REST_Request $request)
    {
        $stripe_quote_id = $request->get_param('slug');

        try {
            $quote = $this->stripeClient->quotes->accept(
                $stripe_quote_id,
                []
            );

            global $wpdb;

            $table_name = 'orb_quote';
            $data = array(
                'status' => $quote->status,
            );
            $where = array(
                'stripe_quote_id' => $stripe_quote_id,
            );

            $updated = $wpdb->update($table_name, $data, $where);

            if ($updated === false) {
                $error_message = $wpdb->last_error ?: 'Quote not found';
                return rest_ensure_response('quote_not_found', $error_message, array('status' => 404));
            }

            return rest_ensure_response($quote->status);
        } catch (ApiErrorException $e) {
            return rest_ensure_response($e);
        }
    }

    public function cancel_quote(WP_REST_Request $request)
    {
        $stripe_quote_id = $request->get_param('slug');

        try {
            $quote = $this->stripeClient->quotes->cancel(
                $stripe_quote_id,
                []
            );

            global $wpdb;

            $table_name = 'orb_quote';
            $data = array(
                'status' => $quote->status,
            );
            $where = array(
                'stripe_quote_id' => $stripe_quote_id,
            );

            $updated = $wpdb->update($table_name, $data, $where);

            if ($updated === false) {
                $error_message = $wpdb->last_error ?: 'Quote not found';
                return rest_ensure_response('quote_not_found', $error_message, array('status' => 404));
            }

            return rest_ensure_response($quote->status);
        } catch (ApiErrorException $e) {
            return rest_ensure_response($e);
        }
    }

    public function pdf_quote(WP_REST_Request $request)
    {
        try {
            $pdf_data = '';

            $quote_id = $request->get_param('slug');

            $this->stripeClient->quotes->pdf($quote_id, function ($chunk) use (&$pdf_data) {
                $pdf_data .= $chunk;
            });

            header('Content-Type: application/pdf');
            header('Content-Disposition: inline; filename="quote.pdf"');

            echo $pdf_data;

            return rest_ensure_response($pdf_data);
        } catch (ApiErrorException $e) {
            return rest_ensure_response($e);
        }
    }

    public function get_quotes(WP_REST_Request $request)
    {
        global $wpdb;

        $quotes = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM orb_quote",
            )
        );

        return rest_ensure_response($quotes, 200);
    }

    public function get_client_quotes(WP_REST_Request $request)
    {
        $stripe_customer_id = $request->get_param('slug');

        if (empty($stripe_customer_id)) {
            return rest_ensure_response('invalid_stripe_customer_id', 'Invalid Stripe Customer ID', array('status' => 400));
        }

        global $wpdb;

        $quotes = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM orb_quote WHERE stripe_customer_id = %d",
                $stripe_customer_id
            )
        );

        if (!$quotes) {
            return rest_ensure_response('invoice_not_found', 'Invoice not found', array('status' => 404));
        }

        return rest_ensure_response($quotes, 200);
    }

    public function get_stripe_quotes()
    {
        try {
            $quotes = $this->stripeClient->quotes->all(
                [
                    //Add limit to quote admin section
                    'limit' => 100
                ],
            );

            return rest_ensure_response($quotes);
        } catch (ApiErrorException $e) {
            return rest_ensure_response($e);
        }
    }

    public function get_stripe_client_quotes(WP_REST_Request $request)
    {
        $customer_id = $request->get_param('slug');

        try {
            $quotes = $this->stripeClient->quotes->all(
                [
                    'customer' => $customer_id,
                    //Add limit to quote admin section
                    'limit' => 100
                ],
            );

            return rest_ensure_response($quotes);
        } catch (ApiErrorException $e) {
            return rest_ensure_response($e);
        }
    }
}
