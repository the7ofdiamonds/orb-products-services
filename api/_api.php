<?php
namespace ORB\Services\API;
require_once '1_quote.php';
require_once '2_invoice.php';
require_once '3_payment.php';
require_once '4_receipt.php';

use API\Quote\ORB_Services_API_Quote;
use API\Invoice\ORB_Services_API_Invoice;
use API\Payment\ORB_Services_API_Payment;
use API\Receipt\ORB_Services_API_Receipt;

class ORB_Services_API
{
    public function __construct()
    {
        add_action('rest_api_init', [$this, 'add_to_rest_api']);
        add_action('init', [$this, 'react_rewrite_rules'], 10, 0);
        add_action('rest_api_init', [$this, 'allow_cors_headers']);

        new ORB_Services_API_Quote;
        new ORB_Services_API_Invoice;
        new ORB_Services_API_Payment;
        new ORB_Services_API_Receipt;
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
    }
    
    public function react_rewrite_rules()
    {
        add_rewrite_rule('^services/([^/]+)/([^/]+)/([^/]+)?/?', 'index.php?services=$matches[1]&arg1=$matches[2]&arg2=$matches[3]', 'top');
    }

    public function allow_cors_headers()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
    }
}