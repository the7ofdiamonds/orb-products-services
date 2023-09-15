<?php

namespace ORB_Services\Email;

use Exception;

use ORB_Services\Database\DatabaseInvoice;
use ORB_Services\API\Stripe\StripeInvoice;

use PHPMailer\PHPMailer\Exception as PHPMailerException;

class EmailInvoice
{
    private $database_invoice;
    private $stripe_invoice;
    private $email;
    private $billing;
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
        $this->smtp_host = get_option('invoice_smtp_host');
        $this->smtp_port = get_option('invoice_smtp_port');
        $this->smtp_secure = get_option('invoice_smtp_secure');
        $this->smtp_auth = get_option('invoice_smtp_auth');
        $this->smtp_username = get_option('invoice_smtp_username');
        $this->smtp_password = get_option('invoice_smtp_password');
        $this->from_email = get_option('invoice_email');
        $this->from_name = get_option('invoice_name');

        $this->database_invoice = new DatabaseInvoice();
        $this->stripe_invoice = new StripeInvoice($stripeClient);
        $this->email = new Email();
        $this->billing = new EmailBilling($stripeClient);
        $this->mailer = $mailer;
        // $this->pdf = $pdf;
    }

    function invoiceEmailBodyHeader($databaseInvoice, $stripeInvoice)
    {
        $swap_var = array(
            "{BILLING_TYPE}" => 'INVOICE',
            "{BILLING_NUMBER}" => 'IN' . $databaseInvoice['id'],
            "{CUSTOMER_NAME}" => $stripeInvoice->customer_name,
            "{CUSTOMER_EMAIL}" => $stripeInvoice->customer_email,
            "{TAX_TYPE}" => $stripeInvoice->customer_tax_ids[0]->type,
            "{TAX_ID}" => $stripeInvoice->customer_tax_ids[0]->value,
            "{ADDRESS_LINE_1}" => $stripeInvoice->customer_address->line1,
            "{ADDRESS_LINE_2}" => $stripeInvoice->customer_address->line2,
            "{CITY}" => $stripeInvoice->customer_address->city,
            "{STATE}" => $stripeInvoice->customer_address->state,
            "{POSTAL_CODE}" => $stripeInvoice->customer_address->postal_code,
            "{CUSTOMER_PHONE}" => $stripeInvoice->customer_phone,
            "{DUE_DATE}" => $stripeInvoice->due_date,
            "{AMOUNT_DUE}" => $stripeInvoice->amount_due,
        );

        if (file_exists($this->billing->header)) {
            $bodyHeader = file_get_contents($this->billing->header);

            foreach (array_keys($swap_var) as $key) {
                if (strlen($key) > 2 && trim($key) != '') {
                    if ($swap_var[$key] != '') {
                        $bodyHeader = str_replace($key, $swap_var[$key], $bodyHeader);
                    } else {
                        $bodyHeader = str_replace($key, '', $bodyHeader);
                    }
                }
            }
        } else {
            throw new Exception('Unable to find billing header template.');
        }

        return $bodyHeader;
    }

    function invoiceEmailBody($databaseInvoice, $stripeInvoice)
    {
        $header = $this->email->emailHeader();
        $bodyHeader = $this->invoiceEmailBodyHeader($databaseInvoice, $stripeInvoice);
        $bodyBody = $this->billing->billingBody($stripeInvoice->lines);
        $bodyFooter = $this->billing->billingFooter($stripeInvoice);
        $footer = $this->email->emailFooter();

        $fullEmailBody = $header . $bodyHeader . $bodyBody . $bodyFooter . $footer;

        return $fullEmailBody;
    }

    function sendInvoiceEmail($stripe_invoice_id)
    {
        try {
            $databaseInvoice = $this->database_invoice->getInvoice($stripe_invoice_id);
            $stripeInvoice = $this->stripe_invoice->getStripeInvoice($databaseInvoice['stripe_invoice_id']);

            $to_email = $stripeInvoice->customer_email;
            $invoice_number = 'Invoice #' . $databaseInvoice['id'];
            $name = $stripeInvoice->customer_name;
            $to_name = $name;

            $subject = $invoice_number . ' for ' . $name;

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
            $this->mailer->Body = $this->invoiceEmailBody($databaseInvoice, $stripeInvoice);
            $this->mailer->AltBody = '<pre>' . $stripeInvoice . '</pre>';

            // Make the body the pdf
            // if ($stripeInvoice->status === 'paid' || $stripeInvoice->status === 'open') {
            //     $path = $stripeInvoice->invoice_pdf;
            //     $attachment_name = $invoice_number . '.pdf';
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
