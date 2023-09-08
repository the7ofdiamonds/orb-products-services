<?php

namespace ORB_Services\Email;

use PHPMailer\PHPMailer\Exception;

class EmailQuote
{
    private $mailer;
    private $stripe_quote;
    private $database_quote;
    private $stripe_customers;
    private $smtp_host;
    private $smtp_port;
    private $smtp_secure;
    private $smtp_auth;
    private $smtp_username;
    private $smtp_password;
    private $from_email;
    private $from_name;

    public function __construct($database_quote, $stripe_quote, $stripe_customers, $mailer)
    {
        $this->mailer = $mailer;
        $this->stripe_quote = $stripe_quote;
        $this->database_quote = $database_quote;
        $this->stripe_customers = $stripe_customers;

        $this->smtp_host = get_option('quote_smtp_host');
        $this->smtp_port = get_option('quote_smtp_port');
        $this->smtp_secure = get_option('quote_smtp_secure');
        $this->smtp_auth = get_option('quote_smtp_auth');
        $this->smtp_username = get_option('quote_smtp_username');
        $this->smtp_password = get_option('quote_smtp_password');
        $this->from_email = get_option('quote_email');
        $this->from_name = get_option('quote_name');
    }

    public function sendQuoteEmail($stripe_quote_id)
    {
        $databaseQuote = $this->database_quote->getQuote($stripe_quote_id);
        $stripeQuote = $this->stripe_quote->getStripeQuote($databaseQuote['stripe_quote_id']);
        $stripeCustomer = $this->stripe_customers->getCustomer($stripeQuote->customer);
        
        $to_email = $stripeCustomer->email;
        $quote_number = 'Quote #' . $databaseQuote['id'];
        $name = $stripeCustomer->name;
        $to_name = $name;

        $subject = $quote_number . ' for ' . $name;

        $quoteEmailTemplate = ORB_SERVICES . 'Templates/TemplatesEmailQuote.php';

        $swap_var = array(
            "{CUSTOMER_EMAIL}" => $to_email,
            "{CUSTOMER_NAME}" => $name,
            "{INVOICE_NUMBER}" => $quote_number,
        );

        if (file_exists($quoteEmailTemplate))
            $body = file_get_contents($quoteEmailTemplate);
        else {
            $msg = array(
                'message' => 'Unable to locate quote email template.'
            );
            $response = rest_ensure_response($msg);
            $response->set_status(400);
            return $response;
        }

        foreach (array_keys($swap_var) as $key) {
            if (strlen($key) > 2 && trim($key) != '')
                $body = str_replace($key, $swap_var[$key], $body);
        }

        $alt_body = $stripeQuote;

        if ($stripeQuote->status === 'paid' || $stripeQuote->status === 'open') {
            $path = $stripeQuote->quote_pdf;
            $attachment_name = $quote_number . '.pdf';
        }

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
