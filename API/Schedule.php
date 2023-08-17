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
            register_rest_route('orb/v1', '/schedule/events', array(
                'methods' => 'GET',
                'callback' => array($this, 'get_available_times'),
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
        $maxResults = intval(get_option('orb_event_max_results'));
        $summary = get_option('orb_event_summary');
        $calendarId = get_option('orb_calendar_id');

        $optParams = array(
            'maxResults' => $maxResults,
            'orderBy' => 'startTime',
            'singleEvents' => true,
            'timeMin' => date('c'),
            'q' => '-summary: ' . $summary
        );

        $events = $this->service->events->listEvents($calendarId, $optParams);

        if (count($events->getItems()) == 0) {
            return "No upcoming events found.";
        } else {
            $upcomingEvents = array();
            $currentTime = time();

            foreach ($events->getItems() as $event) {
                $start = $event->getStart()->dateTime;
                if (empty($start)) {
                    $start = $event->getStart()->date;
                }

                // Convert start time to timestamp
                $startTimeStamp = strtotime($start);

                // Skip events that have already occurred or are marked as busy
                if ($startTimeStamp <= $currentTime || $event->transparency === 'opaque') {
                    continue;
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
            $request_body = $request->get_body();
            $body = json_decode($request_body, true);

            if (
                !isset($body['client_id']) ||
                !isset($body['start']) ||
                !isset($body['start_date']) ||
                !isset($body['start_time']) ||
                !isset($body['attendees'])
            ) {
                throw new Exception('Invalid event data.');
            }

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

            $createdEvent = $this->service->events->insert($calendarId, $event);

            global $wpdb;

            $table_name = 'orb_schedule';
            $result = $wpdb->insert(
                $table_name,
                [
                    'client_id' => $body['client_id'],
                    'summary' => $createdEvent->summary,
                    'description' => $createdEvent->description,
                    'google_event_id' => $createdEvent->id,
                    'start_date' => $body['start_date'],
                    'start_time' => $body['start_time'],
                    'calendar_link' => $createdEvent->htmlLink,
                ]
            );

            if (!$result) {
                $error_message = $wpdb->last_error;
                $message = [
                    'message' => $error_message,
                ];

                $response = rest_ensure_response($message);
                $response->set_status(404);

                return $response;
            }

            $event_id = $wpdb->insert_id;

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
