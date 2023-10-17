<?php

namespace ORB_Products_Services\API;

use ORB_Products_Services\Email\EmailContact;
use ORB_Products_Services\Email\EmailSchedule;
use ORB_Products_Services\Email\EmailSupport;
use ORB_Products_Services\Email\EmailQuote;
use ORB_Products_Services\Email\EmailInvoice;
use ORB_Products_Services\Email\EmailOnboarding;
use ORB_Products_Services\Email\EmailReceipt;

use WP_REST_Request;

class Email
{
    private $stripeClient;
    private $mailer;

    public function __construct($stripeClient, $mailer)
    {
        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/email/contact', [
                'methods' => 'POST',
                'callback' => [$this, 'send_contact_email'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/email/support', [
                'methods' => 'POST',
                'callback' => [$this, 'send_support_email'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/email/schedule', [
                'methods' => 'POST',
                'callback' => [$this, 'send_schedule_email'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/email/quote/(?P<slug>[a-zA-Z0-9-_]+)', [
                'methods' => 'POST',
                'callback' => [$this, 'send_quote_email'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/email/invoice/(?P<slug>[a-zA-Z0-9-_]+)', [
                'methods' => 'POST',
                'callback' => [$this, 'send_invoice_email'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/email/receipt/(?P<slug>[a-zA-Z0-9-_]+)', [
                'methods' => 'POST',
                'callback' => [$this, 'send_receipt_email'],
                'permission_callback' => '__return_true',
            ]);
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/email/onboarding/(?P<slug>[a-zA-Z0-9-_]+)', [
                'methods' => 'POST',
                'callback' => [$this, 'send_onboarding_email'],
                'permission_callback' => '__return_true',
            ]);
        });

        $this->stripeClient = $stripeClient;
        $this->mailer = $mailer;
    }

    public function send_contact_email(WP_REST_Request $request)
    {
        $contact_email = new EmailContact($this->mailer);

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

        $contactEmail = $contact_email->sendContactEmail($firstName, $lastName, $fromEmail, $subject, $message);

        return rest_ensure_response($contactEmail);
    }


    public function send_support_email(WP_REST_Request $request)
    {
        $support_email = new EmailSupport($this->stripeClient, $this->mailer);

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

        $supportEmail = $support_email->sendSupportEmail($first_name, $last_name, $email, $subject, $message);

        return rest_ensure_response($supportEmail);
    }

    public function send_schedule_email(WP_REST_Request $request)
    {
        $schedule_email = new EmailSchedule($this->stripeClient, $this->mailer);

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

        $scheduleEmail = $schedule_email->sendScheduleEmail($first_name, $last_name, $email, $subject, $message);

        return rest_ensure_response($scheduleEmail);
    }

    public function send_quote_email(WP_REST_Request $request)
    {
        $quote_email = new EmailQuote($this->stripeClient, $this->mailer);
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

        $quoteEmail = $quote_email->sendQuoteEmail($stripe_quote_id);

        return rest_ensure_response($quoteEmail);
    }

    public function send_invoice_email(WP_REST_Request $request)
    {
        $invoice_email = new EmailInvoice($this->stripeClient, $this->mailer);
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

        $invoiceEmail = $invoice_email->sendInvoiceEmail($stripe_invoice_id);

        return rest_ensure_response($invoiceEmail);
    }

    public function send_receipt_email(WP_REST_Request $request)
    {
        $receipt_email = new EmailReceipt($this->stripeClient, $this->mailer);

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

        $receiptEmail = $receipt_email->sendReceiptEmail($stripe_invoice_id);

        return rest_ensure_response($receiptEmail);
    }

    public function send_onboarding_email(WP_REST_Request $request)
    {
        $onboarding_email = new EmailOnboarding($this->stripeClient, $this->mailer);

        $stripe_invoice_id = $request->get_param('slug');

        $project_name = $request['project_name'];

        if (empty($stripe_invoice_id)) {
            $msg = 'Stripe Invoice ID is required';
        }

        if (empty($project_name)) {
            $msg = 'Project name is required';
        }

        if (isset($msg)) {
            $message = array(
                'message' => $msg,
            );
            $response = rest_ensure_response($message);
            $response->set_status(400);
            return $response;
        }

        $onboardingEmail = $onboarding_email->sendOnboardingEmail($stripe_invoice_id, $project_name);

        return rest_ensure_response($onboardingEmail);
    }
}
