<?php

namespace ORB_Services\Database;

class DatabaseClient
{
    private $wpdb;
    private $table_name;

    public function __construct()
    {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->table_name = 'orb_client';
    }

    public function saveClient($user_id, $stripe_customer_id, $company_name = '', $first_name = '', $last_name = '')
    {
        $result = $this->wpdb->insert(
            $this->table_name,
            [
                'user_id' => $user_id,
                'stripe_customer_id' => $stripe_customer_id,
                'company_name' => $company_name,
                'first_name' => $first_name,
                'last_name' => $last_name,
            ]
        );

        if (!$result) {
            $error_message = $this->wpdb->last_error;
            return rest_ensure_response($error_message);
        }

        $client_id = $this->wpdb->insert_id;

        return $client_id;
    }

    public function getClient($user_id)
    {
        $client = $this->wpdb->get_row(
            $this->wpdb->prepare(
                "SELECT * FROM {$this->table_name} WHERE user_id = %d",
                $user_id
            )
        );

        if ($client === null) {
            return rest_ensure_response('Client not found');
        }

        $client_data = [
            'id' => $client->id,
            'user_id' => $client->user_id,
            'stripe_customer_id' => $client->stripe_customer_id,
            'company_name' => $client->company_name,
            'first_name' => $client->first_name,
            'last_name' => $client->last_name,
        ];

        return $client_data;
    }

    public function updateClient($stripe_customer_id, $company_name = '', $first_name = '', $last_name = '')
    {

        $data = array(
            'company_name' => $company_name,
            'first_name' => $first_name,
            'last_name' => $last_name
        );

        $where = array(
            'stripe_customer_id' => $stripe_customer_id,
        );

        if (!empty($data)) {
            $updated = $this->wpdb->update($this->table_name, $data, $where);
        }

        if ($updated === false) {
            $error_message = $this->wpdb->last_error ?: 'Quote not found';
            $response = rest_ensure_response($error_message);
            $response->set_status(404);

            return $response;
        }

        return $updated;
    }
}
