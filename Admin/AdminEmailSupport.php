<?php

namespace ORB\Products_Services\Admin;

class AdminEmailSupport
{

    public function __construct()
    {
        add_action('admin_menu', [$this, 'register_custom_menu_page']);
    }

    function register_custom_menu_page()
    {
        add_submenu_page('orb_services', 'Edit Email SMTP Settings', 'Edit Support Email', 'manage_options', 'orb_support_email_settings', [$this, 'create_section'], 5);
        add_action('admin_init', [$this, 'register_section']);
    }

    function create_section()
    {
        include plugin_dir_path(__FILE__) . 'includes/admin-edit-email-support.php';
    }

    function register_section()
    {
        add_settings_section('orb-admin-support-email', '', [$this, 'section_description'], 'orb_support_email_settings');
        register_setting('orb-admin-support-email-group', 'support_smtp_username');
        register_setting('orb-admin-support-email-group', 'support_smtp_host');
        register_setting('orb-admin-support-email-group', 'support_smtp_auth');
        register_setting('orb-admin-support-email-group', 'support_smtp_port');
        register_setting('orb-admin-support-email-group', 'support_smtp_password');
        register_setting('orb-admin-support-email-group', 'support_smtp_secure');
        register_setting('orb-admin-support-email-group', 'support_email');
        register_setting('orb-admin-support-email-group', 'support_name');
        add_settings_field('support_smtp_host', 'Host', [$this, 'support_smtp_host'], 'orb_support_email_settings', 'orb-admin-support-email');
        add_settings_field('support_smtp_port', 'Port', [$this, 'support_smtp_port'], 'orb_support_email_settings', 'orb-admin-support-email');
        add_settings_field('support_smtp_username', 'Username', [$this, 'support_smtp_username'], 'orb_support_email_settings', 'orb-admin-support-email');
        add_settings_field('support_smtp_password', 'Password', [$this, 'support_smtp_password'], 'orb_support_email_settings', 'orb-admin-support-email');
        add_settings_field('support_smtp_auth', 'Auth', [$this, 'support_smtp_auth'], 'orb_support_email_settings', 'orb-admin-support-email');
        add_settings_field('support_smtp_secure', 'Secure', [$this, 'support_smtp_secure'], 'orb_support_email_settings', 'orb-admin-support-email');
        add_settings_field('support_email', 'Email', [$this, 'support_email'], 'orb_support_email_settings', 'orb-admin-support-email');
        add_settings_field('support_name', 'Name', [$this, 'support_name'], 'orb_support_email_settings', 'orb-admin-support-email');
    }

    function section_description()
    {
        echo 'Edit your support email SMTP settings to send messages from your website below.';
    }

    function support_smtp_username()
    {
        $smtp_username = esc_attr(get_option('support_smtp_username'));
        echo '<input class="admin-input" type="text" name="support_smtp_username" value="' . $smtp_username . '" />';
    }

    function support_smtp_password()
    {
        $smtp_password = esc_attr(get_option('support_smtp_password'));
        echo '<input class="admin-input" type="text" name="support_smtp_password" value="' . $smtp_password . '" />';
    }

    function support_smtp_port()
    {
        $smtp_port = esc_attr(get_option('support_smtp_port'));
        echo '<input class="admin-input" type="text" name="support_smtp_port" value="' . $smtp_port . '" />';
    }

    function support_smtp_host()
    {
        $smtp_host = esc_attr(get_option('support_smtp_host'));
        echo '<input class="admin-input" type="text" name="support_smtp_host" value="' . $smtp_host . '" />';
    }

    function support_smtp_auth()
    {
        $smtpAuth = esc_attr(get_option('support_smtp_auth'));
        echo '<input class="admin-input" type="text" name="support_smtp_auth" value="' . $smtpAuth . '" />';
    }

    function support_smtp_secure()
    {
        $smtpSecure = esc_attr(get_option('support_smtp_secure'));
        echo '<input class="admin-input" type="text" name="support_smtp_secure" value="' . $smtpSecure . '" />';
    }

    function support_email()
    {
        $support_email = esc_attr(get_option('support_email'));
        echo '<input class="admin-input" type="text" name="support_email" value="' . $support_email . '" />';
    }

    function support_name()
    {
        $support_name = esc_attr(get_option('support_name'));
        echo '<input class="admin-input" type="text" name="support_name" value="' . $support_name . '" />';
    }
}
