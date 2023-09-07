<section class="orb-services-admin">
    <h1>Invoice Email</h1>

    <?php settings_errors(); ?>
    <form method="post" action="options.php">
        <?php settings_fields('orb-admin-invoice-email-group'); ?>
        <?php do_settings_sections('orb_invoice_email_settings'); ?>
        <?php submit_button(); ?>
    </form>
</section>