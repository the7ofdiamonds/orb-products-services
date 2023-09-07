<section class="orb-services-admin">
    <h1>Schedule Email</h1>

    <?php settings_errors(); ?>
    <form method="post" action="options.php">
        <?php settings_fields('orb-admin-schedule-email-group'); ?>
        <?php do_settings_sections('orb_schedule_email_settings'); ?>
        <?php submit_button(); ?>
    </form>
</section>