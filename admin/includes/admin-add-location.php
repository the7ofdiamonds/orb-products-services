<h1>Administration Options</h1>

<?php settings_errors(); ?>
<form method="post" action="options.php">
    <?php settings_fields( 'orb-admin-location-group' ); ?>
    <?php do_settings_sections( 'orb_location' ); ?>
    <?php submit_button(); ?>
</form>