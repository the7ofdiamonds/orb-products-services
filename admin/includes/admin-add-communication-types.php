<section class="orb-services-admin">
    <h1>Contact</h1>
    <?php
    require_once ORB_SERVICES . 'Admin/AdminCommunication.php';

    use ORB_Services\Admin\AdminCommunication;

    $admin_communication = new AdminCommunication();

    global $wpdb;
    $table_name = 'orb_communication_types';
    $nonce_action = 'handle_communication_form_submission';

    if (isset($_POST)) {
        $admin_communication->handle_communication_form_submission($_POST);
    }

    settings_errors();
    ?>
    <form method="post" action="/wp-admin/admin.php?page=orb_communication_types">
        <?php settings_fields('orb-admin-communication-types-group'); ?>
        <?php do_settings_sections('orb_communication_types'); ?>
        <?php submit_button(); ?>
    </form>
</section>

<script>
    jQuery(document).ready(function($) {
        $('.remove-button').on('click', function() {
            var typeToRemove = $(this).data('type');
            var confirmation = confirm('Are you sure you want to remove this communication type?');

            if (confirmation) {
                // Perform AJAX request to remove the communication type
                $.ajax({
                    type: 'POST',
                    url: ajaxurl,
                    data: {
                        action: 'remove_communication_type',
                        communication_type: typeToRemove,
                    },
                    success: function(response) {
                        // Reload the page after successful removal
                        location.reload();
                    }
                });
            }
        });
    });
</script>