<section class="orb-services-admin">
    <h1>Hero Section</h1>

    <?php settings_errors(); ?>
    <form method="post" action="options.php">
        <?php settings_fields('orb-admin-hero-group'); ?>
        <?php do_settings_sections('orb_hero'); ?>
        <?php submit_button(); ?>
    </form>
</section>