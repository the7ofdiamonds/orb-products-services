<?php

namespace ORB_Services\Schedule;

use Exception;
use DateTime;

use ORB_SERVICES\API\Google\GoogleCalendar;

use Google\Service\Calendar;

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

    function getBusyTimesTimeStamp($dateTime)
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

                    $startTimestamp = $this->getBusyTimesTimeStamp($start);
                    $dayOfWeek = strtoupper(substr(date("l", $startTimestamp), 0, 3));
                    $endTimestamp = $this->getBusyTimesTimeStamp($end);

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

    function getDateByDayOfWeek($dayOfWeek)
    {
        $currentDate = date('Y-m-d');

        $currentDayOfWeek = strtoupper(substr(date('D', strtotime($currentDate)), 0, 3));

        $daysToAdd = array_search($dayOfWeek, ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']) - array_search($currentDayOfWeek, ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']);

        if ($daysToAdd <= 0) {
            $daysToAdd += 7;
        }

        $nextDate = date('Y-m-d', strtotime($currentDate . " +$daysToAdd days"));

        return $nextDate;
    }

    function getOfficeHoursTimeStamp($dateTime)
    {
        $dateTime = new DateTime($dateTime);
        $timestamp = $dateTime->getTimestamp();

        return $timestamp;
    }

    function getOfficeHoursTimestamps()
    {
        $officeHours = $this->getOfficeHours();

        $officeHoursTimestamps = [];

        foreach ($officeHours as $officeHour) {
            $dayOfWeek = $officeHour['day'];
            $startTime = $officeHour['start'];
            $endTime = $officeHour['end'];

            $date = $this->getDateByDayOfWeek($dayOfWeek);

            if ($startTime !== '') {
                $startTimestamp = $this->getOfficeHoursTimeStamp($date . ' ' . $startTime);
            } else {
                $startTimestamp = '';
            }

            if ($endTime !== '') {
                $endTimestamp = $this->getOfficeHoursTimeStamp($date . ' ' . $endTime);
            } else {
                $endTimestamp = '';
            }

            $officeHoursTimestamps[] = [
                'day' => $dayOfWeek,
                'start' => $startTimestamp,
                'end' => $endTimestamp
            ];
        }

        return $officeHoursTimestamps;
    }

    function formatDateTimeForGoogle($startTimestamp, $endTimestamp)
    {
        $startDateTime = new DateTime('@' . $startTimestamp);
        $endDateTime = new DateTime('@' . $endTimestamp);

        $formattedStartDateTime = $startDateTime->format("Y-m-d\TH:i:s");
        $formattedEndTime = $endDateTime->format("H:i:s");

        return $formattedStartDateTime . '-' . $formattedEndTime;
    }

    function getAvailableTimes($postBody)
    {
        try {
            $officeHoursTimestamps = $this->getOfficeHoursTimestamps();

            $availableTimes = [];

            foreach ($officeHoursTimestamps as $officeHour) {
                if (isset($officeHour['day'], $officeHour['start'], $officeHour['end'])) {
                    $startTimestamp = $officeHour['start'];
                    $endTimestamp = $officeHour['end'];

                    if ($startTimestamp !== '' && $endTimestamp !== '') {

                        $busyTimestamps = $this->getBusyTimes($postBody);

                        $dailyAvailableTimes = [];

                        foreach ($busyTimestamps as $calendarId => $busyTimesForItem) {
                            if ($busyTimesForItem !== []) {

                                foreach ($busyTimesForItem as $busyTimestamp) {
                                    if (isset($busyTimestamp['day'], $busyTimestamp['start'], $busyTimestamp['end'])) {

                                        if ($startTimestamp < $busyTimestamp['start'] && $endTimestamp >= $busyTimestamp['end']) {

                                            $dailyAvailableTimes[] = [
                                                'start' => date("H:i:s", $startTimestamp),
                                                'end' => date("H:i:s", $busyTimestamp['start'])
                                            ];

                                            $startTimestamp = $busyTimestamp['end'];
                                        }
                                    }
                                }
                            }
                        }

                        if ($startTimestamp < $endTimestamp) {
                            $dailyAvailableTimes[] = [
                                'start' => date("H:i:s", $startTimestamp),
                                'end' => date("H:i:s", $endTimestamp)
                            ];            
                        }

                        $date = date('Y-m-d', $startTimestamp);
                        $availableTimes[$date] = $dailyAvailableTimes;
                    }
                }
            }

            return $availableTimes;
        } catch (Exception $e) {
            $error_message = $e->getMessage();
            $status_code = $e->getCode();

            error_log("Error in getAvailableTimes: Status Code $status_code - $error_message");

            throw new Exception("Status Code: $status_code - $error_message");
        }
    }
}
