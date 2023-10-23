<section class="orb-services-admin">
    <h1>Support Email</h1>

    <?php settings_errors(); ?>
    <form method="post" action="options.php">
        <?php settings_fields('orb-admin-support-email-group'); ?>
        <?php do_settings_sections('orb_support_email_settings'); ?>
        <?php submit_button(); ?>
    </form>
</section>