<?php

namespace ORB_Services\Schedule;

use ORB_SERVICES\API\Google\GoogleCalendar;

use Exception;

class Schedule
{
    private $orb_office_hours;
    private $google_calendar;
    private $event_duration_hours;
    private $event_duration_minutes;
    private $timeZone;
    private $calendar_id;
    private $maxResults;
    private $summary;

    public function __construct($client)
    {
        $this->orb_office_hours = get_option('orb_office_hours');
        $this->google_calendar = new GoogleCalendar($client);

        $this->event_duration_hours = intval(get_option('orb_event_duration_hours'));
        $this->event_duration_minutes = intval(get_option('orb_event_duration_minutes'));
        $this->timeZone = get_option('orb_event_time_zone');
        $this->calendar_id = get_option('orb_calendar_id');
        $this->maxResults = intval(get_option('orb_event_max_results'));
        $this->summary = get_option('orb_event_summary');
    }

    public function getOfficeHours()
    {
        try {
            if (empty($this->orb_office_hours)) {
                throw new Exception('Office hours were not selected yet.');
            }

            $office_hours = array();

            $days = array(
                'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'
            );

            foreach ($days as $day) {
                $start_time = isset($this->orb_office_hours["{$day}_start"]) ? $this->orb_office_hours["{$day}_start"] : '';
                $end_time = isset($this->orb_office_hours["{$day}_end"]) ? $this->orb_office_hours["{$day}_end"] : '';

                $office_hours[] = array(
                    'day' => $day,
                    'start' => $start_time,
                    'end' => $end_time,
                );
            }

            return $office_hours;
        } catch (Exception $e) {
            error_log($e->getMessage());
            return $e->getMessage();
        }
    }
    
    // Get Calendar Events by Client

}
