<?php

namespace ORB_Services\API\Google;

use Exception;

use Google\Service\Calendar;
use Google\Service\Calendar\Event;
use Google\Service\Calendar\CalendarListEntry;

class GoogleCalendar
{
    private $calendar;

    public function __construct($credentialsPath)
    {
        $this->calendar = new Calendar($credentialsPath);
    }

    public function createCalendar(CalendarListEntry $postBody, $optParams = [])
    {
        try {
            $calendar = $this->calendar->calendarList->insert($postBody, $optParams = []);

            return $calendar;
        } catch (Exception $e) {
            $error_message = $e->getMessage();
            $status_code = $e->getCode();

            error_log("Error in createCalendar: Status Code $status_code - $error_message");

            throw new Exception("Status Code: $status_code - $error_message");
        }
    }

    public function getCalendar(string $calendarId, $optParams = [])
    {
        try {
            $calendar = $this->calendar->calendarList->get($calendarId, $optParams = []);

            return $calendar;
        } catch (Exception $e) {
            $error_message = $e->getMessage();
            $status_code = $e->getCode();

            error_log("Error in getCalendar: Status Code $status_code - $error_message");

            throw new Exception("Status Code: $status_code - $error_message");
        }
    }

    public function getCalendars($optParams = [])
    {
        try {
            $calendars = $this->calendar->calendarList->listCalendarList($optParams = []);

            return $calendars;
        } catch (Exception $e) {
            $error_message = $e->getMessage();
            $status_code = $e->getCode();

            error_log("Error in getCalendars: Status Code $status_code - $error_message");

            throw new Exception("Status Code: $status_code - $error_message");
        }
    }

    public function updateCalendar($calendarId, CalendarListEntry $postBody, $optParams = [])
    {
        try {
            $calendars = $this->calendar->calendarList->update($calendarId, $postBody, $optParams = []);

            return $calendars;
        } catch (Exception $e) {
            $error_message = $e->getMessage();
            $status_code = $e->getCode();

            error_log("Error in updateCalendar: Status Code $status_code - $error_message");

            throw new Exception("Status Code: $status_code - $error_message");
        }
    }

    public function createCalendarEvent($calendarId, Event $postBody, $optParams = [])
    {
        try {
            $createdEvent = $this->calendar->events->insert($calendarId, $postBody, $optParams = []);

            return $createdEvent;
        } catch (Exception $e) {
            $error_message = $e->getMessage();
            $status_code = $e->getCode();

            error_log("Error in createCalendarEvent: Status Code $status_code - $error_message");

            throw new Exception("Status Code: $status_code - $error_message");
        }
    }

    function getCalendarEvent($calendarId, $eventId, $optParams = [])
    {
        try {
            $event = $this->calendar->events->get($calendarId, $eventId, $optParams = []);

            return $event;
        } catch (Exception $e) {
            $error_message = $e->getMessage();
            $status_code = $e->getCode();

            error_log("Error in getCalendarEvent: Status Code $status_code - $error_message");

            throw new Exception("Status Code: $status_code - $error_message");
        }
    }

    function getCalendarEvents($calendarId, $optParams = [])
    {
        try {
            $events = $this->calendar->calendarList->get($calendarId, $optParams = []);

            return $events;
        } catch (Exception $e) {
            $error_message = $e->getMessage();
            $status_code = $e->getCode();

            error_log("Error in getCalendarEvents: Status Code $status_code - $error_message");

            throw new Exception("Status Code: $status_code - $error_message");
        }
    }

    function updateEvent($calendarId, $eventId, $event)
    {
        try {
            $updatedEvent = $this->calendar->events->update($calendarId, $eventId, $event, $optParams = []);

            return $updatedEvent;
        } catch (Exception $e) {
            $error_message = $e->getMessage();
            $status_code = $e->getCode();

            error_log("Error in updateEvent: Status Code $status_code - $error_message");

            throw new Exception("Status Code: $status_code - $error_message");
        }
    }

    function cancelEvent($calendarId, $eventId, $optParams = [])
    {
        try {
            $cancelledEvent = $this->calendar->events->delete($calendarId, $eventId, $optParams = []);

            return $cancelledEvent;
        } catch (Exception $e) {
            $error_message = $e->getMessage();
            $status_code = $e->getCode();

            error_log("Error in cancelEvent: Status Code $status_code - $error_message");

            throw new Exception("Status Code: $status_code - $error_message");
        }
    }
}
