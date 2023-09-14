<?php

namespace ORB_Services\API;

use ORB_Services\Email\EmailQuote;

use WP_REST_Request;

class Email
{
    private $contact_email;
    private $support_email;
    private $schedule_email;
    private $quote_email;
    private $invoice_email;
    private $receipt_email;

    public function __construct($stripeClient, $mailer) {
        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/email/contact', [
                'methods' => 'POST',
                'callback' => [$this, 'send_contact_email'],
                'permission_callback' => '__return_true',
            ]);
        });
        // $this->contact_email = $contact_email;

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/email/support', [
                'methods' => 'POST',
                'callback' => [$this, 'send_support_email'],
                'permission_callback' => '__return_true',
            ]);
        });
        // $this->support_email = $support_email;

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/email/schedule', [
                'methods' => 'POST',
                'callback' => [$this, 'send_schedule_email'],
                'permission_callback' => '__return_true',
            ]);
        });
        // $this->schedule_email = $schedule_email;

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/email/quote/(?P<slug>[a-zA-Z0-9-_]+)', [
                'methods' => 'POST',
                'callback' => [$this, 'send_quote_email'],
                'permission_callback' => '__return_true',
            ]);
        });
        $this->quote_email = new EmailQuote($stripeClient, $mailer);

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/email/invoice/(?P<slug>[a-zA-Z0-9-_]+)', [
                'methods' => 'POST',
                'callback' => [$this, 'send_invoice_email'],
                'permission_callback' => '__return_true',
            ]);
        });
        // $this->invoice_email = $invoice_email;

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/email/receipt/(?P<slug>[a-zA-Z0-9-_]+)', [
                'methods' => 'POST',
                'callback' => [$this, 'send_receipt_email'],
                'permission_callback' => '__return_true',
            ]);
        });
        // $this->receipt_email = $receipt_email;
    }

    public function send_contact_email(WP_REST_Request $request)
    {
        $from_email = $request['email'];
        $first_name = $request['first_name'];
        $last_name = $request['last_name'];
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

        $fromEmail = sanitize_email($from_email);
        $firstName = sanitize_text_field($first_name);
        $lastName = sanitize_text_field($last_name);
        $subject = sanitize_text_field($subject);
        $message = sanitize_textarea_field($message);

        $contactEmail = $this->contact_email->sendContactEmail($firstName, $lastName, $fromEmail, $subject, $message);

        return rest_ensure_response($contactEmail);
    }


    public function send_support_email(WP_REST_Request $request)
    {
        $email = $request['email'];
        $first_name = $request['first_name'];
        $last_name = $request['first_name'];
        $subject = $request['subject'];
        $message = $request['message'];

        if (empty($email)) {
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

        $email = sanitize_email($email);
        $first_name = sanitize_text_field($first_name);
        $last_name = sanitize_text_field($last_name);
        $subject = sanitize_text_field($subject);
        $message = sanitize_textarea_field($message);

        $supportEmail = $this->support_email->sendSupportEmail($first_name, $last_name, $email, $subject, $message);

        return rest_ensure_response($supportEmail);
    }

    public function send_schedule_email(WP_REST_Request $request)
    {
        $email = $request['email'];
        $first_name = $request['first_name'];
        $last_name = $request['last_name'];
        $subject = $request['subject'];
        $message = $request['message'];

        if (empty($email)) {
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

        $email = sanitize_email($email);
        $first_name = sanitize_text_field($first_name);
        $last_name = sanitize_text_field($last_name);
        $subject = sanitize_text_field($subject);
        $message = sanitize_textarea_field($message);

        $scheduleEmail = $this->schedule_email->sendScheduleEmail($first_name, $last_name, $email, $subject, $message);

        return rest_ensure_response($scheduleEmail);
    }

    public function send_quote_email(WP_REST_Request $request)
    {
        $stripe_quote_id = $request->get_param('slug');

        if (empty($stripe_quote_id)) {
            $msg = 'Quote ID is required';
        }

        if (isset($msg)) {
            $message = array(
                'message' => $msg,
            );
            $response = rest_ensure_response($message);
            $response->set_status(400);
            return $response;
        }

        $quoteEmail = $this->quote_email->sendQuoteEmail($stripe_quote_id);

        return rest_ensure_response($quoteEmail);
    }

    public function send_invoice_email(WP_REST_Request $request)
    {
        $stripe_invoice_id = $request->get_param('slug');

        if (empty($stripe_invoice_id)) {
            $msg = 'Invoice ID is required';
        }

        if (isset($msg)) {
            $message = array(
                'message' => $msg,
            );
            $response = rest_ensure_response($message);
            $response->set_status(400);
            return $response;
        }

        $invoiceEmail = $this->invoice_email->sendInvoiceEmail($stripe_invoice_id);

        return rest_ensure_response($invoiceEmail);
    }

    public function send_receipt_email(WP_REST_Request $request)
    {
        $stripe_invoice_id = $request->get_param('slug');

        if (empty($stripe_invoice_id)) {
            $msg = 'Invoice ID is required';
        }

        if (isset($msg)) {
            $message = array(
                'message' => $msg,
            );
            $response = rest_ensure_response($message);
            $response->set_status(400);
            return $response;
        }

        $receiptEmail = $this->receipt_email->sendReceiptEmail($stripe_invoice_id);

        return rest_ensure_response($receiptEmail);
    }
}
