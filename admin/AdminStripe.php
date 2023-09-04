<?php

namespace ORB_Services\Admin;

class AdminStripe
{

    public function __construct()
    {
        add_action('admin_menu', [$this, 'register_custom_submenu_page']);
    }

    function register_custom_submenu_page()
    {
        add_submenu_page('orb_services', 'Stripe Options Section', 'Stripe Options', 'manage_options', 'stripe_options', [$this, 'create_section'], 1);
        add_action('admin_init', [$this, 'register_section']);
    }

    function create_section()
    {

        include ORB_SERVICES . 'Admin/includes/admin-stripe-options.php';
    }

    function register_section()
    {
        add_settings_section('stripe-options', '', [$this, 'section_description'], 'stripe_options');
        register_setting('sripe-options-group', 'stripe-options');
        add_settings_field('stripe_options', 'Enable Automatic Tax', [$this, 'automatic_tax'], 'stripe_options', 'stripe-options');
        add_settings_field('stripe_options', 'Enable Automatic Tax', [$this, 'quote_list_limit'], 'stripe_options', 'stripe-options');
    }

    function section_description()
    {
        echo 'Edit Stripe Options';
    }

    function automatic_tax()
    {
        $automatic_tax_enabled = get_option('stripe_automatic_tax_enabled');
?>
        <input type="checkbox" name="stripe_automatic_tax_enabled" value="1" <?php checked($automatic_tax_enabled, true); ?>>
    <?php    }

    function quote_list_limit()
    {
        $quote_list_limit = get_option('stripe_quote_list_limit');
    ?>
        <input type="number" name="stripe_quote_list_limit" value="<?php echo $quote_list_limit; ?>">
<?php    }
}
