<?php

namespace ORB_Products_Services\Admin;

class AdminEmailInvoice
{

    public function __construct()
    {
        add_action('admin_menu', [$this, 'register_custom_menu_page']);
    }

    function register_custom_menu_page()
    {
        add_submenu_page('orb_services', 'Edit Email SMTP Settings', 'Edit Invoice Email', 'manage_options', 'orb_invoice_email_settings', [$this, 'create_section'], 5);
        add_action('admin_init', [$this, 'register_section']);
    }

    function create_section()
    {
        include plugin_dir_path(__FILE__) . 'includes/admin-edit-email-invoice.php';
    }

    function register_section()
    {
        add_settings_section('orb-admin-invoice-email', '', [$this, 'section_description'], 'orb_invoice_email_settings');
        register_setting('orb-admin-invoice-email-group', 'invoice_smtp_username');
        register_setting('orb-admin-invoice-email-group', 'invoice_smtp_host');
        register_setting('orb-admin-invoice-email-group', 'invoice_smtp_auth');
        register_setting('orb-admin-invoice-email-group', 'invoice_smtp_port');
        register_setting('orb-admin-invoice-email-group', 'invoice_smtp_password');
        register_setting('orb-admin-invoice-email-group', 'invoice_smtp_secure');
        register_setting('orb-admin-invoice-email-group', 'invoice_email');
        register_setting('orb-admin-invoice-email-group', 'invoice_name');
        add_settings_field('invoice_smtp_host', 'Host', [$this, 'invoice_smtp_host'], 'orb_invoice_email_settings', 'orb-admin-invoice-email');
        add_settings_field('invoice_smtp_port', 'Port', [$this, 'invoice_smtp_port'], 'orb_invoice_email_settings', 'orb-admin-invoice-email');
        add_settings_field('invoice_smtp_username', 'Username', [$this, 'invoice_smtp_username'], 'orb_invoice_email_settings', 'orb-admin-invoice-email');
        add_settings_field('invoice_smtp_password', 'Password', [$this, 'invoice_smtp_password'], 'orb_invoice_email_settings', 'orb-admin-invoice-email');
        add_settings_field('invoice_smtp_auth', 'Auth', [$this, 'invoice_smtp_auth'], 'orb_invoice_email_settings', 'orb-admin-invoice-email');
        add_settings_field('invoice_smtp_secure', 'Secure', [$this, 'invoice_smtp_secure'], 'orb_invoice_email_settings', 'orb-admin-invoice-email');
        add_settings_field('invoice_email', 'Email', [$this, 'invoice_email'], 'orb_invoice_email_settings', 'orb-admin-invoice-email');
        add_settings_field('invoice_name', 'Name', [$this, 'invoice_name'], 'orb_invoice_email_settings', 'orb-admin-invoice-email');
    }

    function section_description()
    {
        echo 'Edit your invoice email SMTP settings to send messages from your website below.';
    }

    function invoice_smtp_username()
    {
        $smtp_username = esc_attr(get_option('invoice_smtp_username'));
        echo '<input class="admin-input" type="text" name="invoice_smtp_username" value="' . $smtp_username . '" />';
    }

    function invoice_smtp_password()
    {
        $smtp_password = esc_attr(get_option('invoice_smtp_password'));
        echo '<input class="admin-input" type="text" name="invoice_smtp_password" value="' . $smtp_password . '" />';
    }

    function invoice_smtp_port()
    {
        $smtp_port = esc_attr(get_option('invoice_smtp_port'));
        echo '<input class="admin-input" type="text" name="invoice_smtp_port" value="' . $smtp_port . '" />';
    }

    function invoice_smtp_host()
    {
        $smtp_host = esc_attr(get_option('invoice_smtp_host'));
        echo '<input class="admin-input" type="text" name="invoice_smtp_host" value="' . $smtp_host . '" />';
    }

    function invoice_smtp_auth()
    {
        $smtpAuth = esc_attr(get_option('invoice_smtp_auth'));
        echo '<input class="admin-input" type="text" name="invoice_smtp_auth" value="' . $smtpAuth . '" />';
    }

    function invoice_smtp_secure()
    {
        $smtpSecure = esc_attr(get_option('invoice_smtp_secure'));
        echo '<input class="admin-input" type="text" name="invoice_smtp_secure" value="' . $smtpSecure . '" />';
    }

    function invoice_email()
    {
        $invoice_email = esc_attr(get_option('invoice_email'));
        echo '<input class="admin-input" type="text" name="invoice_email" value="' . $invoice_email . '" />';
    }

    function invoice_name()
    {
        $invoice_name = esc_attr(get_option('invoice_name'));
        echo '<input class="admin-input" type="text" name="invoice_name" value="' . $invoice_name . '" />';
    }
}
