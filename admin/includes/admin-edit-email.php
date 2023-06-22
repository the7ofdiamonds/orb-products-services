<h1>Administration Options</h1>

<?php settings_errors(); ?>
<form method="post" action="options.php">
    <?php settings_fields( 'orb-admin-email-group' ); ?>
    <?php do_settings_sections( 'orb_email_smtp' ); ?>
    <?php submit_button(); ?>
</form>