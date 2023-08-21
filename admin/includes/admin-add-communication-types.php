<h1>Administration Options</h1>

<?php settings_errors(); ?>
<?php
global $wpdb;
$table_name = 'orb_communication_types';
$communication_types = $wpdb->get_results("SELECT * FROM $table_name");
?>

<form method="post" action="/wp-admin/admin.php?page=orb_communication_types">
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
</form>

<?php
add_action('admin_post_handle_communication_form_submission', 'handle_communication_form_submission');

function handle_communication_form_submission()
{
    global $wpdb;
    $table_name = 'orb_communication_types';

    check_admin_referer('handle_communication_form_submission');
    echo "It works";

    foreach ($_POST as $field_name => $field_value) {
        if (strpos($field_name, '_contact') !== false) {
            $type = str_replace('_contact', '', $field_name);
            $contact_info = sanitize_text_field($field_value);

            $wpdb->update(
                $table_name,
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

    if (!empty($new_type) && !empty($new_contact)) {
        $wpdb->insert(
            $table_name,
            array(
                'type' => $new_type,
                'contact_info' => $new_contact,
            )
        );
    }
    echo "Database operations complete!<br>";

    $nonce_url = wp_nonce_url(admin_url('admin.php?page=orb_communication_types'), 'handle_communication_form_submission');
    wp_safe_redirect($nonce_url);
    exit();
}

foreach ($_POST as $field_name => $field_value) {
    if (strpos($field_name, '_contact') !== false) {
        $type = str_replace('_contact', '', $field_name);
        $contact_info = sanitize_text_field($field_value);

        $wpdb->update(
            $table_name,
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
            $table_name,
            array(
                'type' => $new_type,
                'contact_info' => $new_contact,
            )
        );
    }
}
