<?php

namespace ORB_Products_Services\Email;

use Exception;

use ORB_Products_Services\API\Stripe\StripeCustomers;

class EmailBilling
{
    private $stripe_customer;
    public $header;
    private $body;
    public $footer;

    public function __construct($stripeClient)
    {
        $this->stripe_customer = new StripeCustomers($stripeClient);
        $this->header = ORB_PRODUCTS_SERVICES . 'Templates/TemplatesEmailBillingHeader.php';
        $this->body = ORB_PRODUCTS_SERVICES . 'Templates/TemplatesEmailBillingBody.php';
        $this->footer = ORB_PRODUCTS_SERVICES . 'Templates/TemplatesEmailBillingFooter.php';
    }

    function billingHeader($billingType, $billingNumber, $billing)
    {
        $customer = $this->stripe_customer->getCustomer($billing->customer->id);

        $swap_var = array(
            "{BILLING_TYPE}" => $billingType,
            "{BILLING_NUMBER}" => $billingNumber,
            "{CUSTOMER_NAME}" => $customer->name,
            "{CUSTOMER_EMAIL}" => $customer->email,
            "{CUSTOMER_PHONE}" => $customer->phone,
            "{TAX_TYPE}" => $customer->tax_ids->data[0]->type,
            "{TAX_ID}" => $customer->tax_ids->data[0]->value,
            "{ADDRESS_LINE_1}" => $customer->address->line1,
            "{ADDRESS_LINE_2}" => $customer->address->line2,
            "{CITY}" => $customer->address->city,
            "{STATE}" => $customer->address->state,
            "{POSTAL_CODE}" => $customer->address->postal_code,
            "{DUE_DATE}" => (isset($billing->expires_at)) ? $billing->expires_at : $billing->due_date,
            "{AMOUNT_DUE}" => (isset($billing->amount_due)) ? $billing->amount_due : 0,
        );

        if (file_exists($this->header)) {
            $bodyHeader = file_get_contents($this->header);

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
            throw new Exception('Could not find billing header template.');
        }

        return $bodyHeader;
    }

    function billingBody($lines)
    {
        $lineItems = [];
        foreach ($lines as $line) {
            $quantity = $line->quantity;
            $unit_price = $line->price->unit_amount / 100;

            $lineItem = [
                "Product" => $line->price->product,
                "Description" => $line->description,
                "Quantity" => $quantity,
                "Unit Price" => $unit_price,
                "Total" => $quantity * $unit_price,
            ];

            $lineItems[] = $lineItem;
        }

        $swap_var = array(
            "{LINES}" => $lineItems,
        );

        if (file_exists($this->body)) {
            $lines = file_get_contents($this->body);

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

    function billingFooter($billing)
    {
        $swap_var = array(
            "{SUBTOTAL}" => (isset($billing->amount_subtotal))? $billing->amount_subtotal : $billing->subtotal,
            "{TAX}" => (isset($billing->tax)) ? $billing->tax : 0,
            "{TOTAL}" => (isset($billing->amount_total)) ? $billing->amount_total : $billing->total,
        );

        if (file_exists($this->footer)) {
            $bodyFooter = file_get_contents($this->footer);

            foreach (array_keys($swap_var) as $key) {
                if (strlen($key) > 2 && trim($key) != '') {
                    if ($swap_var[$key] != '') {
                        $bodyFooter = str_replace($key, $swap_var[$key], $bodyFooter);
                    } else {
                        $bodyFooter = str_replace($key, '', $bodyFooter);
                    }
                }
            }
        } else {
            throw new Exception('Unable to find billing footer template.');
        }

        return $bodyFooter;
    }
}
