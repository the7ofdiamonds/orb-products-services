<?php

namespace ORB\Products_Services\Database;

use Exception;

class DatabaseServices
{
    private $wpdb;
    private $table_name;

    public function __construct()
    {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->table_name = 'orb_services';
    }

    function saveService($service)
    {
        $result = $this->wpdb->insert(
            $this->table_name,
            [
                'service_id' => isset($service['service_id']) ? sanitize_text_field($service['service_id']) : '',
                'name' => isset($service['name']) ? sanitize_text_field($service['name']) : '',
                'price' => isset($service['price']) ? sanitize_text_field($service['price']) : '',
                'description' => isset($service['description']) ? sanitize_text_field($service['description']) : '',
                'features_list' => isset($service['features_list']) ? sanitize_text_field($service['features_list']) : '',
                'onboarding_link' => isset($service['onboarding_link']) ? sanitize_text_field($service['onboarding_link']) : '',
                'service_button' => isset($service['service_button']) ? sanitize_text_field($service['service_button']) : '',
                'service_icon' => isset($service['service_icon']) ? sanitize_text_field($service['service_icon']) : ''
            ]
        );

        if (!$result) {
            $error_message = $this->wpdb->last_error;
            throw new Exception($error_message);
        }

        $service_id = $this->wpdb->insert_id;

        return $service_id;
    }

    function getService($service_id)
    {
        try {
            $service = $this->wpdb->get_row(
                $this->wpdb->prepare(
                    "SELECT * FROM {$this->table_name} WHERE service_id = %d",
                    $service_id
                )
            );

            if ($service === null) {
                throw new Exception('Project not found', 404);
            }

            $service_data = [
                'id' => $service->id,
                'service_id' => $service->service_id,
                'name' => $service->name,
                'price' => $service->price,
                'description' => $service->description,
                'features_list' => $service->features_list,
                'onboarding_link' => $service->onboarding_link,
                'service_button' => $service->service_button,
                'service_icon' => $service->service_icon,
                'stripe_price_id' => $service->stripe_price_id
            ];

            return $service_data;
        } catch (Exception $e) {
            $errorMessage = $e->getMessage();
            $errorCode = $e->getCode();
            $response = $errorMessage . ' ' . $errorCode;

            return $response;
        }
    }

    function updateService($service_id, $service)
    {
        if (isset($service) && is_array($service) && count($service) > 0) {
            $data = array(
                'name' => $service['name'],
                'price' => $service['price'],
                'description' => $service['description'],
                'features_list' => serialize($service['features_list']),
                'onboarding_link' => $service['onboarding_link'],
                'service_button' => $service['service_button'],
                'service_icon' => $service['service_icon']
            );
        } else {
            throw new Exception('Invalid Project Data', 400);
        }

        $where = array(
            'service_id' => $service_id,
        );

        $data = array_filter($data, function ($value) {
            return $value !== null;
        });

        if (!empty($data)) {
            $updated = $this->wpdb->update($this->table_name, $data, $where);

            if ($updated === false) {
                $last_error = $this->wpdb->last_error;
                throw new Exception('Failed to update service data : ' . $last_error);
            }

            return 'Service updated successfully';
        } else {

            throw new Exception('No valid service data provided for update');
        }
    }

    function deleteService()
    {
    }
}
