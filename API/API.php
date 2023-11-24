<?php

namespace ORB\Products_Services\API;

use ORB\Products_Services\API\Email as EmailAPI;
use ORB\Products_Services\API\Stripe\Stripe;

use Dotenv\Dotenv;

use PHPMailer\PHPMailer\PHPMailer;

use Stripe\Stripe as StripeAPI;
use Stripe\StripeClient;

class API
{
    public function __construct()
    {
        $dotenv = Dotenv::createImmutable(ORB_PRODUCTS_SERVICES);
        $dotenv->load(__DIR__);
        $envFilePath = ORB_PRODUCTS_SERVICES . '.env';
        $envContents = file_get_contents($envFilePath);
        $lines = explode("\n", $envContents);
        $stripeSecretKey = null;

        foreach ($lines as $line) {
            $parts = explode('=', $line, 2);
            if (count($parts) === 2 && $parts[0] === 'STRIPE_SECRET_KEY') {
                $stripeSecretKey = trim($parts[1]);
                break;
            }
        }

        if ($stripeSecretKey !== null) {
            StripeAPI::setApiKey($stripeSecretKey);
            $stripeClient = new StripeClient($stripeSecretKey);
            $mailer = new PHPMailer();

            new EmailAPI($stripeClient, $mailer);

            new Stripe($stripeClient);
        } else {
            error_log('Stripe Secret Key is required.');
        }
    }

    public function allow_cors_headers()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
    }
}
