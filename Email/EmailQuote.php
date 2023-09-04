<?php

namespace ORB_Services\Email;

class EmailQuote
{
    private $stripe_quote;
    private $database_quote;

    public function __construct($stripe_quote, $database_quote)
    {
        $this->stripe_quote = $stripe_quote;
        $this->database_quote = $database_quote;
    }
}
