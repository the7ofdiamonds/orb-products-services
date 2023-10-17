<?php

namespace ORB_Products_Services\Email;

use Exception;

use ORB_Products_Services\Database\DatabaseReceipt;
use ORB_Products_Services\API\Stripe\StripeInvoice;

use PHPMailer\PHPMailer\Exception as PHPMailerException;

class EmailReceipt
{
    private $database_receipt;
    private $stripe_receipt;
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
        $this->database_receipt = new DatabaseReceipt();
        $this->stripe_receipt = new StripeInvoice($stripeClient);
        $this->email = new Email();
        $this->billing = new EmailBilling($stripeClient);
        $this->mailer = $mailer;
        // $this->pdf = $pdf;

        $this->smtp_host = get_option('receipt_smtp_host');
        $this->smtp_port = get_option('receipt_smtp_port');
        $this->smtp_secure = get_option('receipt_smtp_secure');
        $this->smtp_auth = get_option('receipt_smtp_auth');
        $this->smtp_username = get_option('receipt_smtp_username');
        $this->smtp_password = get_option('receipt_smtp_password');
        $this->from_email = get_option('receipt_email');
        $this->from_name = get_option('receipt_name');
    }

    function receiptEmailBodyHeader($databaseInvoice, $stripeInvoice)
    {
        $swap_var = array(
            "{BILLING_TYPE}" => 'RECEIPT',
            "{BILLING_NUMBER}" => 'RE' . $databaseInvoice['id'],
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

    public function receiptEmailBody($databaseReceipt, $stripeInvoice)
    {
        $header = $this->email->emailHeader();
        $bodyHeader = $this->receiptEmailBodyHeader($databaseReceipt, $stripeInvoice);
        $bodyBody = $this->billing->billingBody($stripeInvoice->lines);
        $bodyFooter = $this->billing->billingFooter($stripeInvoice);
        $footer = $this->email->emailFooter();

        $fullEmailBody = $header . $bodyHeader . $bodyBody . $bodyFooter . $footer;

        return $fullEmailBody;
    }

    public function sendReceiptEmail($stripe_invoice_id)
    {
        $databaseReceipt = $this->database_receipt->getReceipt($stripe_invoice_id);
        $stripeInvoice = $this->stripe_receipt->getStripeInvoice($databaseReceipt['stripe_invoice_id']);

        $to_email = $stripeInvoice->customer_email;
        $receipt_number = 'Receipt #' . $databaseReceipt['id'];
        $name = $stripeInvoice->customer_name;
        $to_name = $name;

        $subject = $receipt_number . ' for ' . $name;

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
            $this->mailer->Body = $this->receiptEmailBody($databaseReceipt, $stripeInvoice);
            $this->mailer->AltBody = '<pre>' . $stripeInvoice . '</pre>';

            // Make the body the pdf
            // if ($stripeInvoice->status === 'paid' || $stripeInvoice->status === 'open') {
            //     $path = $stripeInvoice->receipt_pdf;
            //     $attachment_name = $receipt_number . '.pdf';
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
            return ['error' => $e->getMessage()];
        }
    }
}
