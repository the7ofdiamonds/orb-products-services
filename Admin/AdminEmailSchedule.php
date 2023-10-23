<?php

namespace ORB_Products_Services\Admin;

class AdminEmailSchedule
{

    public function __construct()
    {
        add_action('admin_menu', [$this, 'register_custom_menu_page']);
    }

    function register_custom_menu_page()
    {
        add_submenu_page('orb_services', 'Edit Email SMTP Settings', 'Edit Schedule Email', 'manage_options', 'orb_schedule_email_settings', [$this, 'create_section'], 5);
        add_action('admin_init', [$this, 'register_section']);
    }

    function create_section()
    {
        include plugin_dir_path(__FILE__) . 'includes/admin-edit-email-schedule.php';
    }

    function register_section()
    {
        add_settings_section('orb-admin-schedule-email', '', [$this, 'section_description'], 'orb_schedule_email_settings');
        register_setting('orb-admin-schedule-email-group', 'schedule_smtp_username');
        register_setting('orb-admin-schedule-email-group', 'schedule_smtp_host');
        register_setting('orb-admin-schedule-email-group', 'schedule_smtp_auth');
        register_setting('orb-admin-schedule-email-group', 'schedule_smtp_port');
        register_setting('orb-admin-schedule-email-group', 'schedule_smtp_password');
        register_setting('orb-admin-schedule-email-group', 'schedule_smtp_secure');
        register_setting('orb-admin-schedule-email-group', 'schedule_email');
        register_setting('orb-admin-schedule-email-group', 'schedule_name');
        add_settings_field('schedule_smtp_host', 'Host', [$this, 'schedule_smtp_host'], 'orb_schedule_email_settings', 'orb-admin-schedule-email');
        add_settings_field('schedule_smtp_port', 'Port', [$this, 'schedule_smtp_port'], 'orb_schedule_email_settings', 'orb-admin-schedule-email');
        add_settings_field('schedule_smtp_username', 'Username', [$this, 'schedule_smtp_username'], 'orb_schedule_email_settings', 'orb-admin-schedule-email');
        add_settings_field('schedule_smtp_password', 'Password', [$this, 'schedule_smtp_password'], 'orb_schedule_email_settings', 'orb-admin-schedule-email');
        add_settings_field('schedule_smtp_auth', 'Auth', [$this, 'schedule_smtp_auth'], 'orb_schedule_email_settings', 'orb-admin-schedule-email');
        add_settings_field('schedule_smtp_secure', 'Secure', [$this, 'schedule_smtp_secure'], 'orb_schedule_email_settings', 'orb-admin-schedule-email');
        add_settings_field('schedule_email', 'Email', [$this, 'schedule_email'], 'orb_schedule_email_settings', 'orb-admin-schedule-email');
        add_settings_field('schedule_name', 'Name', [$this, 'schedule_name'], 'orb_schedule_email_settings', 'orb-admin-schedule-email');
    }

    function section_description()
    {
        echo 'Edit your schedule email SMTP settings to send messages from your website below.';
    }

    function schedule_smtp_username()
    {
        $smtp_username = esc_attr(get_option('schedule_smtp_username'));
        echo '<input class="admin-input" type="text" name="schedule_smtp_username" value="' . $smtp_username . '" />';
    }

    function schedule_smtp_password()
    {
        $smtp_password = esc_attr(get_option('schedule_smtp_password'));
        echo '<input class="admin-input" type="text" name="schedule_smtp_password" value="' . $smtp_password . '" />';
    }

    function schedule_smtp_port()
    {
        $smtp_port = esc_attr(get_option('schedule_smtp_port'));
        echo '<input class="admin-input" type="text" name="schedule_smtp_port" value="' . $smtp_port . '" />';
    }

    function schedule_smtp_host()
    {
        $smtp_host = esc_attr(get_option('schedule_smtp_host'));
        echo '<input class="admin-input" type="text" name="schedule_smtp_host" value="' . $smtp_host . '" />';
    }

    function schedule_smtp_auth()
    {
        $smtpAuth = esc_attr(get_option('schedule_smtp_auth'));
        echo '<input class="admin-input" type="text" name="schedule_smtp_auth" value="' . $smtpAuth . '" />';
    }

    function schedule_smtp_secure()
    {
        $smtpSecure = esc_attr(get_option('schedule_smtp_secure'));
        echo '<input class="admin-input" type="text" name="schedule_smtp_secure" value="' . $smtpSecure . '" />';
    }

    function schedule_email()
    {
        $schedule_email = esc_attr(get_option('schedule_email'));
        echo '<input class="admin-input" type="text" name="schedule_email" value="' . $schedule_email . '" />';
    }

    function schedule_name()
    {
        $schedule_name = esc_attr(get_option('schedule_name'));
        echo '<input class="admin-input" type="text" name="schedule_name" value="' . $schedule_name . '" />';
    }
}
