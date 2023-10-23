<section class="orb-services-admin">
    <h1>Stripe Options</h1>

    <?php settings_errors(); ?>
    <form method="post" action="options.php">
        <?php settings_fields('stripe-options-group'); ?>
        <?php do_settings_sections('stripe_options'); ?>
        <?php submit_button(); ?>
    </form>
</section>