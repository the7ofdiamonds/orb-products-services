<?php

namespace ORB_Services\Email;

use ORB_Services\Email\Email;

class EmailInvoice extends Email
{
    private $email;
    private $from_email;
    private $from_name;
    private $reply_to_email;
    private $reply_to_name;

    public function __construct()
    {
        $smtp_host = get_option('smtp_host');
        $smtp_port = get_option('smtp_port');
        $smtp_secure = get_option('smtp_secure');
        $smtp_auth = get_option('smtp_auth');
        $smtp_username = get_option('smtp_username');
        $smtp_password = get_option('smtp_password');
        $this->from_email = 'jamel.c.lyons@outlook.com';
        $this->from_name = 'Invoice @ THE7OFDIAMONDS.TECH';
        $this->reply_to_email = 'jamel.c.lyons@outlook.com';
        $this->reply_to_name = 'Invoice @ THE7OFDIAMONDS.TECH';

        $this->email = new Email($smtp_auth, $smtp_host, $smtp_secure, $smtp_port, $smtp_username, $smtp_password, $this->from_email, $this->from_name);
    }

    public function sendInvoiceEmail($to_email, $to_name, $subject, $message, $path, $attachment_name)
    {
        $body = '<p>' . $message . '</p>';
        $alt_body = $message;

        return $this->email->sendEmail($to_email, $to_name, $this->reply_to_email, $this->reply_to_name, $subject, $body, $alt_body, $path, $attachment_name);
    }
}
