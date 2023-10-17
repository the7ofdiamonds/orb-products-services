<?php

namespace ORB_Products_Services\Email;

use PHPMailer\PHPMailer\Exception;

class EmailContact
{
    private $email;
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
        $this->smtp_host = get_option('contact_smtp_host');
        $this->smtp_port = get_option('contact_smtp_port');
        $this->smtp_secure = get_option('contact_smtp_secure');
        $this->smtp_auth = get_option('contact_smtp_auth');
        $this->smtp_username = get_option('contact_smtp_username');
        $this->smtp_password = get_option('contact_smtp_password');
        $this->to_email = get_option('contact_email');
        $this->to_name = get_option('contact_name');

        $this->email = new Email();
        $this->mailer = $mailer;
    }

    public function contactEmailBody($first_name, $last_name, $email, $subject, $message)
    {
        $contactEmailBodyTemplate = ORB_PRODUCTS_SERVICES . 'Templates/TemplatesEmailBodyContact.php';

        $swap_var = array(
            "{EMAIL}" => $email,
            "{FIRST_NAME}" => $first_name,
            "{LAST_NAME}" => $last_name,
            "{SUBJECT}" => $subject,
            "{MESSAGE}" => $message
        );

        if (file_exists($contactEmailBodyTemplate)) {
            $body = file_get_contents($contactEmailBodyTemplate);

            foreach (array_keys($swap_var) as $key) {
                if (strlen($key) > 2 && trim($key) != '') {
                    $body = str_replace($key, $swap_var[$key], $body);
                }
            }

            $header = $this->email->emailHeader();
            $footer = $this->email->emailFooter();

            $fullEmailBody = $header . $body . $footer;

            return $fullEmailBody;
        } else {
            throw new Exception('Unable to locate contact email template.');
        }
    }

    public function sendContactEmail($first_name, $last_name, $email, $subject, $message)
    {
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
            $this->mailer->addReplyTo($email, $first_name . ' ' . $last_name);

            $this->mailer->isHTML(true);
            $this->mailer->Subject = $subject;
            $this->mailer->Body = $this->contactEmailBody($first_name, $last_name, $email, $subject, $message);
            $this->mailer->AltBody = $message;

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
