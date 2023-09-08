<?php

namespace ORB_Services\Email;

use PHPMailer\PHPMailer\Exception;

class EmailReceipt
{
    private $mailer;
    private $stripe_invoice;
    private $database_receipt;
    private $smtp_host;
    private $smtp_port;
    private $smtp_secure;
    private $smtp_auth;
    private $smtp_username;
    private $smtp_password;
    private $from_email;
    private $from_name;

    public function __construct($mailer, $stripe_invoice, $database_receipt)
    {
        $this->mailer = $mailer;
        $this->stripe_invoice = $stripe_invoice;
        $this->database_receipt = $database_receipt;

        $this->smtp_host = get_option('receipt_smtp_host');
        $this->smtp_port = get_option('receipt_smtp_port');
        $this->smtp_secure = get_option('receipt_smtp_secure');
        $this->smtp_auth = get_option('receipt_smtp_auth');
        $this->smtp_username = get_option('receipt_smtp_username');
        $this->smtp_password = get_option('receipt_smtp_password');
        $this->from_email = get_option('receipt_email');
        $this->from_name = get_option('receipt_name');
    }

    public function sendReceiptEmail($stripe_invoice_id)
    {
        $databaseReceipt = $this->database_receipt->getReceipt($stripe_invoice_id);
        $stripeInvoice = $this->stripe_invoice->getStripeInvoice($databaseReceipt['stripe_invoice_id']);

        $to_email = $stripeInvoice->customer_email;
        $receipt_number = 'Receipt #' . $databaseReceipt['id'];
        $name = $stripeInvoice->customer_name;
        $to_name = $name;

        $subject = $receipt_number . ' for ' . $name;

        $message = '<pre>' . $stripeInvoice . '</pre>';

        $alt_body = $message;

        $receiptEmailTemplate = ORB_SERVICES . 'Templates/TemplatesEmailReceipt.php';

        $swap_var = array(
            "{CUSTOMER_EMAIL}" => $to_email,
            "{CUSTOMER_NAME}" => $name,
            "{RECEIPT_NUMBER}" => $receipt_number,
        );

        if (file_exists($receiptEmailTemplate))
            $body = file_get_contents($receiptEmailTemplate);
        else {
            $msg = array(
                'message' => 'Unable to locate receipt email template.'
            );
            $response = rest_ensure_response($msg);
            $response->set_status(400);
            return $response;
        }

        foreach (array_keys($swap_var) as $key) {
            if (strlen($key) > 2 && trim($key) != '')
                $body = str_replace($key, $swap_var[$key], $body);
        }

        if ($stripeInvoice->status === 'paid' || $stripeInvoice->status === 'open') {
            $path = $stripeInvoice->receipt_pdf;
            $attachment_name = $receipt_number . '.pdf';
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
