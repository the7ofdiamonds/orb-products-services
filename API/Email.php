<?php

namespace ORB_Services\API;

use WP_REST_Request;

use ORB_Services\Email\EmailContact;
use ORB_Services\Email\EmailSupport;
use ORB_Services\Email\EmailQuote;
use ORB_Services\Email\EmailInvoice;
use ORB_Services\Email\EmailReceipt;

use ORB_Services\Database\DatabaseQuote;
use ORB_Services\Database\DatabaseInvoice;
use ORB_Services\Database\DatabaseReceipt;

use ORB_Services\API\Stripe\StripeInvoice;

class Email
{
    private $email_contact;
    private $email_support;
    private $email_quote;
    private $email_invoice;
    private $email_receipt;

    private $invoice_table;

    private $stripe_invoice;

    public function __construct(
        $stripe_quote,
        $stripe_invoice,
    ) {
        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/email/contact', [
                'methods' => 'POST',
                'callback' => [$this, 'sendContact'],
                'permission_callback' => '__return_true',
            ]);
        });
        $this->email_contact = new EmailContact;

        // $this->email_support = new EmailSupport();

        // add_action('rest_api_init', function () {
        //     register_rest_route('orb/v1', '/email/invoice/(?P<slug>[a-zA-Z0-9-_]+)', [
        //         'methods' => 'GET',
        //         'callback' => [$this, 'sendInvoice'],
        //         'permission_callback' => '__return_true',
        //     ]);
        // });
        // $this->quote_table = new DatabaseQuote();
        // $this->stripe_quote = $stripe_quote;
        // $this->email_quote = new EmailQuote();

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/email/invoice/(?P<slug>[a-zA-Z0-9-_]+)', [
                'methods' => 'GET',
                'callback' => [$this, 'sendInvoice'],
                'permission_callback' => '__return_true',
            ]);
        });
        $this->invoice_table = new DatabaseInvoice();
        $this->stripe_invoice = $stripe_invoice;
        $this->email_invoice = new EmailInvoice;

        // $this->email_receipt = new EmailReceipt();
    }

    public function sendContact(WP_REST_Request $request)
    {
        $from_email = $request['contact_email'];
        $from_name = $request['contact_name'];
        $subject = $request['contact_subject'];
        $message = $request['contact_message'];

        return $this->email_contact->sendContactEmail($from_email, $from_name, $subject, $message);
    }

    public function sendQuote()
    {
    }

    public function sendInvoice(WP_REST_Request $request)
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

        return $this->email_invoice->sendInvoiceEmail($to_email, $to_name, $subject, $message, $path, $attachment_name);
    }

    public function sendReceipt()
    {
    }
}
