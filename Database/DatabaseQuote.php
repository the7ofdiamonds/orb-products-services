<?php

namespace ORB_Services\Database;

class DatabaseQuote
{
    private $wpdb;
    private $table_name;

    public function __construct()
    {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->table_name = 'orb_quote';
    }

    public function saveQuote($quote, $selections)
    {

        if (empty($selections)) {
            $msg = 'Selections are required';
            $message = array(
                'message' => $msg,
            );
            $response = rest_ensure_response($message);
            $response->set_status(404);

            return $response;
        }

        $serialized_selections = json_encode($selections);

        $amount_subtotal = intval($quote->amount_subtotal) / 100;
        $amount_discount = intval($quote->computed->upfront->amount_discount) / 100;
        $amount_shipping = intval($quote->computed->upfront->amount_shipping) / 100;
        $amount_tax = intval($quote->computed->upfront->amount_tax) / 100;
        $amount_total = intval($quote->amount_total) / 100;

        $result = $this->wpdb->insert(
            $this->table_name,
            [
                'stripe_customer_id' => $quote->customer,
                'stripe_quote_id' => $quote->id,
                'status' => $quote->status,
                'expires_at' => $quote->expires_at,
                'selections' => $serialized_selections,
                'amount_subtotal' => $amount_subtotal,
                'amount_discount' => $amount_discount,
                'amount_shipping' => $amount_shipping,
                'amount_tax' => $amount_tax,
                'amount_total' => $amount_total
            ]
        );

        if (!$result) {
            $msg = $this->wpdb->last_error;
            $message = array(
                'message' => $msg,
            );
            $response = rest_ensure_response($message);
            $response->set_status(404);

            return $response;
        }

        return $result;
    }

    public function getQuote($stripe_quote_id)
    {
        if (empty($stripe_quote_id)) {
            $msg = 'No Invoice ID was provided.';

            return $msg;
        }

        $quote = $this->wpdb->get_row(
            $this->wpdb->prepare(
                "SELECT * FROM . $this->table_name . WHERE stripe_quote_id = %s",
                $stripe_quote_id
            )
        );

        if (!$quote) {
            $msg = 'Quote not found';

            return $msg;
        }

        $data = [
            'id' => $quote->id,
            'created_at' => $quote->created_at,
            'status' => $quote->status,
            'stripe_customer_id' => $quote->stripe_customer_id,
            'quote_id' => $quote->quote_id,
            'stripe_invoice_id' => $quote->stripe_invoice_id,
            'payment_intent_id' => $quote->payment_intent_id,
            'client_secret' => $quote->client_secret,
            'due_date' => $quote->due_date,
            'subtotal' => $quote->subtotal,
            'tax' => $quote->tax,
            'amount_due' => $quote->amount_due,
            'amount_remaining' => $quote->amount_remaining
        ];

        return $data;
    }

    public function getQuoteByID($id)
    {
        $quote = $this->wpdb->get_row(
            $this->wpdb->prepare(
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

        return $data;
    }

    public function getQuotes()
    {
        $quotes = $this->wpdb->get_results(
            $this->wpdb->prepare(
                "SELECT * FROM orb_quote"
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

        return $quotes;
    }

    public function getClientQuotes($stripe_customer_id)
    {
        if (empty($stripe_customer_id)) {
            $msg = 'Invalid Stripe Customer ID';
            $message = array(
                'message' => $msg,
            );
            $response = rest_ensure_response($message);
            $response->set_status(404);

            return $response;
        }

        $quotes = $this->wpdb->get_results(
            $this->wpdb->prepare(
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

        return $quotes;
    }

    public function updateQuote($stripe_quote, $selections = '')
    {
        $serialized_selections = !empty($selections) ? json_encode($selections) : null;

        $amount_subtotal = !empty($stripe_quote->amount_subtotal) ? intval($stripe_quote->amount_subtotal) / 100 : null;
        $amount_discount = !empty($stripe_quote->computed->upfront->amount_discount) ? intval($stripe_quote->computed->upfront->amount_discount) / 100 : null;
        $amount_shipping = !empty($stripe_quote->computed->upfront->amount_shipping) ? intval($stripe_quote->computed->upfront->amount_shipping) / 100 : null;
        $amount_tax = !empty($stripe_quote->computed->upfront->amount_tax) ? intval($stripe_quote->computed->upfront->amount_tax) / 100 : null;
        $amount_total = !empty($stripe_quote->amount_total) ? intval($stripe_quote->amount_total) / 100 : null;

        $data = array();
        if (!empty($serialized_selections)) {
            $data['selections'] = $serialized_selections;
        }
        if (!empty($amount_subtotal)) {
            $data['amount_subtotal'] = $amount_subtotal;
        }
        if (!empty($amount_discount)) {
            $data['amount_discount'] = $amount_discount;
        }
        if (!empty($amount_shipping)) {
            $data['amount_shipping'] = $amount_shipping;
        }
        if (!empty($amount_tax)) {
            $data['amount_tax'] = $amount_tax;
        }
        if (!empty($amount_total)) {
            $data['amount_total'] = $amount_total;
        }

        $where = array(
            'stripe_quote_id' => $stripe_quote->id,
        );

        if (!empty($data)) {
            $updated = $this->wpdb->update($this->table_name, $data, $where);
        } else {
            $updated = 0;
        }

        if ($updated === false) {
            $error_message = $this->wpdb->last_error ?: 'Quote not found';
            $response = rest_ensure_response($error_message);
            $response->set_status(404);

            return $response;
        }

        return $updated;
    }

    public function updateQuoteStatus($stripe_quote_id, $status)
    {

        $data = array(
            'status' => $status,
        );
        $where = array(
            'stripe_quote_id' => $stripe_quote_id,
        );

        if (!empty($data)) {
            $updated = $this->wpdb->update($this->table_name, $data, $where);
        } else {
            $updated = 0;
        }

        if ($updated === false) {
            $error_message = $this->wpdb->last_error ?: 'Quote not found';
            $response = rest_ensure_response($error_message);
            $response->set_status(404);

            return $response;
        }

        return $updated;
    }
}
