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
            register_rest_route('orb/v1', '/office-hours', array(
                'methods' => 'GET',
                'callback' => array($this, 'get_office_hours'),
                'permission_callback' => '__return_true',
            ));
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/schedule/events/invite', array(
                'methods' => 'POST',
                'callback' => array($this, 'send_invite'),
                'permission_callback' => '__return_true',
            ));
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/schedule/event/(?P<slug>[a-zA-Z0-9-_]+)', array(
                'methods' => 'GET',
                'callback' => array($this, 'get_event'),
                'permission_callback' => '__return_true',
            ));
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/schedule/events/(?P<slug>[a-zA-Z0-9-_]+)', array(
                'methods' => 'GET',
                'callback' => array($this, 'get_events'),
                'permission_callback' => '__return_true',
            ));
        });
    }

    public function get_office_hours(WP_REST_Request $request)
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
            !isset($eventData['client_id']) ||
            !isset($eventData['description']) ||
            !isset($eventData['start']) ||
            !isset($eventData['start_date']) ||
            !isset($eventData['start_time']) ||
            !isset($eventData['attendees']) ||
            !isset($eventData['description'])
        ) {
            throw new Exception('Invalid event data.');
        }

        $invoice_id = $eventData['description'];
        $start = $eventData['start'];
        $end = new DateTime($start);
        $end->modify('+' . $event_duration_hours . ' hours');
        $end->modify('+' . $event_duration_minutes . ' minutes');

        $event = new Event(array(
            'summary' => get_option('orb_event_summary'),
            'description' => $invoice_id,
            'start' => array(
                'dateTime' => $start,
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

        global $wpdb;

        $table_name = 'orb_schedule';
        $result = $wpdb->insert(
            $table_name,
            [
                'client_id' => $eventData['client_id'],
                'invoice_id' => $eventData['description'],
                'google_event_id' => $createdEvent->id,
                'start_date' => $eventData['start_date'],
                'start_time' => $eventData['start_time'],
                'attendees' => $createdEvent->getAttendees(),
                'calendar_link' => $createdEvent->htmlLink,
            ]
        );

        if (!$result) {
            $error_message = $wpdb->last_error;
            return rest_ensure_response($error_message);
        }

        $schedule_id = $wpdb->insert_id;

        return rest_ensure_response($schedule_id);
    } catch (Exception $e) {
        // In case of an exception, return the error as the response
        return rest_ensure_response($e->getMessage());
    }
}

    public function get_event(WP_REST_Request $request)
    {
        $id = $request->get_param('slug');

        if (empty($id)) {
            return rest_ensure_response('invalid_invoice_id', 'Invalid invoice ID', array('status' => 400));
        }

        global $wpdb;

        $event = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM orb_schedule WHERE invoice_id = %d",
                $id
            )
        );

        if (!$event) {
            return rest_ensure_response('event_not_found', 'Event not found', array('status' => 404));
        }

        $eventData = [
            'schedule_id' => $event->id,
            'client_id' => $event->client_id,
            'google_event_id' => $event->google_event_id,
            'invoice_id' => $event->invoice_id,
            'start_date' => $event->start_date,
            'start_time' => $event->start_time,
            'attendees' => $event->attendees,
            'calendar_link' => $event->calendar_link,
        ];

        return rest_ensure_response($eventData);
    }

    public function get_events(WP_REST_Request $request)
    {
        $id = $request->get_param('slug');

        if (empty($id)) {
            return rest_ensure_response('invalid_client_id', 'Invalid Client ID', array('status' => 400));
        }

        global $wpdb;

        $events = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM orb_schedule WHERE client_id = %d",
                $id
            )
        );

        if (!$events) {
            return rest_ensure_response('no_events_not_found', 'No Events not found', array('status' => 404));
        }

        return rest_ensure_response($events, 200);
    }
}
