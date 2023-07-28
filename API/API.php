<?php
namespace ORB_Services\API;

use ORB_Services\API\Services;
use ORB_Services\API\Service;
use ORB_Services\API\Clients;
use ORB_Services\API\Customers;
use ORB_Services\API\Invoice;
use ORB_Services\API\Payment;
use ORB_Services\API\Receipt;

// require ORB_SERVICES . 'vendor/autoload.php';
// require_once ABSPATH . 'wp-load.php';

use Stripe\Stripe;

class API
{
    private $stripeSecretKey;
    private $stripeClient;

    public function __construct()
    {
        add_action('rest_api_init', [$this, 'add_to_rest_api']);
        add_action('rest_api_init', [$this, 'allow_cors_headers']);

        $this->stripeSecretKey = $_ENV['STRIPE_SECRET_KEY'];
        Stripe::setApiKey($this->stripeSecretKey);
        $this->stripeClient = new \Stripe\StripeClient($this->stripeSecretKey);

        new Services($this->stripeClient);
        new Service($this->stripeClient);
        new Clients($this->stripeClient);
        new Customers($this->stripeClient);
        new Invoice($this->stripeClient);
        new Payment($this->stripeClient);
        new Receipt($this->stripeClient);
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
