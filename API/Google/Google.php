<?php

namespace ORB_Services\API\Google;

use Google\Client;
use Google\Service\Calendar;

use ORB_Services\API\Google\GoogleCalendar;
use ORB_Services\Schedule\Schedule;

class Google
{
    private $credentialsPath;
    private $client;

    public function __construct($credentialsPath)
    {
        $this->credentialsPath = $credentialsPath;
        $this->client = new Client();
        $this->client->setApplicationName('Your Application Name');
        $this->client->setScopes(Calendar::CALENDAR_EVENTS);
        $this->client->setAuthConfig($this->credentialsPath);

        new GoogleCalendar($this->client);
        new Schedule($this->client);
    }
}
