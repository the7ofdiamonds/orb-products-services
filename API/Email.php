<?php

namespace ORB_Services\API;

use WP_REST_Request;

class Email
{
    private $contact_email;
    private $support_email;
    private $schedule_email;
    private $quote_email;
    private $invoice_email;
    private $receipt_email;

    private $invoice_table;

    private $stripe_invoice;

    public function __construct(
        $contact_email,
        $support_email,
        $schedule_email,
        $quote_email,
        $invoice_email,
        $receipt_email
    ) {
        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/email/contact', [
                'methods' => 'POST',
                'callback' => [$this, 'send_contact_email'],
                'permission_callback' => '__return_true',
            ]);
        });
        $this->contact_email = $contact_email;

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/email/support', [
                'methods' => 'POST',
                'callback' => [$this, 'send_support_email'],
                'permission_callback' => '__return_true',
            ]);
        });
        $this->support_email = $support_email;

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/email/schedule', [
                'methods' => 'POST',
                'callback' => [$this, 'send_schedule_email'],
                'permission_callback' => '__return_true',
            ]);
        });
        $this->schedule_email = $schedule_email;
    }

    public function send_contact_email(WP_REST_Request $request)
    {
        $from_email = $request['email'];
        $first_name = $request['first_name'];
        $last_name = $request['first_name'];
        $subject = $request['subject'];
        $message = $request['message'];

        if (empty($from_email)) {
            $msg = 'Email is required';
        } elseif (empty($first_name)) {
            $msg = 'First name is required';
        } elseif (empty($last_name)) {
            $msg = 'Last name is required';
        } elseif (empty($subject)) {
            $msg = 'Subject is required';
        } elseif (empty($message)) {
            $msg = 'Message is required';
        }

        if (isset($msg)) {
            $message = array(
                'message' => $msg,
            );
            $response = rest_ensure_response($message);
            $response->set_status(400);
            return $response;
        }

        $from_email = sanitize_email($from_email);
        $first_name = sanitize_text_field($first_name);
        $last_name = sanitize_text_field($last_name);
        $subject = sanitize_text_field($subject);
        $message = sanitize_textarea_field($message);

        $contactEmail = $this->contact_email->sendContactEmail($from_email, $first_name, $subject, $message);

        return rest_ensure_response($contactEmail);
    }


    public function send_support_email(WP_REST_Request $request)
    {
        $from_email = $request['email'];
        $first_name = $request['first_name'];
        $last_name = $request['first_name'];
        $subject = $request['subject'];
        $message = $request['message'];

        if (empty($from_email)) {
            $msg = 'Email is required';
        } elseif (empty($first_name)) {
            $msg = 'First name is required';
        } elseif (empty($last_name)) {
            $msg = 'Last name is required';
        } elseif (empty($subject)) {
            $msg = 'Subject is required';
        } elseif (empty($message)) {
            $msg = 'Message is required';
        }

        if (isset($msg)) {
            $message = array(
                'message' => $msg,
            );
            $response = rest_ensure_response($message);
            $response->set_status(400);
            return $response;
        }

        $from_email = sanitize_email($from_email);
        $first_name = sanitize_text_field($first_name);
        $last_name = sanitize_text_field($last_name);
        $subject = sanitize_text_field($subject);
        $message = sanitize_textarea_field($message);

        $supportEmail = $this->support_email->sendSupportEmail($from_email, $first_name, $subject, $message);

        return rest_ensure_response($supportEmail);
    }

    public function send_schedule_email(WP_REST_Request $request)
    {
        $from_email = $request['email'];
        $first_name = $request['first_name'];
        $last_name = $request['first_name'];
        $subject = $request['subject'];
        $message = $request['message'];

        if (empty($from_email)) {
            $msg = 'Email is required';
        } elseif (empty($first_name)) {
            $msg = 'First name is required';
        } elseif (empty($last_name)) {
            $msg = 'Last name is required';
        } elseif (empty($subject)) {
            $msg = 'Subject is required';
        } elseif (empty($message)) {
            $msg = 'Message is required';
        }

        if (isset($msg)) {
            $message = array(
                'message' => $msg,
            );
            $response = rest_ensure_response($message);
            $response->set_status(400);
            return $response;
        }

        $from_email = sanitize_email($from_email);
        $first_name = sanitize_text_field($first_name);
        $last_name = sanitize_text_field($last_name);
        $subject = sanitize_text_field($subject);
        $message = sanitize_textarea_field($message);

        $supportEmail = $this->schedule_email->sendScheduleEmail($from_email, $first_name, $subject, $message);

        return rest_ensure_response($supportEmail);
    }

    public function send_quote_email()
    {
    }

    public function send_invoice_email(WP_REST_Request $request)
    {
        $stripe_invoice_id = $request->get_param('slug');

        $invoice = $this->invoice_table->getInvoice($stripe_invoice_id);
        $stripe_invoice = $this->stripe_invoice->getInvoice($stripe_invoice_id);

        $to_email = $stripe_invoice->customer_email;
        $invoice_title = 'Invoice #' . $invoice['id'];
        $name = $stripe_invoice->customer_name;
        $to_name = $name;

        $subject = $invoice_title . ' for ' . $name;

        $message = '<pre>' . $stripe_invoice . '</pre>';

        if ($stripe_invoice->status === 'paid' || $stripe_invoice->status === 'open') {
            $path = $stripe_invoice->invoice_pdf;
            $attachment_name = $invoice_title . '.pdf';
        }

        return $this->invoice_email->sendInvoiceEmail($to_email, $to_name, $subject, $message, $path, $attachment_name);
    }

    public function send_receipt_email()
    {
    }
}
