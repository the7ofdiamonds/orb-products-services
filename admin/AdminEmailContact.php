<?php

namespace ORB_Products_Services\Admin;

class AdminEmailContact
{

    public function __construct()
    {
        add_action('admin_menu', [$this, 'register_custom_menu_page']);
    }

    function register_custom_menu_page()
    {
        add_submenu_page('orb_services', 'Edit Email SMTP Settings', 'Edit Contact Email', 'manage_options', 'orb_contact_email_settings', [$this, 'create_section'], 5);
        add_action('admin_init', [$this, 'register_section']);
    }

    function create_section()
    {
        include plugin_dir_path(__FILE__) . 'includes/admin-edit-email-contact.php';
    }

    function register_section()
    {
        add_settings_section('orb-admin-contact-email', '', [$this, 'section_description'], 'orb_contact_email_settings');
        register_setting('orb-admin-contact-email-group', 'contact_smtp_username');
        register_setting('orb-admin-contact-email-group', 'contact_smtp_host');
        register_setting('orb-admin-contact-email-group', 'contact_smtp_auth');
        register_setting('orb-admin-contact-email-group', 'contact_smtp_port');
        register_setting('orb-admin-contact-email-group', 'contact_smtp_password');
        register_setting('orb-admin-contact-email-group', 'contact_smtp_secure');
        register_setting('orb-admin-contact-email-group', 'contact_email');
        register_setting('orb-admin-contact-email-group', 'contact_name');
        add_settings_field('contact_smtp_host', 'Host', [$this, 'contact_smtp_host'], 'orb_contact_email_settings', 'orb-admin-contact-email');
        add_settings_field('contact_smtp_port', 'Port', [$this, 'contact_smtp_port'], 'orb_contact_email_settings', 'orb-admin-contact-email');
        add_settings_field('contact_smtp_username', 'Username', [$this, 'contact_smtp_username'], 'orb_contact_email_settings', 'orb-admin-contact-email');
        add_settings_field('contact_smtp_password', 'Password', [$this, 'contact_smtp_password'], 'orb_contact_email_settings', 'orb-admin-contact-email');
        add_settings_field('contact_smtp_auth', 'Auth', [$this, 'contact_smtp_auth'], 'orb_contact_email_settings', 'orb-admin-contact-email');
        add_settings_field('contact_smtp_secure', 'Secure', [$this, 'contact_smtp_secure'], 'orb_contact_email_settings', 'orb-admin-contact-email');
        add_settings_field('contact_email', 'Email', [$this, 'contact_email'], 'orb_contact_email_settings', 'orb-admin-contact-email');
        add_settings_field('contact_name', 'Name', [$this, 'contact_name'], 'orb_contact_email_settings', 'orb-admin-contact-email');
    }

    function section_description()
    {
        echo 'Edit your contact email SMTP settings to send messages from your website below.';
    }

    function contact_smtp_username()
    {
        $smtp_username = esc_attr(get_option('contact_smtp_username'));
        echo '<input class="admin-input" type="text" name="contact_smtp_username" value="' . $smtp_username . '" />';
    }

    function contact_smtp_password()
    {
        $smtp_password = esc_attr(get_option('contact_smtp_password'));
        echo '<input class="admin-input" type="text" name="contact_smtp_password" value="' . $smtp_password . '" />';
    }

    function contact_smtp_port()
    {
        $smtp_port = esc_attr(get_option('contact_smtp_port'));
        echo '<input class="admin-input" type="text" name="contact_smtp_port" value="' . $smtp_port . '" />';
    }

    function contact_smtp_host()
    {
        $smtp_host = esc_attr(get_option('contact_smtp_host'));
        echo '<input class="admin-input" type="text" name="contact_smtp_host" value="' . $smtp_host . '" />';
    }

    function contact_smtp_auth()
    {
        $smtpAuth = esc_attr(get_option('contact_smtp_auth'));
        echo '<input class="admin-input" type="text" name="contact_smtp_auth" value="' . $smtpAuth . '" />';
    }

    function contact_smtp_secure()
    {
        $smtpSecure = esc_attr(get_option('contact_smtp_secure'));
        echo '<input class="admin-input" type="text" name="contact_smtp_secure" value="' . $smtpSecure . '" />';
    }

    function contact_email()
    {
        $contact_email = esc_attr(get_option('contact_email'));
        echo '<input class="admin-input" type="text" name="contact_email" value="' . $contact_email . '" />';
    }

    function contact_name()
    {
        $contact_name = esc_attr(get_option('contact_name'));
        echo '<input class="admin-input" type="text" name="contact_name" value="' . $contact_name . '" />';
    }
}
