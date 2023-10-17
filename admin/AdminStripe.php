<?php

namespace ORB_Products_Services\Admin;

class AdminStripe
{
    private $automatic_tax_enabled;
    private $quote_list_limit;
    private $quote_days_until_due;
    private $quote_expires_at;

    public function __construct()
    {
        add_action('admin_menu', [$this, 'register_custom_submenu_page']);

        $this->automatic_tax_enabled = get_option('stripe_automatic_tax_enabled');
        $this->quote_list_limit = get_option('stripe_quote_list_limit');
        $this->quote_days_until_due = get_option('stripe_quote_days_until_due');
        $this->quote_expires_at = get_option('stripe_quote_expires_at');
    }

    function register_custom_submenu_page()
    {
        add_submenu_page('orb_services', 'Stripe Options Section', 'Stripe Options', 'manage_options', 'stripe_options', [$this, 'create_section'], 1);
        add_action('admin_init', [$this, 'register_section']);
    }

    function create_section()
    {

        include ORB_PRODUCTS_SERVICES . 'Admin/includes/admin-stripe-options.php';
    }

    function register_section()
    {
        add_settings_section('stripe-options', '', [$this, 'section_description'], 'stripe_options');

        register_setting('stripe-options-group', 'stripe_automatic_tax_enabled'); // Corrected the option name
        register_setting('stripe-options-group', 'stripe_quote_list_limit'); // Corrected the option name
        register_setting('stripe-options-group', 'stripe_quote_days_until_due'); // Corrected the option name
        register_setting('stripe-options-group', 'stripe_quote_expires_at'); // Corrected the option name

        add_settings_field('stripe_automatic_tax_enabled', 'Enable Automatic Tax', [$this, 'automatic_tax'], 'stripe_options', 'stripe-options');
        add_settings_field('stripe_quote_list_limit', 'List Limit', [$this, 'quote_list_limit'], 'stripe_options', 'stripe-options');
        add_settings_field('stripe_quote_days_until_due', 'Days Until Due', [$this, 'days_until_due'], 'stripe_options', 'stripe-options');
        add_settings_field('stripe_quote_expires_at', 'Days Until Expires', [$this, 'days_until_expires'], 'stripe_options', 'stripe-options');
    }

    function section_description()
    {
        echo 'Edit Stripe Options';
    }

    function automatic_tax()
    {
?>
        <input type="checkbox" name="stripe_automatic_tax_enabled" value="1" <?php checked($this->automatic_tax_enabled, true); ?>>
    <?php    }

    function quote_list_limit()
    {
    ?>
        <input type="number" name="stripe_quote_list_limit" value="<?php echo $this->quote_list_limit; ?>">
    <?php    }

    function days_until_due()
    {
    ?>
        <input type="number" name="stripe_quote_days_until_due" value="<?php echo $this->quote_days_until_due; ?>">
    <?php    }

    function days_until_expires()
    {
    ?>
        <input type="number" name="stripe_quote_expires_at" value="<?php echo $this->quote_expires_at; ?>">
<?php    }


    function days_until_expires_timestamp()
    {
        $expiration_days = intval($this->quote_expires_at);
        $current_timestamp = current_time('timestamp', true);
        $expiration_timestamp = strtotime("+{$expiration_days} days", $current_timestamp);

        return $expiration_timestamp;
    }
}
