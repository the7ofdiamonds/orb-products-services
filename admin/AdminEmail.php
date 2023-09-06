<?php

namespace ORB_Services\Admin;

use ORB_Services\Email\Email;

$smtp_host = get_option('smtp_host');
$smtp_port = get_option('smtp_port');
$smtp_secure = get_option('smtp_secure');
$smtp_auth = get_option('smtp_auth');
$smtp_username = get_option('smtp_username');
$smtp_password   = get_option('smtp_password');
$contact_email = get_option('contact_email');
$invoice_email = get_option('invoice_email');
$receipt_email = get_option('receipt_email');
$support_email = get_option('support_email');

class AdminEmail
{

    public function __construct()
    {
        $smtp_host = get_option('smtp_host');
        $smtp_port = get_option('smtp_port');
        $smtp_secure = get_option('smtp_secure');
        $smtp_auth = get_option('smtp_auth');
        $smtp_username = get_option('smtp_username');
        $smtp_password   = get_option('smtp_password');
        $contact_email = get_option('contact_email');
        $invoice_email = get_option('invoice_email');
        $receipt_email = get_option('receipt_email');
        $support_email = get_option('support_email');
        // Signup Email
        // Quote Email

        new Email($smtp_auth, $smtp_host, $smtp_secure, $smtp_port, $smtp_username, $smtp_password, $from_email, $from_name);

        add_action('admin_menu', [$this, 'register_custom_menu_page']);
    }

    function register_custom_menu_page()
    {

        add_submenu_page('orb_services', 'Edit Email SMTP Settings', 'Edit Email', 'manage_options', 'orb_email_settings', [$this, 'create_section'], 5);

        add_action('admin_init', [$this, 'register_section']);
    }

    function create_section()
    {

        include plugin_dir_path(__FILE__) . 'includes/admin-edit-email.php';
    }

    function register_section()
    {

        add_settings_section('orb-admin-email', '', [$this, 'section_description'], 'orb_email_smtp');
        register_setting('orb-admin-email-group', 'smtp_username');
        register_setting('orb-admin-email-group', 'smtp_host');
        register_setting('orb-admin-email-group', 'smtp_auth');
        register_setting('orb-admin-email-group', 'smtp_port');
        register_setting('orb-admin-email-group', 'smtp_password');
        register_setting('orb-admin-email-group', 'smtp_secure');
        add_settings_field('smtp_host', 'Host', [$this, 'smtp_host'], 'orb_email_smtp', 'orb-admin-email');
        add_settings_field('smtp_port', 'Port', [$this, 'smtp_port'], 'orb_email_smtp', 'orb-admin-email');
        add_settings_field('smtp_username', 'Username', [$this, 'smtp_username'], 'orb_email_smtp', 'orb-admin-email');
        add_settings_field('smtp_password', 'Password', [$this, 'smtp_password'], 'orb_email_smtp', 'orb-admin-email');
        add_settings_field('smtp_auth', 'Auth', [$this, 'smtp_auth'], 'orb_email_smtp', 'orb-admin-email');
        add_settings_field('smtp_secure', 'Secure', [$this, 'smtp_secure'], 'orb_email_smtp', 'orb-admin-email');
    }

    function section_description()
    {
        echo 'Edit your email SMTP settings to send messages from your website below.';
    }

    function smtp_username()
    {
        $smtp_username = esc_attr(get_option('smtp_username'));
        echo '<input class="admin-input" type="text" name="smtp_username" value="' . $smtp_username . '" />';
    }

    function smtp_password()
    {
        $smtp_password = esc_attr(get_option('smtp_password'));
        echo '<input class="admin-input" type="text" name="smtp_password" value="' . $smtp_password . '" />';
    }

    function smtp_port()
    {
        $smtp_port = esc_attr(get_option('smtp_port'));
        echo '<input class="admin-input" type="text" name="smtp_port" value="' . $smtp_port . '" />';
    }

    function smtp_host()
    {
        $smtp_host = esc_attr(get_option('smtp_host'));
        echo '<input class="admin-input" type="text" name="smtp_host" value="' . $smtp_host . '" />';
    }

    function smtp_auth()
    {
        $smtpAuth = esc_attr(get_option('smtp_auth'));
        echo '<input class="admin-input" type="text" name="smtp_auth" value="' . $smtpAuth . '" />';
    }

    function smtp_secure()
    {
        $smtpSecure = esc_attr(get_option('smtp_secure'));
        echo '<input class="admin-input" type="text" name="smtp_secure" value="' . $smtpSecure . '" />';
    }
}
