<?php

namespace ORB_Services\Database;

use Exception;

use Stripe\Quote;

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

    public function saveQuote(Quote $quote, $selections)
    {

        if (is_object($quote)) {
            $amount_subtotal = intval($quote->amount_subtotal) / 100;
            $amount_discount = intval($quote->computed->upfront->total_details->amount_discount) / 100;
            $amount_shipping = intval($quote->computed->upfront->total_details->amount_shipping) / 100;
            $amount_tax = intval($quote->computed->upfront->total_details->amount_tax) / 100;
            $amount_total = intval($quote->amount_total) / 100;
        } else {
            throw new Exception('A Quote is required to save.');
        }

        if (!empty($selections)) {
            $serialized_selections = json_encode($selections);
        } else {
            throw new Exception('Selections are required');
        }

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

        if ($result) {
            return $this->wpdb->insert_id;
        } else {
            $msg = $this->wpdb->last_error;
            throw new Exception($msg);
        }
    }

    public function getQuote($stripe_quote_id)
    {
        if (empty($stripe_quote_id)) {
            $msg = 'A Stripe Quote ID is required.';
            throw new Exception($msg);
        }

        $quote = $this->wpdb->get_row(
            $this->wpdb->prepare(
                "SELECT * FROM $this->table_name WHERE stripe_quote_id = %s",
                $stripe_quote_id
            )
        );

        if ($quote) {
            $data = [
                'id' => $quote->id,
                'created_at' => $quote->created_at,
                'status' => $quote->status,
                'stripe_customer_id' => $quote->stripe_customer_id,
                'stripe_quote_id' => $quote->stripe_quote_id,
                'expires_at' => $quote->expires_at,
                'selections' => $quote->selections,
                'amount_subtotal' => $quote->amount_subtotal,
                'amount_discount' => $quote->amount_discount,
                'amount_shipping' => $quote->amount_shipping,
                'amount_tax' => $quote->amount_tax,
                'amount_total' => $quote->amount_total
            ];

            return $data;
        } else {
            $msg = 'Stripe Quote ID ' . $stripe_quote_id . ' not found';
            throw new Exception($msg);
        }
    }

    public function getQuoteByID($id)
    {
        $quote = $this->wpdb->get_row(
            $this->wpdb->prepare(
                "SELECT * FROM $this->table_name WHERE id = %d",
                $id
            )
        );

        if ($quote) {
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
        } else {
            $msg = 'Quote with the ID' . $id . 'not found';
            throw new Exception($msg);
        }
    }

    public function getQuotes()
    {
        $quotes = $this->wpdb->get_results(
            $this->wpdb->prepare(
                "SELECT * FROM $this->table_name"
            )
        );

        if ($quotes) {
            return $quotes;
        } else {
            $msg = 'There are no quotes to display.';
            throw new Exception($msg);
        }
    }

    public function getClientQuotes($stripe_customer_id)
    {
        if (empty($stripe_customer_id)) {
            $msg = 'Invalid Stripe Customer ID is required.';
            throw new Exception($msg);
        }

        $quotes = $this->wpdb->get_results(
            $this->wpdb->prepare(
                "SELECT * FROM $this->table_name WHERE stripe_customer_id = %d",
                $stripe_customer_id
            )
        );

        if ($quotes) {
            return $quotes;
        } else {
            $msg = 'There are no quotes to display.';
            throw new Exception($msg);
        }
    }

    public function updateQuote(Quote $quote, $selections = '')
    {
        $data = array();

        if (is_object($quote)) {
            $amount_subtotal = !empty($quote->amount_subtotal) ? intval($quote->amount_subtotal) / 100 : null;
            $amount_discount = !empty($quote->computed->upfront->total_details->amount_discount) ? intval($quote->computed->upfront->total_details->amount_discount) / 100 : null;
            $amount_shipping = !empty($quote->computed->upfront->total_details->amount_shipping) ? intval($quote->computed->upfront->total_details->amount_shipping) / 100 : null;
            $amount_tax = !empty($quote->computed->upfront->total_details->amount_tax) ? intval($quote->computed->upfront->total_details->amount_tax) / 100 : null;
            $amount_total = !empty($quote->amount_total) ? intval($quote->amount_total) / 100 : null;

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
                'stripe_quote_id' => $quote->id,
            );
        } else {
            throw new Exception('A Quote is required to update.');
        }

        if (!empty($selections)) {
            $data['selections'] = $selections;
        }

        if (!empty($quote->id)) {
            $updated = $this->wpdb->update($this->table_name, $data, $where);
        }

        if ($updated) {
            return $updated;
        } else {
            $error_message = $this->wpdb->last_error ?: 'Quote not found';
            throw new Exception($error_message);
        }
    }

    public function updateQuoteStatus($stripe_quote_id, $status)
    {
        if (!empty($stripe_quote_id)) {
            $where = array(
                'stripe_quote_id' => $stripe_quote_id,
            );
        } else {
            throw new Exception('A Stripe Quote ID is required.', 400);
        }

        if (!empty($status)) {
            $data = array(
                'status' => $status,
            );
        } else {
            throw new Exception('A status is required.', 400);
        }

        $updated = $this->wpdb->update($this->table_name, $data, $where);

        if ($updated) {
            return $updated;
        } else {
            $error_message = $this->wpdb->last_error;
            throw new Exception($error_message, 404);
        }
    }
}
