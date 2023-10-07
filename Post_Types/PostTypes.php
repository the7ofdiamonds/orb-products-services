<?php

namespace ORB_Services\Post_Types;

class PostTypes{
    public function __construct($stripeClient)
    {
        new Services($stripeClient);
        new Products();
    }
}