<?php

namespace ORB_Services\Email;

use PHPMailer\PHPMailer\Exception;

class EmailInvoice
{
    private $mailer;
    private $stripe_invoice;
    private $database_invoice;
    private $smtp_host;
    private $smtp_port;
    private $smtp_secure;
    private $smtp_auth;
    private $smtp_username;
    private $smtp_password;
    private $from_email;
    private $from_name;

    public function __construct($mailer, $stripe_invoice, $database_invoice)
    {
        $this->mailer = $mailer;
        $this->stripe_invoice = $stripe_invoice;
        $this->database_invoice = $database_invoice;

        $this->smtp_host = get_option('invoice_smtp_host');
        $this->smtp_port = get_option('invoice_smtp_port');
        $this->smtp_secure = get_option('invoice_smtp_secure');
        $this->smtp_auth = get_option('invoice_smtp_auth');
        $this->smtp_username = get_option('invoice_smtp_username');
        $this->smtp_password = get_option('invoice_smtp_password');
        $this->from_email = get_option('invoice_email');
        $this->from_name = get_option('invoice_name');
    }

    public function sendInvoiceEmail($stripe_invoice_id)
    {
        $databaseInvoice = $this->database_invoice->getInvoice($stripe_invoice_id);
        $stripeInvoice = $this->stripe_invoice->getStripeInvoice($databaseInvoice['stripe_invoice_id']);

        $to_email = $stripeInvoice->customer_email;
        $invoice_title = 'Invoice #' . $databaseInvoice['id'];
        $name = $stripeInvoice->customer_name;
        $to_name = $name;

        $subject = $invoice_title . ' for ' . $name;

        $message = '<pre>' . $stripeInvoice . '</pre>';

        if ($stripeInvoice->status === 'paid' || $stripeInvoice->status === 'open') {
            $path = $stripeInvoice->invoice_pdf;
            $attachment_name = $invoice_title . '.pdf';
        }

        $body = '<p>' . $message . '</p>';
        $alt_body = $message;

        try {
            $this->mailer->isSMTP();
            $this->mailer->SMTPAuth = $this->smtp_auth;
            $this->mailer->Host = $this->smtp_host;
            $this->mailer->SMTPSecure = $this->smtp_secure;
            $this->mailer->Port = $this->smtp_port;

            $this->mailer->Username = $this->smtp_username;
            $this->mailer->Password = $this->smtp_password;

            $this->mailer->setFrom($this->from_email, $this->from_name);
            $this->mailer->addAddress($to_email, $to_name);

            $this->mailer->isHTML(true);
            $this->mailer->Subject = $subject;
            $this->mailer->Body = $body;
            $this->mailer->AltBody = $alt_body;

            if (isset($path) && isset($attachment_name)) {

                $this->mailer->addAttachment($path, $attachment_name, 'base64', 'application/pdf');
            }

            if ($this->mailer->send()) {
                return ['message' => 'Message has been sent'];
            } else {
                throw new Exception("Message could not be sent. Mailer Error: {$this->mailer->ErrorInfo}");
            }
        } catch (Exception $e) {
            error_log($e->getMessage());
            return ['error' => $e->getMessage()];
        }
    }
}
