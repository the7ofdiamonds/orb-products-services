<?php

namespace ORB_Services\Database;

class DatabaseInvoice
{
    private $wpdb;
    private $table_name;

    public function __construct($wpdb)
    {
        $this->wpdb = $wpdb;
        $this->table_name = 'orb_invoice';
    }

    public function saveInvoice($stripe_invoice, $quote_id)
    {
        $subtotal = intval($stripe_invoice->subtotal) / 100;
        $tax = intval($stripe_invoice->tax) / 100;
        $amount_due = intval($stripe_invoice->amount_due) / 100;

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

        if (!$result) {
            $error_message = $this->wpdb->last_error;
            $response = rest_ensure_response($error_message);
            $response->set_status(404);

            return $response;
        }

        $invoice_id = $this->wpdb->insert_id;

        return $invoice_id;
    }

    public function getInvoice($stripe_invoice_id)
    {
        if (empty($stripe_invoice_id)) {
            $msg = 'No Invoice ID was provided.';

            return $msg;
        }

        $invoice = $this->wpdb->get_row(
            $this->wpdb->prepare(
                "SELECT * FROM {$this->table_name} WHERE stripe_invoice_id = %s",
                $stripe_invoice_id
            )
        );

        if (!$invoice) {
            $msg = 'Invoice not found';

            return $msg;
        }

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
    }

    public function getInvoiceByID($id)
    {
        if (empty($id)) {
            $msg = 'No Invoice ID was provided.';
            $response = rest_ensure_response($msg);
            $response->set_status(404);

            return $response;
        }

        global $wpdb;

        $invoice = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM {$this->table_name} WHERE id = %d",
                $id
            )
        );

        if (!$invoice) {
            $msg = 'Invoice not found';
            $response = rest_ensure_response($msg);
            $response->set_status(404);

            return $response;
        }

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
            'selections' => json_decode($invoice->selections, true),
            'subtotal' => $invoice->subtotal,
            'tax' => $invoice->tax,
            'amount_due' => $invoice->amount_due,
            'amount_remaining' => $invoice->amount_remaining
        ];

        $response = rest_ensure_response($data);
        $response->set_status(200);

        return $response;
    }

    public function getInvoices()
    {
        $invoices = $this->wpdb->get_results(
            $this->wpdb->prepare("SELECT * FROM . $this->table_name")
        );

        if (!$invoices) {
            return rest_ensure_response('invoice_not_found', 'Invoice not found', array('status' => 404));
        }

        return $invoices;
    }

    public function getClientInvoices($stripe_customer_id)
    {
        if (empty($stripe_customer_id)) {
            $msg = 'Stripe Customer ID is required';
            $response = array(
                'error' => $msg,
            );
            return rest_ensure_response($response)->set_status(400);
        }
    
        $invoices = $this->wpdb->get_results(
            $this->wpdb->prepare(
                "SELECT * FROM {$this->table_name} WHERE stripe_customer_id = %s",
                $stripe_customer_id
            )
        );
    
        if (!$invoices) {
            $msg = 'There are no invoices to display.';
            $response = array(
                'message' => $msg,
            );
            return rest_ensure_response($response)->set_status(404);
        }
    
        // You can return a JSON response with the invoices
        return rest_ensure_response($invoices);
    }
    

    public function updateInvoice($stripe_invoice)
    {
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

        $updated = $this->wpdb->update($this->table_name, $data, $where);

        if ($updated === false) {
            $error_message = $this->wpdb->last_error ?: 'Invoice not found';
            return rest_ensure_response('invoice_not_found', $error_message, array('status' => 404));
        }

        return $updated;
    }

    public function updateInvoiceStatus($stripe_invoice_id, $status)
    {
        $data = array(
            'status' => $status
        );
        $where = array(
            'stripe_invoice_id' => $stripe_invoice_id,
        );

        $updated = $this->wpdb->update($this->table_name, $data, $where);

        if ($updated === false) {
            $error_message = $this->wpdb->last_error ?: 'Invoice not found';
            return rest_ensure_response('invoice_not_found', $error_message, array('status' => 404));
        }

        return $updated;
    }
}
