<?php

namespace ORB_Services\Schedule;

use Exception;
use DateTime;

use ORB_SERVICES\API\Google\GoogleCalendar;

use Google\Service\Calendar;
use Google\Service\Calendar\TimePeriod;

class Schedule
{
    private $calendar;
    public $google_calendar;
    public $timeZone;
    public $calendar_id;
    public $groupExpansionMax;
    public $calendarExpansionMax;
    private $orb_office_hours;
    public $asSoon;
    public $earliestTime;
    public $asFar;
    public $latestTime;
    private $event_duration_hours;
    private $event_duration_minutes;
    private $maxResults;
    private $summary;

    public function __construct($credentialsPath)
    {
        $this->orb_office_hours = get_option('orb_office_hours');
        $this->calendar = new Calendar($credentialsPath);
        $this->google_calendar = new GoogleCalendar($credentialsPath);

        $this->event_duration_hours = intval(get_option('orb_event_duration_hours'));
        $this->event_duration_minutes = intval(get_option('orb_event_duration_minutes'));
        $this->timeZone = get_option('orb_event_time_zone');
        $this->calendar_id = get_option('orb_calendar_id');
        $this->groupExpansionMax = 5;
        $this->calendarExpansionMax = 5;
        $this->asSoon = '+1 day';
        $this->earliestTime = '08:00:00';
        $this->asFar = '+1 week';
        $this->latestTime = '17:00:00';
        $this->maxResults = intval(get_option('orb_event_max_results'));
        $this->summary = get_option('orb_event_summary');
    }

    public function getOfficeHours()
    {
        try {
            if (empty($this->orb_office_hours)) {
                throw new Exception('Office hours have not been selected yet.');
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

    function getTimeStamp($dateTime)
    {
        $date = explode('T', $dateTime)[0];
        $time = explode('-', explode('T', $dateTime)[1])[0];

        $dateTime = new DateTime($date . ' ' . $time);
        $timestamp = $dateTime->getTimestamp();

        return $timestamp;
    }

    function getBusyTimes($postBody)
    {
        try {
            $busyTimes = $this->calendar->freebusy->query($postBody)->getCalendars();

            $availableTimesForItems = [];

            foreach ($busyTimes as $calendarId => $busyTimeInfo) {
                $busyTimesForItem = $busyTimeInfo['busy'];

                $startEndTimes = [];

                foreach ($busyTimesForItem as $busyTime) {
                    $start = $busyTime['start'];
                    $end = $busyTime['end'];

                    $startTimestamp = $this->getTimeStamp($start);
                    $dayOfWeek = strtoupper(substr(date("l", $startTimestamp), 0, 3));
                    $endTimestamp = $this->getTimeStamp($end);

                    $startEndTimes[] = [
                        'day' => $dayOfWeek,
                        'start' => $startTimestamp,
                        'end' => $endTimestamp
                    ];
                }

                $availableTimesForItems[$calendarId] = $startEndTimes;
            }

            return $availableTimesForItems;
        } catch (Exception $e) {
            $error_message = $e->getMessage();
            $status_code = $e->getCode();

            error_log("Error in findAvailableTimes: Status Code $status_code - $error_message");

            throw new Exception("Status Code: $status_code - $error_message");
        }
    }

    function findGapsBetweenBusyTimes($officeHours, $busyTimes)
    {
        // Initialize an array to store available times
        $availableTimes = [];

        foreach ($busyTimes as $calendarId => $busyTimesForItem) {
            // Initialize an array to store available times for the current calendar
            $availableTimesForCalendar = [];

            foreach ($officeHours as $officeHour) {
                // Get the day of the week and office hour start and end timestamps
                $dayOfWeek = $officeHour['day'];
                $officeHourStart = strtotime($officeHour['start']);
                $officeHourEnd = strtotime($officeHour['end']);

                // Find available times for the current office hour and busy times
                foreach ($busyTimesForItem as $busyTime) {
                    // Check if the busy time matches the current day of the week
                    if ($busyTime['day'] === $dayOfWeek) {
                        // Calculate the overlap between busy time and office hour
                        $overlapStart = max($officeHourStart, $busyTime['start']);
                        $overlapEnd = min($officeHourEnd, $busyTime['end']);

                        // If there's no overlap, it's an available time
                        if ($overlapStart >= $overlapEnd) {
                            $availableTimesForCalendar[] = [
                                'day' => $dayOfWeek,
                                'start' => $officeHourStart,
                                'end' => $officeHourEnd,
                            ];
                        } else {
                            // Otherwise, update the office hour based on the overlap
                            if ($overlapStart > $officeHourStart) {
                                $officeHourStart = $overlapEnd;
                            } else {
                                $officeHourEnd = $overlapStart;
                            }
                        }
                    }
                }
            }

            $availableTimes[$calendarId] = $availableTimesForCalendar;
        }

        return $availableTimes;
    }


    function getAvailableTimes($postBody)
    {
        try {
            $officeHours = $this->getOfficeHours();
            $busyTimes = $this->getBusyTimes($postBody);

            $availableTimes = $this->findGapsBetweenBusyTimes($officeHours, $busyTimes);

            return $availableTimes;
        } catch (Exception $e) {
            $error_message = $e->getMessage();
            $status_code = $e->getCode();

            error_log("Error in getAvailableTimes: Status Code $status_code - $error_message");

            throw new Exception("Status Code: $status_code - $error_message");
        }
    }
}
