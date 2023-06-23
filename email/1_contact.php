<?php
namespace ORB\Services\Email\Contact;

use ORB\Services\Email\ORB_Services_Email;

class ORB_Services_Email_Contact extends ORB_Services_Email {
    public $fromEmail;
    public $fromName;

    public function __construct(){
        $this->fromEmail = CONTACT_EMAIL;
        $this->fromName = 'Contact';
    }

    public function sendContactEmail($toEmail, $toName, $subject, $message) {
        $body = '<p>' . $message . '</p>';
        $this->sendEmail($this->fromEmail, $this->fromName, $toEmail, $toName, $subject, $body);
    }
}