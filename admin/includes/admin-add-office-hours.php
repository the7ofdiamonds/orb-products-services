<h1>Administration Options</h1>

<?php settings_errors(); ?>
<form method="post" action="options.php">
    <?php settings_fields( 'orb-admin-office-hours-group' ); ?>
    <?php do_settings_sections( 'orb_office_hours' ); ?>
    <?php submit_button(); ?>
</form>