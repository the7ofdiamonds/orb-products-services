<?php
namespace ORB_Services\Email;

require ORB_SERVICES . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;

class Email
{
    public $mailer;

    public function __construct()
    {
        $this->mailer = new PHPMailer();
    }

    protected function orb_smtp_settings($mailer)
    {
        $mailer->isSMTP();
        $mailer->Host = SMTP_HOST;
        $mailer->Port = SMTP_PORT;
        $mailer->SMTPSecure = SMTP_ENCRYPTION;
        $mailer->SMTPAuth = SMTP_AUTH;
        $mailer->Username = SMTP_USERNAME;
        $mailer->Password = SMTP_PASSWORD;
        $mailer->setFrom(SMTP_USERNAME, 'Contact');
    }

    protected function setSender($email, $name)
    {
        $this->mailer->setFrom($email, $name);
        $this->mailer->addReplyTo($email, $name);
    }

    protected function addRecipient($email, $name)
    {
        $this->mailer->addAddress($email, $name);
    }

    protected function setSubject($subject)
    {
        $this->mailer->Subject = $subject;
    }

    protected function setBody($body)
    {
        $this->mailer->Body = $body;
    }

    public function sendEmail($fromEmail, $fromName, $toEmail, $toName, $subject, $body)
    {
        // $this->orb_smtp_settings($mailer);
        $this->setSender($fromEmail, $fromName);
        $this->addRecipient($toEmail, $toName);
        $this->setSubject($subject);
        $this->setBody($body);

        if (!$this->mailer->send()) {
            echo 'Email Error: ' . $this->mailer->ErrorInfo;
        } else {
            echo 'The email message was sent.';
        }
    }
}
