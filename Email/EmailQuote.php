<?php

namespace ORB_Services\Email;

use ORB_Services\Database\DatabaseQuote;
use ORB_Services\API\Stripe\StripeQuote;
use ORB_Services\Email\Email;

use Exception;

class EmailQuote
{
    private $database_quote;
    private $stripe_quote;
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

    public function __construct($stripeClient, $mailer)
    {
        $this->database_quote = new DatabaseQuote();
        $this->stripe_quote = new StripeQuote($stripeClient);
        $this->mailer = $mailer;
        // $this->pdf = $pdf;

        $this->smtp_host = get_option('quote_smtp_host');
        $this->smtp_port = get_option('quote_smtp_port');
        $this->smtp_secure = get_option('quote_smtp_secure');
        $this->smtp_auth = get_option('quote_smtp_auth');
        $this->smtp_username = get_option('quote_smtp_username');
        $this->smtp_password = get_option('quote_smtp_password');
        $this->from_email = get_option('quote_email');
        $this->from_name = get_option('quote_name');

        $this->email = new Email();
    }

    function quoteEmailBodyHeader($databaseQuote, $stripeQuote)
    {
        $swap_var = array(
            "{BILLING_TYPE}" => 'QUOTE',
            "{BILLING_NUMBER}" => 'QT' . $databaseQuote['id'],
            "{CUSTOMER_NAME}" => $stripeQuote->customer->name,
            "{CUSTOMER_EMAIL}" => $stripeQuote->customer->email,
            "{CUSTOMER_PHONE}" => $stripeQuote->customer->phone,
            "{TAX_TYPE}" => $stripeQuote->invoice->customer_tax_ids[0]->type,
            "{TAX_ID}" => $stripeQuote->invoice->customer_tax_ids[0]->value,
            "{ADDRESS_LINE_1}" => $stripeQuote->customer->address->line1,
            "{ADDRESS_LINE_2}" => $stripeQuote->customer->address->line2,
            "{CITY}" => $stripeQuote->customer->address->city,
            "{STATE}" => $stripeQuote->customer->address->state,
            "{POSTAL_CODE}" => $stripeQuote->customer->address->postal_code,
            "{DUE_DATE}" => $stripeQuote->invoice->due_date,
            "{AMOUNT_DUE}" => $stripeQuote->invoice->amount_due,
            "{SUBTOTAL}" => $stripeQuote->amount_subtotal,
            "{TOTAL}" => $stripeQuote->amount_total,
        );

        if (file_exists($this->email->billingHeader)) {
            $bodyHeader = file_get_contents($this->email->billingHeader);

            foreach (array_keys($swap_var) as $key) {
                if (strlen($key) > 2 && trim($key) != '') {
                    $bodyHeader = str_replace($key, $swap_var[$key], $bodyHeader);
                }
            }
        } else {
            throw new Exception('Could not find billing header template.');
        }

        return $bodyHeader;
    }

    function quoteEmailBodyLines($lines)
    {
        $lineItems = [];

        foreach ($lines as $line) {
            $lineItem = [
                "Product" => $line->price->product,
                "Description" => $line->description,
                "Quantity" => $line->quantity,
                "Unit Price" => $line->price->unit_amount / 100,
                "Total" => $line->amount_total / 100,
            ];

            $lineItems[] = $lineItem;
        }

        $swap_var = array(
            "{LINES}" => $lineItems,
        );

        if (file_exists($this->email->billingBody)) {
            $lines = file_get_contents($this->email->billingBody);

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
        } else {
            throw new Exception('Could not find billing body template.');
        }
    }

    function quoteEmailBodyFooter($stripeQuote)
    {
        $swap_var = array(
            "{SUBTOTAL}" => $stripeQuote->amount_subtotal,
            "{TAX}" => '-',
            "{TOTAL}" => $stripeQuote->amount_total,
        );

        if (file_exists($this->email->billingFooter)) {
            $bodyFooter = file_get_contents($this->email->billingFooter);

            foreach (array_keys($swap_var) as $key) {
                if (strlen($key) > 2 && trim($key) != '') {
                    $bodyFooter = str_replace($key, $swap_var[$key], $bodyFooter);
                }
            }

            return $bodyFooter;
        } else {
            throw new Exception('Could not find billing footer template.');
        }
    }

    function quoteEmailBody($stripe_quote_id)
    {
        $databaseQuote = $this->database_quote->getQuote($stripe_quote_id);
        $stripeQuote = $this->stripe_quote->getStripeQuote($databaseQuote['stripe_quote_id']);

        $header = $this->email->emailHeader();
        $bodyHeader = $this->quoteEmailBodyHeader($databaseQuote, $stripeQuote);
        $bodyBody = $this->quoteEmailBodyLines($stripeQuote->line_items);
        $bodyFooter = $this->quoteEmailBodyFooter($stripeQuote);
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
            $quote_number = 'Quote #' . $databaseQuote['id'];
            $name = $stripeQuote->customer->name;
            $to_name = $name;

            $subject = $quote_number . ' for ' . $name;

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
            $this->mailer->Body = $this->quoteEmailBody($stripe_quote_id);
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
                throw new Exception("Message could not be sent. Mailer Error: {$this->mailer->ErrorInfo}");
            }
        } catch (Exception $e) {
            error_log($e->getMessage());
            return $e->getMessage();
        }
    }
}
