<?php

namespace ORB_Services\Email;

use ORB_Services\Database\DatabaseInvoice;
use ORB_Services\API\Stripe\StripeInvoice;

use PHPMailer\PHPMailer\Exception;

class EmailInvoice
{
    private $database_invoice;
    private $stripe_invoice;
    private $email;
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
    private $invoiceEmailBodyTemplateBody;
    private $invoiceEmailBodyTemplate;

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
        // $this->email = $email;
        // $this->pdf = $pdf;
        $this->mailer = $mailer;
    }

    function invoiceEmailBodyHeader($databaseInvoice, $stripeInvoice)
    {
        $invoiceEmailBodyTemplateHeader = ORB_SERVICES . 'Templates/TemplatesEmailBodyBillingHeader.php';

        $swap_var = array(
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
            "{SUBTOTAL}" => $stripeInvoice->subtotal,
            "{TAX}" => $stripeInvoice->tax,
            "{GRAND_TOTAL}" => $stripeInvoice->total,
        );

        if (file_exists($invoiceEmailBodyTemplateHeader)) {
            $bodyHeader = file_get_contents($invoiceEmailBodyTemplateHeader);

            foreach (array_keys($swap_var) as $key) {
                if (strlen($key) > 2 && trim($key) != '') {
                    $bodyHeader = str_replace($key, $swap_var[$key], $bodyHeader);
                }
            }
        } else {

        }

        return $bodyHeader;
    }

    function invoiceEmailBodyLines($lines)
    {
        $invoiceEmailBodyTemplateBody = ORB_SERVICES . 'Templates/TemplatesEmailBodyInvoiceBody.php';

        $lineItems = [];

        foreach ($lines as $line) {
            $lineItem = [
                "Product" => $line->price->product,
                "Description" => $line->description,
                "Quantity" => $line->quantity,
                "Unit Price" => $line->price->unit_amount / 100,
                "Total" => $line->amount / 100,
            ];

            $lineItems[] = $lineItem;
        }

        $swap_var = array(
            "{LINES}" => $lineItems,
        );

        if (file_exists($invoiceEmailBodyTemplateBody)) {
            $lines = file_get_contents($invoiceEmailBodyTemplateBody);

            foreach (array_keys($swap_var) as $key) {
                if (strlen($key) > 2 && trim($key) != '') {
                    if ($key === "{LINES}") {
                        $linesHtml = '';

                        foreach ($lineItems as $lineItem) {
                            $linesHtml .= '<tr>';
                            foreach ($lineItem as $value) {
                                $linesHtml .= '<td>' . $value . '</td>';
                            }
                            $linesHtml .= '</tr>';
                        }

                        $lines = str_replace($key, $linesHtml, $lines);
                    } else {
                        $lines = str_replace($key, $swap_var[$key], $lines);
                    }
                }
            }

            return $lines;
        }
    }

    function invoiceEmailBodyFooter($stripeInvoice)
    {
        $invoiceEmailBodyTemplateFooter = ORB_SERVICES . 'Templates/TemplatesEmailBodyBillingFooter.php';

        $swap_var = array(
            "{AMOUNT_DUE}" => $stripeInvoice->amount_due,
            "{SUBTOTAL}" => $stripeInvoice->subtotal,
            "{TAX}" => $stripeInvoice->tax,
            "{GRAND_TOTAL}" => $stripeInvoice->total,
        );

        if (file_exists($invoiceEmailBodyTemplateFooter)) {
            $bodyFooter = file_get_contents($invoiceEmailBodyTemplateFooter);

            foreach (array_keys($swap_var) as $key) {
                if (strlen($key) > 2 && trim($key) != '') {
                    $bodyFooter = str_replace($key, $swap_var[$key], $bodyFooter);
                }
            }

            return $bodyFooter;
        }
    }

    function invoiceEmailBody($stripe_invoice_id)
    {
        $databaseInvoice = $this->database_invoice->getInvoice($stripe_invoice_id);
        $stripeInvoice = $this->stripe_invoice->getStripeInvoice($databaseInvoice['stripe_invoice_id']);

        $header = $this->email->emailHeader();
        $bodyHeader = $this->invoiceEmailBodyHeader($databaseInvoice, $stripeInvoice);
        $bodyBody = $this->invoiceEmailBodyLines($stripeInvoice->lines);
        $bodyFooter = $this->invoiceEmailBodyFooter($stripeInvoice);
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
            $this->mailer->Body = $this->invoiceEmailBody($stripe_invoice_id);
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
                throw new Exception("Message could not be sent. Mailer Error: {$this->mailer->ErrorInfo}");
            }
        } catch (Exception $e) {
            error_log($e->getMessage());
            return $e->getMessage();
        }
    }
}
