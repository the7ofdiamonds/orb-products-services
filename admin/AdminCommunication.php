<?php

namespace ORB_Products_Services\Admin;

class AdminCommunication
{
    private $table_name;

    public function __construct()
    {
        $this->table_name = 'orb_communication_types';
        add_action('admin_menu', [$this, 'register_custom_menu_page']);
        add_action('admin_post_handle_communication_form_submission', [$this, 'handle_communication_form_submission']);
        add_action('wp_ajax_remove_communication_type', [$this, 'remove_communication_type_callback']);
    }

    function register_custom_menu_page()
    {
        add_submenu_page('orb_services', 'Add Communication Preferences', 'Add Contact', 'manage_options', 'orb_communication_types', [$this, 'create_section'], 4);
        add_action('admin_init', [$this, 'register_section']);
    }

    function create_section()
    {
        include ORB_PRODUCTS_SERVICES . 'Admin/includes/admin-add-communication-types.php';
    }

    function register_section()
    {
        add_settings_section('orb-admin-communication-types', '', [$this, 'section_description'], 'orb_communication_types');
        register_setting('orb-admin-communication-types-group', 'orb_communication_types');
        add_settings_field('orb_communication_types', '', [$this, 'communication_types'], 'orb_communication_types', 'orb-admin-communication-types');
    }

    function section_description()
    {
        echo 'Add your preferred communication channels below.';
    }

    public function communication_types()
    {
        global $wpdb;

        $communication_types = $wpdb->get_results("SELECT * FROM $this->table_name");
?>
        <table>
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Contact</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($communication_types as $communication_type) : ?>
                    <tr>
                        <td>
                            <?php echo esc_html($communication_type->type); ?>
                        </td>
                        <td>
                            <input class="admin-input" type="text" name="<?php echo esc_attr($communication_type->type . '_contact'); ?>" value="<?php echo esc_attr($communication_type->contact_info); ?>">
                        </td>
                        <td>
                            <button class="remove-button" type="button" data-type="<?php echo esc_attr($communication_type->type); ?>">Remove</button>
                        </td>
                    </tr>
                <?php endforeach; ?>
                <tr>
                    <td>
                        <input class="admin-input" type="text" name="new_communication_type" placeholder="New Type">
                    </td>
                    <td>
                        <input class="admin-input" type="text" name="new_communication_type_contact" placeholder="New Contact Info">
                    </td>
                    <td></td>
                </tr>
            </tbody>
        </table>
<?php
    }

    function handle_communication_form_submission()
    {
        global $wpdb;

        foreach ($_POST as $field_name => $field_value) {
            if (strpos($field_name, '_contact') !== false) {
                $type = str_replace('_contact', '', $field_name);
                $contact_info = sanitize_text_field($field_value);

                $wpdb->update(
                    $this->table_name,
                    array('contact_info' => $contact_info),
                    array('type' => $type)
                );
            }
        }

        if (isset($_POST['new_communication_type']) && isset($_POST['new_communication_type_contact'])) {
            $new_type = sanitize_text_field($_POST['new_communication_type']);
            $new_contact = sanitize_text_field($_POST['new_communication_type_contact']);

            if (!empty($new_type) && !empty($new_contact)) {
                $wpdb->insert(
                    $this->table_name,
                    array(
                        'type' => $new_type,
                        'contact_info' => $new_contact,
                    )
                );
            }
        }
    }

    public function remove_communication_type($type)
    {
        global $wpdb;
        $type = sanitize_text_field($type);

        $wpdb->delete(
            $this->table_name,
            array('type' => $type)
        );
    }

    function remove_communication_type_callback()
    {
        if (!isset($_POST['communication_type'])) {
            wp_send_json_error('Communication type not specified.');
        }

        $communication_type = sanitize_text_field($_POST['communication_type']);

        $this->remove_communication_type($communication_type);

        wp_send_json_success('Communication type removed successfully.');
    }
}
