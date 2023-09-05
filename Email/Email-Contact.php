<?php

namespace ORB_Services\Email;

use ORB_Services\Email\Email;

class Contact extends Email
{
    public $fromEmail;
    public $fromName;

    public function __construct()
    {
        $this->fromEmail = CONTACT_EMAIL;
        $this->fromName = 'Contact';
    }

    public function sendContactEmail($toEmail, $toName, $subject, $message)
    {
        $body = '<p>' . $message . '</p>';
        $this->sendEmail($this->fromEmail, $this->fromName, $toEmail, $toName, $subject, $body);
    }
}
