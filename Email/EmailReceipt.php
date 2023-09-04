<?php

namespace ORB_Services\Email;

class EmailReceipt
{
    private $stripe_invoice;
    private $database_receipt;

    public function __construct($stripe_invoice, $database_receipt)
    {
        $this->stripe_invoice = $stripe_invoice;
        $this->database_receipt = $database_receipt;
    }
}
