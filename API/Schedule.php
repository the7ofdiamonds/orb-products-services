<?php

namespace ORB_Services\API;

require_once ORB_SERVICES . 'vendor/autoload.php';

use ORB_Services\Database\DatabaseEvent;

use ORB_Services\API\Google\GoogleCalendar;

use Google\Client;
use Google\Service\Calendar;
use Google\Service\Calendar\Event;
use Google\Service\Exception;

use DateTime;
use WP_REST_Request;

class Schedule
{
    private $credentialsPath;
    private $client;
    private $service;
    private $google_calendar;
    private $event_database;

    public function __construct($credentialsPath)
    {
        $this->credentialsPath = $credentialsPath;
        $this->client = new Client();
        $this->client->setApplicationName('Your Application Name');
        $this->client->setScopes(Calendar::CALENDAR_EVENTS);
        $this->client->setAuthConfig($this->credentialsPath);
        $this->service = new Calendar($this->client);

        global $wpdb;
        $this->event_database = new DatabaseEvent($wpdb);

        $this->google_calendar = new GoogleCalendar($this->client);

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/schedule', array(
                'methods' => 'POST',
                'callback' => array($this, 'create_event'),
                'permission_callback' => '__return_true',
            ));
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/office-hours', array(
                'methods' => 'GET',
                'callback' => array($this, 'get_office_hours'),
                'permission_callback' => '__return_true',
            ));
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/schedule/events', array(
                'methods' => 'GET',
                'callback' => array($this, 'get_available_times'),
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
                'callback' => array($this, 'get_events_by_client_id'),
                'permission_callback' => '__return_true',
            ));
        });

        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/schedule/communication', array(
                'methods' => 'GET',
                'callback' => array($this, 'get_communication_preferences'),
                'permission_callback' => '__return_true',
            ));
        });
    }

    public function create_event(WP_REST_Request $request)
    {
        try {
            $request_body = $request->get_body();
            $body = json_decode($request_body, true);

            if (
                empty($body['client_id']) ||
                empty($body['start']) ||
                empty($body['start_date']) ||
                empty($body['start_time']) ||
                empty($body['attendees'])
            ) {
                throw new Exception('Invalid event data.');
            }

            $client_id = $body['client_id'];
            $date_time =  $body['start'];
            $startDate = $body['start_date'];
            $startTime = $body['start_time'];
            $attendees = $body['attendees'];

            
            $start = $body['start'];
            $event_duration_hours = intval(get_option('orb_event_duration_hours'));
            $event_duration_minutes = intval(get_option('orb_event_duration_minutes'));

            $end = new DateTime($start);
            $end->modify('+' . $event_duration_hours . ' hours');
            $end->modify('+' . $event_duration_minutes . ' minutes');

            $summary = $body['summary'];
            $description = $body['description'];

            $timeZone = get_option('orb_event_time_zone');

            $event = new Event(array(
                'summary' => $summary,
                'description' => $description,
                'start' => array(
                    'dateTime' => $start,
                    'timeZone' => $timeZone,
                ),
                'end' => array(
                    'dateTime' => $end->format('Y-m-d\TH:i:s'),
                    'timeZone' => $timeZone,
                ),
                'attendees' => array_map(function ($email) {
                    return array('email' => $email);
                }, $body['attendees']),
                'transparency' => 'opaque',
                'visibility' => 'default',
                'status' => 'confirmed',
            ));

            $calendarId = get_option('orb_calendar_id');

            $createdEvent = $this->google_calendar->createCalendarEvent($calendarId, $client_id, $date_time, $startDate, $startTime, $attendees, $summary, $description, $event_duration_hours, $event_duration_minutes, $timeZone);

            $event_id = $this->event_database->saveEvent($client_id, $createdEvent);

            return rest_ensure_response($event_id);
        } catch (Exception $e) {
            $error_message = $e->getErrors();
            $status_code = $e->getCode();

            $response_data = [
                'message' => $error_message,
                'status' => $status_code
            ];

            $response = rest_ensure_response($response_data);
            $response->set_status($status_code);

            return $response;
        }
    }

    public function get_office_hours()
    {
        try {
            $orb_office_hours = get_option('orb_office_hours');
            $office_hours = array();

            $days = array(
                'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'
            );

            foreach ($days as $day) {
                $start_time = isset($orb_office_hours["{$day}_start"]) ? $orb_office_hours["{$day}_start"] : '';
                $end_time = isset($orb_office_hours["{$day}_end"]) ? $orb_office_hours["{$day}_end"] : '';

                $office_hours[] = array(
                    'day' => $day,
                    'start' => $start_time,
                    'end' => $end_time,
                );
            }

            return rest_ensure_response($office_hours);
        } catch (Exception $e) {
            $msg = $e->getMessage();
            $message = [
                'message' => $msg,
            ];
            $response = rest_ensure_response($message);
            $response->set_status(404);

            return $response;
        }
    }

    public function get_available_times(WP_REST_Request $request)
    {
        $timeZone = get_option('orb_event_time_zone');
        $calendar_id = get_option('orb_calendar_id');

        $maxResults = intval(get_option('orb_event_max_results'));
        $summary = get_option('orb_event_summary');
        $calendarId = get_option('orb_calendar_id');

        $items = [
            $calendar_id
        ];
        $timeMin = '2023-09-15T08:00:00Z';
        $timeMax = '2023-09-22T17:00:00Z';
        $availableTimes = $this->google_calendar->getAvailableTimes($items, $timeMin, $timeMax, $timeZone);

        return rest_ensure_response($availableTimes);
    }

    public function get_event(WP_REST_Request $request)
    {
        $id = $request->get_param('slug');

        if (empty($id)) {
            return rest_ensure_response('invalid_invoice_id', 'Invalid invoice ID', array('status' => 400));
        }

        $event = $this->event_database->getEvent($id);

        return rest_ensure_response($event);
    }

    public function get_events_by_client_id(WP_REST_Request $request)
    {
        $client_id = $request->get_param('slug');

        if (empty($client_id)) {
            return rest_ensure_response('invalid_client_id', 'Invalid Client ID', array('status' => 400));
        }

        $events = $this->event_database->getEventsByClientID($client_id);

        return rest_ensure_response($events);
    }

    function get_communication_preferences()
    {
        global $wpdb;

        $communication_types = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM orb_communication_types",
            )
        );

        if (!$communication_types) {
            $error_message = 'No Communication Types found';
            $status_code = 404;

            $response_data = [
                'message' => $error_message,
                'status' => $status_code
            ];

            $response = rest_ensure_response($response_data);
            $response->set_status($status_code);

            return $response;
        }

        return rest_ensure_response($communication_types);
    }
}
