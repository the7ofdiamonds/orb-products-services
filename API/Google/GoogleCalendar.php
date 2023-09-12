<?php

namespace ORB_Services\API\Google;

use Google\Service\Calendar;
use Google\Service\Calendar\Event;
use Google\Service\Calendar\FreeBusyRequest;
use Google\Service\Exception;

use DateTime;
use WP_REST_Request;

class GoogleCalendar
{
    private $calendar;

    public function __construct($client)
    {
        $client->setScopes('https://www.googleapis.com/auth/calendar');

        $this->calendar = new Calendar($client);
    }

    // Create Calendar Event
    public function createCalendarEvent($calendarId, $clientId, $date_time, $startDate, $startTime, $attendees, $summary, $description, $event_duration_hours, $event_duration_minutes, $timeZone)
    {
        try {
            if (empty($calendarId)) {
                throw new Exception('A Client ID is required.');
            } else if (empty($clientId)) {
                throw new Exception('A Client ID is required.');
            } else if (empty($dateTime)) {
                throw new Exception('A date time is required.');
            } else if (empty($startDate)) {
                throw new Exception('A start date is required.');
            } else if (empty($startTime)) {
                throw new Exception('A start time is required.');
            } else if (empty($attendees)) {
                throw new Exception('Attendees are required.');
            } else if (empty($summary)) {
                throw new Exception('A summary is required.');
            } else if (empty($description)) {
                throw new Exception('A desciption is required.');
            }

            $end = new DateTime($date_time);
            $end->modify('+' . $event_duration_hours . ' hours');
            $end->modify('+' . $event_duration_minutes . ' minutes');

            $event = new Event(array(
                'summary' => $summary,
                'description' => $description,
                'start' => array(
                    'dateTime' => $date_time,
                    'timeZone' => $timeZone,
                ),
                'end' => array(
                    'dateTime' => $end->format('Y-m-d\TH:i:s'),
                    'timeZone' => $timeZone,
                ),
                'attendees' => array_map(function ($email) {
                    return array('email' => $email);
                }, $attendees),
                'transparency' => 'opaque',
                'visibility' => 'default',
                'status' => 'confirmed',
            ));

            $createdEvent = $this->calendar->events->insert($calendarId, $event);

            return $createdEvent;
        } catch (Exception $e) {
            $error_message = $e->getErrors();
            $status_code = $e->getCode();

            return "Status Code: " . $status_code . " - " . $error_message;
        }
    }

    // Get Calendar Event
    function getCalendarEvent($calendarId, $eventId)
    {
        $event = $this->calendar->events->get($calendarId, $eventId);

        return $event;
    }

    // Get Calendar Events
    function getCalendarEvents($calendarId, $optParams = [])
    {
        $events = $this->calendar->calendarList->get($calendarId, $optParams);

        return $events;
    }

    // Get Available Times for Multiple Calendar Items
    function getAvailableTimes($items, $timeMin, $timeMax, $timeZone, $groupExpansionMax = 5, $calendarExpansionMax = 5)
    {
        try {
            $postBody = new FreeBusyRequest([
                "timeMin" => $timeMin,
                "timeMax" => $timeMax,
                "timeZone" => $timeZone,
                "groupExpansionMax" => $groupExpansionMax,
                "calendarExpansionMax" => $calendarExpansionMax,
                "items" => $items
            ]);

            $busyTimes = $this->calendar->freebusy->query($postBody)->getCalendars()['jclyonsenterprises@gmail.com']->getBusy();
return $busyTimes;
            // Initialize an array to store busy times for each calendar item
            // $busyTimesForItems = [];

            // foreach ($items as $item) {
            //     $busyTimesForItem = $busyTimes->getCalendars()[$item]->getBusy();
            //     $busyTimesForItems[$item] = $busyTimesForItem;
            // }

            // return $busyTimesForItems;
        } catch (Exception $e) {
            error_log($e->getMessage());
            throw new Exception($e->getMessage());
        }
    }

    // Update Calendar Event
    function updateEvent($calendarId, $eventId, $event)
    {
        $updatedEvent = $this->calendar->events->update($calendarId, $eventId, $event, $optParams = []);

        return $updatedEvent;
    }

    // Cancel Calendar Event
    function cancelEvent($calendarId, $eventId, $optParams = [])
    {
        $cancelledEvent = $this->calendar->events->delete($calendarId, $eventId, $optParams = []);

        return $cancelledEvent;
    }
}
