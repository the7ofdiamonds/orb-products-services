<?php

namespace ORB_Services\Email;

use ORB_Services\Email\Email;

class EmailContact extends Email
{
    private $email;
    private $to_email;
    private $to_name;

    public function __construct()
    {
        $smtp_host = get_option('smtp_host');
        $smtp_port = get_option('smtp_port');
        $smtp_secure = get_option('smtp_secure');
        $smtp_auth = get_option('smtp_auth');
        $smtp_username = get_option('smtp_username');
        $smtp_password = get_option('smtp_password');
        $this->to_email = 'jamel.c.lyons@outlook.com';
        $this->to_name = 'Contact @ THE7OFDIAMONDS.TECH';

        $this->email = new Email($smtp_auth, $smtp_host, $smtp_secure, $smtp_port, $smtp_username, $smtp_password, $this->to_email, $this->to_name);
    }

    public function sendContactEmail($reply_to_email, $reply_to_name, $subject, $message)
    {
        $body = '<p>' . $message . '</p>';
        $alt_body = $message;

        return $this->email->sendEmail($this->to_email, $this->to_name, $reply_to_email, $reply_to_name, $subject, $body, $alt_body);
    }
}
