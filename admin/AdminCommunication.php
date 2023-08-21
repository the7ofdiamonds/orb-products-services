<?php

namespace ORB_Services\Admin;

class AdminCommunication
{
    private $table_name;

    public function __construct()
    {
        $this->table_name = 'orb_communication_types';
        add_action('admin_menu', [$this, 'register_custom_menu_page']);
        add_action('admin_post_handle_communication_form_submission', [$this, 'handle_communication_form_submission']);
    }

    function register_custom_menu_page()
    {
        add_submenu_page('orb_services', 'Add Communication Preferences', 'Add Contact', 'manage_options', 'orb_communication_types', [$this, 'create_section'], 30);
        add_action('admin_init', [$this, 'register_section']);
    }

    function create_section()
    {
        include ORB_SERVICES . 'Admin/includes/admin-add-communication-types.php';
    }

    function register_section()
    {
        add_settings_section('orb-admin-communication-types', 'Add Office Hours', [$this, 'section_description'], 'orb_communication_types');
        register_setting('orb-admin-communication-types-group', 'orb_communication_types');
        add_settings_field('orb_communication_types', 'Add Preferred Communcation Types', [$this, 'communication_types'], 'orb_communication_types', 'orb-admin-communication-types');
    }

    function section_description()
    {
        echo 'Add your preferred communication channels';
    }

    function communication_types()
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
                            <input type="text" name="<?php echo esc_attr($communication_type->type . '_contact'); ?>" value="<?php echo esc_attr($communication_type->contact_info); ?>">
                        </td>
                    </tr>
                <?php endforeach; ?>
                <tr>
                    <td>
                        <input type="text" name="new_communication_type" placeholder="New Type">
                    </td>
                    <td>
                        <input type="text" name="new_communication_type_contact" placeholder="New Contact Info">
                    </td>
                </tr>
            </tbody>
        </table>
        <input type="hidden" name="action" value="handle_communication_form_submission">
        <input type="submit" value="Submit">
<?php
    }

    function handle_communication_form_submission()
    {
        global $wpdb;

        check_admin_referer('handle_communication_form_submission');
        echo "It works";

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

        $new_type = sanitize_text_field($_POST['new_communication_type']);
        $new_contact = sanitize_text_field($_POST['new_communication_type_contact']);
        if (empty($new_type) && empty($new_contact)) {
            echo "Empty";
        }

        // if (!empty($new_type) && !empty($new_contact)) {
        $wpdb->insert(
            $this->table_name,
            array(
                'type' => $new_type,
                'contact_info' => $new_contact,
            )
        );
        // }
        echo "Database operations complete!<br>";

        $nonce_url = wp_nonce_url(admin_url('admin.php?page=orb_communication_types'), 'handle_communication_form_submission');
        wp_safe_redirect($nonce_url);
        exit();
    }
}
