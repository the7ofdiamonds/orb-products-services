<?php

namespace ORB_Services\Email;

class Email
{
    public function __construct($mailer)
    {
        new EmailContact($mailer);
        new EmailSupport($mailer);
        new EmailSchedule($mailer);
    }
}
