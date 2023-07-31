<?php

namespace ORB_Services\API;

require_once ORB_SERVICES . 'vendor/autoload.php';

use Google\Client;
use Google\Service\Calendar;
use Google\Service\Calendar\Event;
use Google\Service\Exception;

use DateTime;
use WP_REST_Request;

class Schedule
{
    private $client;
    private $service;

    public function __construct()
    {
        $credentialsPath = ORB_SERVICES . 'API/serviceAccount.json';
        $this->client = new Client();
        $this->client->setApplicationName('Your Application Name');
        $this->client->setScopes(Calendar::CALENDAR_EVENTS);
        $this->client->setAuthConfig($credentialsPath);
        $this->service = new Calendar($this->client);

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/schedule', array(
                'methods' => 'GET',
                'callback' => array($this, 'get_schedule'),
                'permission_callback' => '__return_true',
            ));
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/schedule/invite', array(
                'methods' => 'POST',
                'callback' => array($this, 'send_invite'),
                'permission_callback' => '__return_true',
            ));
        });
    }

    public function get_schedule(WP_REST_Request $request)
    {
        $maxResults = intval(get_option('orb_event_max_results'));
        $calendarId = get_option('orb_calendar_id');

        $optParams = array(
            'maxResults' => $maxResults,
            'orderBy' => 'startTime',
            'singleEvents' => true,
            'timeMin' => date('c'),
        );

        $events = $this->service->events->listEvents($calendarId, $optParams);

        if (count($events->getItems()) == 0) {
            return "No upcoming events found.";
        } else {
            $upcomingEvents = array();
            foreach ($events->getItems() as $event) {
                $start = $event->getStart()->dateTime;
                if (empty($start)) {
                    $start = $event->getStart()->date;
                }
                $upcomingEvents[] = array(
                    'start' => $start,
                    'summary' => $event->getSummary(),
                );
            }
            return rest_ensure_response($upcomingEvents);
        }
    }

    public function send_invite(WP_REST_Request $request)
    {
        try {
            $eventData = $request->get_params();
            $event_duration_hours = intval(get_option('orb_event_duration_hours'));
            $event_duration_minutes = intval(get_option('orb_event_duration_minutes'));

            if (
                !isset($eventData['description']) ||
                !isset($eventData['start']) ||
                !isset($eventData['attendees'])
            ) {
                throw new Exception('Invalid event data.');
            }

            $end = new DateTime($eventData['start']);
            $end->modify('+' . $event_duration_hours . ' hours');
            $end->modify('+' . $event_duration_minutes . ' minutes');

            $event = new Event(array(
                'summary' => get_option('orb_event_summary'),
                'description' => $eventData['description'],
                'start' => array(
                    'dateTime' => $eventData['start'],
                    'timeZone' => get_option('orb_event_time_zone'),
                ),
                'end' => array(
                    'dateTime' => $end->format('Y-m-d\TH:i:s'),
                    'timeZone' => get_option('orb_event_time_zone'),
                ),
                'attendees' => array_map(function ($email) {
                    return array('email' => $email);
                }, $eventData['attendees']),
                'transparency' => 'opaque',
                'status' => 'confirmed',
            ));

            $calendarId = get_option('orb_calendar_id');

            $createdEvent = $this->service->events->insert($calendarId, $event);

            return rest_ensure_response($createdEvent);
        } catch (Exception $e) {
            error_log('Error creating event: ' . $e->getMessage());
            return rest_ensure_response('Error creating event: ' . $e->getMessage());
        }
    }
}
