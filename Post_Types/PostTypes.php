<?php

namespace ORB_Products_Services\Post_Types;

class PostTypes{
    public function __construct($stripeClient)
    {
        new Services($stripeClient);
        new Products();
    }
}