<?php

namespace ORB_Services\API;

use ORB_Services\API\Stripe\Stripe;
use ORB_Services\API\Schedule;

class API
{
    public function __construct($credentialsPath, $stripeClient)
    {
        add_action('rest_api_init', [$this, 'add_to_rest_api']);
        add_action('rest_api_init', [$this, 'allow_cors_headers']);

        new Stripe($stripeClient);
        new Schedule($credentialsPath);
    }

    public function add_to_rest_api()
    {
        register_meta(
            'post',
            '_service_cost',
            [
                'type' => 'number',
                'description' => 'Service Cost',
                'single' => true,
                'show_in_rest' => true
            ]
        );

        register_meta(
            'post',
            '_service_features',
            [
                'type' => 'string',
                'description' => 'Service Features',
                'single' => true,
                'show_in_rest' => true
            ]
        );

        register_meta(
            'post',
            '_service_description',
            [
                'type' => 'string',
                'description' => 'Service Description',
                'single' => true,
                'show_in_rest' => true
            ]
        );

        register_meta(
            'post',
            '_service_features',
            [
                'type' => 'string',
                'description' => 'Service Features',
                'single' => true,
                'show_in_rest' => true
            ]
        );

        register_meta(
            'post',
            '_service_price_id',
            [
                'type' => 'string',
                'description' => 'Service Price ID',
                'single' => true,
                'show_in_rest' => true
            ]
        );
    }

    public function allow_cors_headers()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
    }
}
