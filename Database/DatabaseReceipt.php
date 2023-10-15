<?php

namespace ORB_Services\Database;

use Exception;

class DatabaseReceipt
{
    private $wpdb;
    private $table_name;

    public function __construct()
    {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->table_name = 'orb_receipt';
    }

    public function saveReceipt($invoice_id, $stripe_invoice, $payment_method_id, $payment_method, $first_name, $last_name, $charges)
    {
        $result = $this->wpdb->insert(
            $this->table_name,
            [
                'invoice_id' => $invoice_id,
                'stripe_invoice_id' => $stripe_invoice->id,
                'stripe_customer_id' => $stripe_invoice->customer,
                'payment_method_id' => $payment_method_id,
                'amount_paid' => intval($stripe_invoice->amount_paid) / 100,
                'payment_date' => $stripe_invoice->status_transitions['paid_at'],
                'balance' => intval($stripe_invoice->amount_remaining) / 100,
                'payment_method' => $payment_method,
                'first_name' => $first_name,
                'last_name' => $last_name,
                'receipt_pdf_url' => $charges->receipt_url
            ]
        );

        if (!$result) {
            $error_message = $this->wpdb->last_error;
            $status_code = 404;

            $response_data = [
                'message' => $error_message,
                'status' => $status_code
            ];

            $response = rest_ensure_response($response_data);
            $response->set_status($status_code);

            return $response;
        }

        $receipt_id = $this->wpdb->insert_id;

        return $receipt_id;
    }

    public function getReceipt($stripe_invoice_id, $stripe_customer_id)
    {
        if (empty($stripe_invoice_id)) {
            $msg = 'No Stripe Invoice ID was provided.';
            throw new Exception($msg);
        }

        if (empty($stripe_customer_id)) {
            $msg = 'No Stripe Customer ID was provided.';
            throw new Exception($msg);
        }

        $receipt = $this->wpdb->get_row(
            $this->wpdb->prepare(
                "SELECT * FROM {$this->table_name} WHERE stripe_invoice_id = %s AND stripe_customer_id = %s",
                $stripe_invoice_id,
                $stripe_customer_id
            )
        );

        if (!$receipt) {
            $msg = 'Receipt not found';

            return $msg;
        }

        $data = [
            'id' => $receipt->id,
            'created_at' => $receipt->created_at,
            'stripe_customer_id' => $receipt->stripe_customer_id,
            'stripe_invoice_id' => $receipt->stripe_invoice_id,
            'payment_method_id' => $receipt->payment_method_id,
            'amount_paid' => $receipt->amount_paid,
            'payment_date' => $receipt->payment_date,
            'balance' => $receipt->balance,
            'payment_method' => $receipt->payment_method,
            'first_name' => $receipt->first_name,
            'last_name' => $receipt->last_name,
            'receipt_pdf_url' => $receipt->receipt_pdf_url,
            'invoice_id' => $receipt->invoice_id
        ];

        return $data;
    }

    public function getReceiptByID($id, $stripe_customer_id)
    {
        $receipt = $this->wpdb->get_row(
            $this->wpdb->prepare(
                "SELECT * FROM {$this->table_name} WHERE id = %d AND stripe_customer_id = %s",
                $id,
                $stripe_customer_id
            )
        );

        if ($receipt) {
            $receipt_data = [
                'id' => $receipt->id,
                'created_at' => $receipt->created_at,
                'stripe_invoice_id' => $receipt->stripe_invoice_id,
                'stripe_customer_id' => $receipt->stripe_customer_id,
                'payment_method_id' => $receipt->payment_method_id,
                'amount_paid' => $receipt->amount_paid,
                'payment_date' => $receipt->payment_date,
                'balance' => $receipt->balance,
                'payment_method' => $receipt->payment_method,
                'first_name' => $receipt->first_name,
                'last_name' => $receipt->last_name,
            ];

            return $receipt_data;
        } else {
            throw new Exception('Receipt with the ID ' . $id . 'was not found');
        }
    }

    public function getClientReceipt($id, $stripe_customer_id)
    {
        $receipt = $this->wpdb->get_row(
            $this->wpdb->prepare(
                "SELECT * FROM {$this->table_name} WHERE id = %d AND stripe_customer_id = %s",
                $id,
                $stripe_customer_id
            )
        );

        if (!$receipt) {
            return rest_ensure_response('Receipt not found');
        }

        $receipt_data = [
            'id' => $receipt->id,
            'created_at' => $receipt->created_at,
            'stripe_invoice_id' => $receipt->stripe_invoice_id,
            'stripe_customer_id' => $receipt->stripe_customer_id,
            'payment_method_id' => $receipt->payment_method_id,
            'amount_paid' => $receipt->amount_paid,
            'payment_date' => $receipt->payment_date,
            'balance' => $receipt->balance,
            'payment_method' => $receipt->payment_method,
            'first_name' => $receipt->first_name,
            'last_name' => $receipt->last_name,
        ];

        return $receipt_data;
    }

    public function getClientReceipts($stripe_customer_id)
    {
        $receipts = $this->wpdb->get_results(
            $this->wpdb->prepare(
                "SELECT * FROM {$this->table_name} WHERE stripe_customer_id = %s",
                $stripe_customer_id
            )
        );

        if (!$receipts) {
            $msg = 'There are no receipts to display.';
            $message = array(
                'message' => $msg,
            );
            $response = rest_ensure_response($message);
            $response->set_status(404);

            return $response;
        }

        return $receipts;
    }

    public function getReceipts()
    {
        $receipts = $this->wpdb->get_results(
            $this->wpdb->prepare("SELECT * FROM . $this->table_name")
        );

        if (!$receipts) {
            return rest_ensure_response('receipts_not_found', 'There are no receipts', array('status' => 404));
        }

        return $receipts;
    }
}
