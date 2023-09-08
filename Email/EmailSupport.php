<?php

namespace ORB_Services\Email;

use PHPMailer\PHPMailer\Exception;

class EmailSupport
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
        $this->smtp_host = get_option('support_smtp_host');
        $this->smtp_port = get_option('support_smtp_port');
        $this->smtp_secure = get_option('support_smtp_secure');
        $this->smtp_auth = get_option('support_smtp_auth');
        $this->smtp_username = get_option('support_smtp_username');
        $this->smtp_password = get_option('support_smtp_password');
        $this->to_email = get_option('support_email');
        $this->to_name = get_option('support_name');
    }

    public function sendSupportEmail($reply_to_email, $reply_to_name, $subject, $message)
    {
        $supportEmailTemplate = ORB_SERVICES . 'Templates/TemplatesEmailSupport.php';

        $swap_var = array(
            "{REPLY_TO_EMAIL}" => $reply_to_email,
            "{REPLY_TO_NAME}" => $reply_to_name,
            "{SUBJECT}" => $subject,
            "{MESSAGE}" => $message
        );

        if (file_exists($supportEmailTemplate))
            $body = file_get_contents($supportEmailTemplate);
        else {
            $msg = array(
                'message' => 'Unable to locate support email template.'
            );
            $response = rest_ensure_response($msg);
            $response->set_status(400);
            return $response;
        }

        foreach (array_keys($swap_var) as $key) {
            if (strlen($key) > 2 && trim($key) != '')
                $body = str_replace($key, $swap_var[$key], $body);
        }

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
