<?php

namespace ORB_Services\Email;

use PHPMailer\PHPMailer\Exception;

class EmailSchedule
{
    private $mailer;
    private $smtp_host;
    private $smtp_port;
    private $smtp_secure;
    private $smtp_auth;
    private $smtp_username;
    private $smtp_password;
    private $to_email;
    private $to_name;

    public function __construct($mailer)
    {
        $this->mailer = $mailer;
        $this->smtp_host = get_option('schedule_smtp_host');
        $this->smtp_port = get_option('schedule_smtp_port');
        $this->smtp_secure = get_option('schedule_smtp_secure');
        $this->smtp_auth = get_option('schedule_smtp_auth');
        $this->smtp_username = get_option('schedule_smtp_username');
        $this->smtp_password = get_option('schedule_smtp_password');
        $this->to_email = get_option('schedule_email');
        $this->to_name = get_option('schedule_name');
    }

    public function sendScheduleEmail($reply_to_email, $reply_to_name, $subject, $message)
    {
        $body = '<p>' . $message . '</p>';
        $alt_body = $message;

        try {
            $this->mailer->isSMTP();
            $this->mailer->SMTPAuth = $this->smtp_auth;
            $this->mailer->Host = $this->smtp_host;
            $this->mailer->SMTPSecure = $this->smtp_secure;
            $this->mailer->Port = $this->smtp_port;

            $this->mailer->Username = $this->smtp_username;
            $this->mailer->Password = $this->smtp_password;

            $this->mailer->setFrom($this->to_email, $this->to_name);
            $this->mailer->addAddress($this->to_email, $this->to_name);
            $this->mailer->addReplyTo($reply_to_email, $reply_to_name);

            $this->mailer->isHTML(true);
            $this->mailer->Subject = $subject;
            $this->mailer->Body = $body;
            $this->mailer->AltBody = $alt_body;

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
