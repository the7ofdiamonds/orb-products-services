<?php

namespace ORB_Services\API\Stripe;

class StripeCustomers{

    private $stripe_customers;

    public function __construct($stripe_customers){
        $this->stripe_customers = $stripe_customers;
    }
   
}