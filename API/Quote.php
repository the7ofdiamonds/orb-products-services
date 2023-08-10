<?php

namespace ORB_Services\API;

use WP_REST_Request;

use Stripe\Exception\ApiErrorException;
use Stripe\Exception\InvalidRequestException;
use WP_Error;

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
            register_rest_route('orb/v1', '/quote/(?P<slug>[a-zA-Z0-9-_]+)/id', array(
                'methods' => 'GET',
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
        try {
            $stripe_customer_id = $request['stripe_customer_id'];
            $selections = $request['selections'];
            //Create option in the quote admin section
            // $tax_enabled = get_option('orb_automatic_tax_enabled');

            if (empty($stripe_customer_id)) {
                $msg = 'Customer ID is required';
                $response = rest_ensure_response($msg);
                $response->set_status(404);

                return $response;
            }

            if (empty($selections)) {
                $msg = 'Selections are required';
                $response = rest_ensure_response($msg);
                $response->set_status(404);

                return $response;
            }

            // if (empty($tax_enabled)) {
            //     $tax_enabled = 'false';
            // }

            $line_items = [];

            foreach ($selections as $selection) {
                $price_id = $selection['price_id'];

                $line_items[] = [
                    'price' => $price_id
                ];
            }

            $stripe_quote = $this->stripeClient->quotes->create([
                //Add to quote admin section collection_method & days until due make default automatic tax
                // 'automatic_tax' => [
                //     'enabled' => $tax_enabled,
                // ],
                'collection_method' => 'send_invoice',
                'invoice_settings' => [
                    'days_until_due' => 7
                ],
                'customer' => $stripe_customer_id,
                //Needs to get line items from selections
                'line_items' => $line_items,
            ]);

            return rest_ensure_response($stripe_quote);
        } catch (InvalidRequestException $e) {
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

    public function get_quote(WP_REST_Request $request)
    {
        $stripe_quote_id = $request->get_param('slug');

        global $wpdb;

        $quote = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM orb_quote WHERE stripe_quote_id = %d",
                $stripe_quote_id
            )
        );

        if (!$quote) {
            $msg = 'Quote not found';
            $response = rest_ensure_response($msg);
            $response->set_status(404);

            return $response;
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

        return rest_ensure_response($data);
    }

    public function get_quote_by_id(WP_REST_Request $request)
    {
        $id = $request->get_param('slug');

        global $wpdb;

        $quote = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM orb_quote WHERE id = %d",
                $id
            )
        );

        if (!$quote) {
            $msg = 'Quote not found';
            $response = rest_ensure_response($msg);
            $response->set_status(404);

            return $response;
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
        try {
            $stripe_quote_id = $request->get_param('slug');

            $quote = $this->stripeClient->quotes->retrieve(
                $stripe_quote_id,
                []
            );

            return rest_ensure_response($quote);
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

    public function update_quote(WP_REST_Request $request)
    {
        try {
            $stripe_quote_id = $request->get_param('slug');
            $selections = $request['selections'];

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

            $serialized_selections = json_encode($selections);
            $amount_subtotal = intval($stripe_quote->amount_subtotal) / 100;
            $amount_discount = intval($stripe_quote->computed->upfront->amount_discount) / 100;
            $amount_shipping = intval($stripe_quote->computed->upfront->amount_shipping) / 100;
            $amount_tax = intval($stripe_quote->computed->upfront->amount_tax) / 100;
            $amount_total = intval($stripe_quote->amount_total) / 100;

            global $wpdb;

            $table_name = 'orb_quote';
            $data = array(
                'selections' => $serialized_selections,
                'mount_subtotal' => $amount_subtotal,
                'amount_discount' => $amount_discount,
                'amount_shipping' => $amount_shipping,
                'amount_tax' => $amount_tax,
                'amount_total' => $amount_total
            );
            $where = array(
                'stripe_quote_id' => $stripe_quote_id,
            );

            $updated = $wpdb->update($table_name, $data, $where);

            if ($updated === false) {
                $error_message = $wpdb->last_error ?: 'Quote not found';
                $response = rest_ensure_response($error_message);
                $response->set_status(404);

                return $response;
            }

            return rest_ensure_response($selections);
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

    public function update_quote_status(WP_REST_Request $request)
    {
        try {
            $stripe_quote_id = $request->get_param('slug');

            $quote = $this->stripeClient->quotes->retrieve(
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
                $response = rest_ensure_response($error_message);
                $response->set_status(404);

                return $response;
            }

            return rest_ensure_response($quote->status);
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

    public function update_stripe_quote(WP_REST_Request $request)
    {
        try {
            $stripe_quote_id = $request->get_param('slug');
            $selections = $request['selections'];

            $line_items = [];

            foreach ($selections as $selection) {
                $price_id = $selection['price_id'];

                $line_items[] = [
                    'price' => $price_id
                ];
            }

            $quote = $this->stripeClient->quotes->update(
                $stripe_quote_id,
                [
                    'line_items' => $line_items
                ]
            );

            return rest_ensure_response($quote);
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

    public function finalize_quote(WP_REST_Request $request)
    {
        try {
            $stripe_quote_id = $request->get_param('slug');
            $selections = $request['selections'];

            $stripe_quote = $this->stripeClient->quotes->finalizeQuote(
                $stripe_quote_id,
                []
            );

            global $wpdb;

            $serialized_selections = json_encode($selections);

            $amount_subtotal = intval($stripe_quote->amount_subtotal) / 100;
            $amount_discount = intval($stripe_quote->computed->upfront->amount_discount) / 100;
            $amount_shipping = intval($stripe_quote->computed->upfront->amount_shipping) / 100;
            $amount_tax = intval($stripe_quote->computed->upfront->amount_tax) / 100;
            $amount_total = intval($stripe_quote->amount_total) / 100;

            $table_name = 'orb_quote';
            $result = $wpdb->insert(
                $table_name,
                [
                    'stripe_customer_id' => $stripe_quote->customer,
                    'stripe_quote_id' => $stripe_quote->id,
                    'status' => $stripe_quote->status,
                    'selections' => $serialized_selections,
                    'amount_subtotal' => $amount_subtotal,
                    'amount_discount' => $amount_discount,
                    'amount_shipping' => $amount_shipping,
                    'amount_tax' => $amount_tax,
                    'amount_total' => $amount_total
                ]
            );

            if (!$result) {
                $error_message = $wpdb->last_error;
                $response = rest_ensure_response($error_message);

                return $response;
            }

            $quote_id = $wpdb->insert_id;
            $inserted_row = $wpdb->get_row($wpdb->prepare("SELECT * FROM $table_name WHERE id = %d", $quote_id));
            $response = rest_ensure_response($inserted_row);

            return $response;
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

    public function accept_quote(WP_REST_Request $request)
    {
        try {
            $stripe_quote_id = $request->get_param('slug');

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
                $response = rest_ensure_response($error_message);
                $response->set_status(404);

                return $response;
            }

            return rest_ensure_response($quote->status);
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

    public function cancel_quote(WP_REST_Request $request)
    {
        try {
            $stripe_quote_id = $request->get_param('slug');

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
                $response = rest_ensure_response($error_message);
                $response->set_status(404);

                return $response;
            }

            return rest_ensure_response($quote->status);
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

    public function pdf_quote(WP_REST_Request $request)
    {
        try {
            // $pdf_data = '';

            $stripe_quote_id = $request->get_param('slug');

            // $this->stripeClient->quotes->pdf($quote_id, function ($chunk) use (&$pdf_data) {
            //     $pdf_data .= $chunk;
            // });
            // $myfile = fopen("/tmp/tmp.pdf", "w");

            $pdf = $this->stripeClient->quotes->pdf($stripe_quote_id, function ($chunk) use (&$myfile) {
                fwrite($myfile, $chunk);
            });

            fclose($myfile);
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
            $msg = 'Invalid Stripe Customer ID';
            $message = array(
                'message' => $msg,
            );
            $response = rest_ensure_response($message);
            $response->set_status(404);

            return $response;
        }

        global $wpdb;

        $quotes = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM orb_quote WHERE stripe_customer_id = %d",
                $stripe_customer_id
            )
        );

        if (!$quotes) {
            $msg = 'There are no quotes to display.';
            $message = array(
                'message' => $msg,
            );
            $response = rest_ensure_response($message);
            $response->set_status(404);

            return $response;
        }

        return rest_ensure_response($quotes);
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

    public function get_stripe_client_quotes(WP_REST_Request $request)
    {
        try {
            $stripe_customer_id = $request->get_param('slug');

            if (empty($stripe_customer_id)) {
                $msg = 'Customer ID is required';
                $response = rest_ensure_response($msg);
                $response->set_status(404);

                return $response;
            }
            $quotes = $this->stripeClient->quotes->all(
                [
                    'customer' => $stripe_customer_id,
                    //Add limit to quote admin section
                    'limit' => 100
                ],
            );

            return rest_ensure_response($quotes);
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
