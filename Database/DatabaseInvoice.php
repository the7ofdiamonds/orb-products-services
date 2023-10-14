<?php

namespace ORB_Services\Database;

use Exception;

class DatabaseInvoice
{
    private $wpdb;
    private $table_name;

    public function __construct()
    {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->table_name = 'orb_invoice';
    }

    public function saveInvoice($stripe_invoice, $quote_id)
    {
        if (is_object($stripe_invoice) && property_exists($stripe_invoice, 'object') && $stripe_invoice->object === 'invoice') {
            $subtotal = intval($stripe_invoice->subtotal) / 100;
            $tax = intval($stripe_invoice->tax) / 100;
            $amount_due = intval($stripe_invoice->amount_due) / 100;
        } else {
            throw new Exception('An Invoice is needed to save.');
        }

        if (empty($quote_id)) {
            throw new Exception('A Quote ID is required.');
        }

        $result = $this->wpdb->insert(
            $this->table_name,
            [
                'status' => $stripe_invoice->status,
                'stripe_customer_id' => $stripe_invoice->customer,
                'quote_id' => $quote_id,
                'stripe_invoice_id' => $stripe_invoice->id,
                'due_date' => $stripe_invoice->due_date,
                'subtotal' => $subtotal,
                'tax' => $tax,
                'amount_due' => $amount_due
            ]
        );

        if ($result) {
            return $this->wpdb->insert_id;
        } else {
            $error_message = $this->wpdb->last_error;
            throw new Exception($error_message);
        }
    }

    public function getInvoice($stripe_invoice_id)
    {
        if (empty($stripe_invoice_id)) {
            $msg = 'No Invoice ID was provided.';
            throw new Exception($msg);
        }

        $invoice = $this->wpdb->get_row(
            $this->wpdb->prepare(
                "SELECT * FROM {$this->table_name} WHERE stripe_invoice_id = %s",
                $stripe_invoice_id
            )
        );

        if ($invoice) {
            $data = [
                'id' => $invoice->id,
                'created_at' => $invoice->created_at,
                'status' => $invoice->status,
                'stripe_customer_id' => $invoice->stripe_customer_id,
                'quote_id' => $invoice->quote_id,
                'stripe_invoice_id' => $invoice->stripe_invoice_id,
                'payment_intent_id' => $invoice->payment_intent_id,
                'client_secret' => $invoice->client_secret,
                'due_date' => $invoice->due_date,
                'subtotal' => $invoice->subtotal,
                'tax' => $invoice->tax,
                'amount_due' => $invoice->amount_due,
                'amount_remaining' => $invoice->amount_remaining
            ];

            return $data;
        } else {
            $msg = 'Invoice not found';
            throw new Exception($msg);
        }
    }

    public function getInvoiceByID($id)
    {
        if (empty($id)) {
            $msg = 'No Invoice ID was provided.';
            throw new Exception($msg);
        }

        global $wpdb;

        $invoice = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM {$this->table_name} WHERE id = %d",
                $id
            )
        );

        if ($invoice) {
            $data = [
                'id' => $invoice->id,
                'created_at' => $invoice->created_at,
                'status' => $invoice->status,
                'stripe_customer_id' => $invoice->stripe_customer_id,
                'quote_id' => $invoice->quote_id,
                'stripe_invoice_id' => $invoice->stripe_invoice_id,
                'payment_intent_id' => $invoice->payment_intent_id,
                'client_secret' => $invoice->client_secret,
                'due_date' => $invoice->due_date,
                'subtotal' => $invoice->subtotal,
                'tax' => $invoice->tax,
                'amount_due' => $invoice->amount_due,
                'amount_remaining' => $invoice->amount_remaining
            ];

            return $data;
        } else {
            $msg = 'Invoice not found';
            throw new Exception($msg);
        }
    }

    public function getInvoices()
    {
        $invoices = $this->wpdb->get_results(
            $this->wpdb->prepare("SELECT * FROM . $this->table_name")
        );

        if ($invoices) {
            return $invoices;
        } {
            $msg = 'invoice_not_found';
            throw new Exception($msg);
        }
    }

    public function getClientInvoices($stripe_customer_id)
    {
        if (empty($stripe_customer_id)) {
            $msg = 'Stripe Customer ID is required';
            throw new Exception($msg);
        }

        $invoices = $this->wpdb->get_results(
            $this->wpdb->prepare(
                "SELECT * FROM {$this->table_name} WHERE stripe_customer_id = %s",
                $stripe_customer_id
            )
        );

        if ($invoices) {
            return $invoices;
        } else {
            $msg = 'There are no invoices to display.';
            throw new Exception($msg);
        }
    }


    public function updateInvoice($stripe_invoice)
    {
        if (is_object($stripe_invoice) && property_exists($stripe_invoice, 'object') && $stripe_invoice->object === 'invoice') {

            $payment_intent = $stripe_invoice->payment_intent;

            $status = $stripe_invoice->status;
            $payment_intent_id = $payment_intent->id;
            $client_secret = $payment_intent->client_secret;
            $due_date = $stripe_invoice->due_date;
            $amount_due = intval($stripe_invoice->amount_due) / 100;
            $subtotal = intval($stripe_invoice->subtotal) / 100;
            $tax = intval($stripe_invoice->tax) / 100;
            $amount_remaining = intval($stripe_invoice->amount_remaining) / 100;

            $data = array(
                'status' => $status,
                'payment_intent_id' => $payment_intent_id,
                'client_secret' => $client_secret,
                'status' => $status,
                'due_date' => $due_date,
                'amount_due' => $amount_due,
                'subtotal' => $subtotal,
                'tax' => $tax,
                'amount_remaining' => $amount_remaining,
            );
            $where = array(
                'stripe_invoice_id' => $stripe_invoice->id,
            );
        } else {
            throw new Exception('An invoice is required to update.');
        }

        $updated = $this->wpdb->update($this->table_name, $data, $where);

        if ($updated) {
            return $updated;
        } else {
            $error_message = $this->wpdb->last_error ?: 'Invoice not found';
            throw new Exception($error_message);
        }
    }

    public function updateInvoiceStatus($stripe_invoice_id, $status)
    {
        if (!empty($status)) {
            $data = array(
                'status' => $status
            );
        } else {
            throw new Exception('A status is required.');
        }

        if (!empty($stripe_invoice_id)) {
            $where = array(
                'stripe_invoice_id' => $stripe_invoice_id,
            );
        } else {
            throw new Exception('A Stripe Invoice ID is required.');
        }

        $updated = $this->wpdb->update($this->table_name, $data, $where);

        if ($updated) {
            return $updated;
        } else {
            $error_message = $this->wpdb->last_error ?: 'Invoice not found';
            throw new Exception($error_message);
        }
    }
}
