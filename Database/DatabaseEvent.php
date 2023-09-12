<?php

namespace ORB_Services\Database;

use Exception;

class DatabaseEvent
{
    private $wpdb;
    private $table_name;

    public function __construct($wpdb)
    {
        $this->wpdb = $wpdb;
        $this->table_name = 'orb_schedule';
    }

    public function saveEvent($client_id, $createdEvent)
    {
        $result = $result = $this->wpdb->insert(
            $this->table_name,
            [
                'client_id' => $client_id,
                'summary' => $createdEvent->summary,
                'description' => $createdEvent->description,
                'google_event_id' => $createdEvent->id,
                'start_date' => $createdEvent->start_date,
                'start_time' => $createdEvent->start_time,
                'calendar_link' => $createdEvent->htmlLink,
            ]
        );

        if (!$result) {
            $error_message = $this->wpdb->last_error;
            throw new Exception($error_message);
        }

        $event_id = $this->wpdb->insert_id;

        return $event_id;
    }

    public function getEvent($id)
    {

        if (empty($id)) {
            throw new Exception('ID is required.');
        }

        $event = $this->wpdb->get_row(
            $this->wpdb->prepare(
                "SELECT * FROM $this->table_name WHERE id = %d",
                $id
            )
        );

        if (!$event) {
            throw new Exception('Event not found');
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

        return $eventData;
    }

    public function getEventsByClientID($client_id)
    {

        if (empty($client_id)) {
            throw new Exception('A Client ID is required');
        }

        global $wpdb;

        $events = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM {$this->table_name} WHERE client_id = %d",
                $client_id
            )
        );

        if (!$events) {
            throw new Exception('No events can be found for this client.');
        }

        return $events;
    }

    function updateEvent()
    {
    }

    function cancelEvent()
    {
    }
}
