<?php

namespace ORB_Services\Email;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class Email
{
    private $mailer;
    private $smtp_auth;
    private $smtp_host;
    private $smtp_secure;
    private $smtp_port;
    private $smtp_username;
    private $smtp_password;
    private $from_email;
    private $from_name;

    public function __construct($smtp_auth, $smtp_host, $smtp_secure, $smtp_port, $smtp_username, $smtp_password, $from_email, $from_name)
    {
        $this->mailer = new PHPMailer();
        $this->smtp_auth = $smtp_auth;
        $this->smtp_host = $smtp_host;
        $this->smtp_secure = $smtp_secure;
        $this->smtp_port = $smtp_port;
        $this->smtp_username = $smtp_username;
        $this->smtp_password = $smtp_password;
        $this->from_email = $from_email;
        $this->from_name = $from_name;
    }

    public function sendEmail($to_email, $to_name, $reply_to_email, $reply_to_name, $subject, $body, $alt_body, $path = '', $attachment_name = '')
    {
        try {
            $this->mailer->SMTPDebug = SMTP::DEBUG_SERVER;
            $this->mailer->isSMTP();
            $this->mailer->SMTPAuth = $this->smtp_auth;
            $this->mailer->Host = $this->smtp_host;
            $this->mailer->SMTPSecure = $this->smtp_secure;
            $this->mailer->Port = $this->smtp_port;

            $this->mailer->Username = $this->smtp_username;
            $this->mailer->Password = $this->smtp_password;

            $this->mailer->setFrom($this->from_email, $this->from_name);
            $this->mailer->addAddress($to_email, $to_name);
            $this->mailer->addReplyTo($reply_to_email, $reply_to_name);

            $this->mailer->isHTML(true);
            $this->mailer->Subject = $subject;
            $this->mailer->Body = $body;
            $this->mailer->AltBody = $alt_body;

            // $headers = get_headers($path);
            // $statusCode = substr($headers[0], 9, 3);

            // return $statusCode;

            if (isset($path) && isset($attachment_name)) {
                
                $this->mailer->addAttachment($path, $attachment_name, 'base64', 'application/pdf');
            }

            if ($this->mailer->send()) {
                return ['message' => 'Message has been sent'];
            } else {
                throw new Exception("Message could not be sent. Mailer Error: {$this->mailer->ErrorInfo}");
            }
        } catch (Exception $e) {
            error_log($e->getMessage());
            return ['error' => $e->getMessage()];
        }
    }
}
