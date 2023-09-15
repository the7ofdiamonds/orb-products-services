<?php

namespace ORB_Services\Email;

use Exception;

use ORB_Services\Database\DatabaseQuote;
use ORB_Services\API\Stripe\StripeQuote;

use PHPMailer\PHPMailer\Exception as PHPMailerException;

class EmailQuote
{
    private $database_quote;
    private $stripe_quote;
    private $email;
    private $billing;
    private $billingType;
    private $billingNumberPrefix;
    private $pdf;
    private $mailer;
    private $smtp_host;
    private $smtp_port;
    private $smtp_secure;
    private $smtp_auth;
    private $smtp_username;
    private $smtp_password;
    private $from_email;
    private $from_name;

    public function __construct($stripeClient, $mailer)
    {
        $this->smtp_host = get_option('quote_smtp_host');
        $this->smtp_port = get_option('quote_smtp_port');
        $this->smtp_secure = get_option('quote_smtp_secure');
        $this->smtp_auth = get_option('quote_smtp_auth');
        $this->smtp_username = get_option('quote_smtp_username');
        $this->smtp_password = get_option('quote_smtp_password');
        $this->from_email = get_option('quote_email');
        $this->from_name = get_option('quote_name');

        $this->database_quote = new DatabaseQuote();
        $this->stripe_quote = new StripeQuote($stripeClient);
        $this->email = new Email();
        $this->billing = new EmailBilling($stripeClient);
        $this->billingType = 'QUOTE';
        $this->billingNumberPrefix = 'QT';
        $this->mailer = $mailer;
        // $this->pdf = $pdf;
    }

    function quoteEmailBody($stripe_quote_id, $billingNumber)
    {
        $databaseQuote = $this->database_quote->getQuote($stripe_quote_id);
        $stripeQuote = $this->stripe_quote->getStripeQuote($databaseQuote['stripe_quote_id']);

        $header = $this->email->emailHeader();
        $bodyHeader = $this->billing->billingHeader($this->billingType, $billingNumber, $stripeQuote);
        $bodyBody = $this->billing->billingBody($stripeQuote->line_items);
        $bodyFooter = $this->billing->billingFooter($stripeQuote);
        $footer = $this->email->emailFooter();

        $fullEmailBody = $header . $bodyHeader . $bodyBody . $bodyFooter . $footer;

        return $fullEmailBody;
    }

    function sendQuoteEmail($stripe_quote_id)
    {
        try {
            $databaseQuote = $this->database_quote->getQuote($stripe_quote_id);
            $stripeQuote = $this->stripe_quote->getStripeQuote($databaseQuote['stripe_quote_id']);

            $to_email = $stripeQuote->customer->email;
            $billingNumber = $this->billingNumberPrefix . $databaseQuote['id'];
            $name = $stripeQuote->customer->name;
            $to_name = $name;

            $subject = $billingNumber . ' for ' . $name;

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
            $this->mailer->Body = $this->quoteEmailBody($stripe_quote_id, $billingNumber, $stripeQuote);
            $this->mailer->AltBody = '<pre>' . $stripeQuote . '</pre>';

            // Make the body the pdf
            // if ($stripeQuote->status === 'paid' || $stripeQuote->status === 'open') {
            //     $path = $stripeQuote->quote_pdf;
            //     $attachment_name = $quote_number . '.pdf';
            // }

            // if (isset($path) && isset($attachment_name)) {
            //     $this->mailer->addAttachment($path, $attachment_name, 'base64', 'application/pdf');
            // }

            if ($this->mailer->send()) {
                return ['message' => 'Message has been sent'];
            } else {
                throw new PHPMailerException("Message could not be sent. Mailer Error: {$this->mailer->ErrorInfo}");
            }
        } catch (Exception $e) {
            error_log($e->getMessage());
            return $e->getMessage();
        }
    }
}
