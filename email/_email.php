<?php

use PHPMailer\PHPMailer\PHPMailer;

require_once ABSPATH . WPINC . '/PHPMailer/PHPMailer.php';
require_once ABSPATH . WPINC . '/PHPMailer/SMTP.php';

class THFW_Email
{

    public function construct()
    {

        add_action('phpmailer_init', [$this, 'thfw_smtp_email_settings']);
        add_filter('wp_mail_from', [$this, 'thfw_wp_mail_from']);
        new PHPMailer();
    }


    // Override the default WordPress mailing function
    function thfw_smtp_email_settings($phpmailer)
    {
        $phpmailer->isSMTP();
        $phpmailer->Host = SMTP_HOST;
        $phpmailer->Port = SMTP_PORT;
        $phpmailer->SMTPSecure = SMTP_ENCRYPTION;
        $phpmailer->SMTPAuth = SMTP_AUTH;
        $phpmailer->Username = SMTP_USERNAME;
        $phpmailer->Password = SMTP_PASSWORD;
        $phpmailer->SetFrom(SMTP_USERNAME, 'Contact');
    }

    function thfw_wp_mail_from($from_email) {
        return SMTP_USERNAME;
    }
}
