<?php

namespace ORB_Products_Services\API;

use Exception;
use WP_REST_Request;

use ORB_Products_Services\API\Google\GoogleCalendar;
use ORB_Products_Services\Schedule\Schedule;

use Google\Service\Calendar\CalendarListEntry;

class Calendar
{
    private $calendar_id;
    private $google_calendar;
    private $schedule;

    public function __construct($client)
    {
        add_action('rest_api_init', function () {
            register_rest_route('orb/v1', '/calendar', array(
                'methods' => 'POST',
                'callback' => array($this, 'create_calendar'),
                'permission_callback' => '__return_true',
            ));
        });

        $this->google_calendar = new GoogleCalendar($client);
        $this->schedule = new Schedule($client);

        $this->calendar_id = $this->schedule->calendar_id;
    }

    public function create_calendar(WP_REST_Request $request)
    {
        try {
            $calendarListEntry = new CalendarListEntry();
            $calendarListEntry->setId($this->calendar_id);
            $createdCalendar = $this->google_calendar->createCalendar($calendarListEntry, $optParams = []);

            return rest_ensure_response($createdCalendar);
        } catch (Exception $e) {
            $error_message = $e->getMessage();
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
}
