<?php
 $smtp_host = esc_attr(get_option('smtp_host'));
 $smtp_port = get_option('smtp_port');
 $smtp_secure = get_option('smtp_secure');
 $smtp_auth = get_option('smtp_auth');
 $smtp_username = get_option('smtp_username');
 $smtp_password   = get_option('smtp_password');

 define('WP_MAIL_SMTP', true);
 define('SMTP_HOST', $smtp_host);
 define('SMTP_PORT', $smtp_port);
 define('SMTP_SECURE', $smtp_secure);
 define('SMTP_ENCRYPTION', $smtp_secure);
 define('SMTP_AUTH', $smtp_auth);
 define('SMTP_USERNAME', $smtp_username);
 define('SMTP_PASSWORD', $smtp_password);

class THFW_Admin_Email {

    public function __construct() {
        add_action( 'admin_menu', [$this, 'register_custom_menu_page'] );
    }

    function register_custom_menu_page() {

        add_submenu_page( 'thfw_admin', 'Edit Email SMTP Settings', 'Edit Email', 'manage_options', 'thfw_email_settings', [$this, 'create_section'], 5 );

        add_action( 'admin_init', [$this, 'register_section'] );
    }

    function create_section() {

        include plugin_dir_path(__FILE__) . 'includes/admin-edit-email.php';
    }

    function register_section() {

        add_settings_section('thfw-admin-contact', 'Edit Email SMTP settings', [$this, 'section_description'], 'thfw_email_smtp' );
        register_setting('thfw-admin-email-group', 'smtp_username');
        register_setting('thfw-admin-email-group', 'smtp_host');
        register_setting('thfw-admin-email-group', 'smtp_auth');
        register_setting('thfw-admin-email-group', 'smtp_port');
        register_setting('thfw-admin-email-group', 'smtp_password');
        register_setting('thfw-admin-email-group', 'smtp_secure');
        add_settings_field( 'smtp_host', 'Host', [$this, 'smtp_host'], 'thfw_email_smtp', 'thfw-admin-contact');        
        add_settings_field( 'smtp_port', 'Port', [$this, 'smtp_port'], 'thfw_email_smtp', 'thfw-admin-contact');        
        add_settings_field( 'smtp_username', 'Username', [$this, 'smtp_username'], 'thfw_email_smtp', 'thfw-admin-contact');
        add_settings_field( 'smtp_password', 'Password', [$this, 'smtp_password'], 'thfw_email_smtp', 'thfw-admin-contact');        
        add_settings_field( 'smtp_auth', 'Auth', [$this, 'smtp_auth'], 'thfw_email_smtp', 'thfw-admin-contact');        
        add_settings_field( 'smtp_secure', 'Secure', [$this, 'smtp_secure'], 'thfw_email_smtp', 'thfw-admin-contact');        
    }

    function section_description() {
        echo 'Edit your email SMTP settings to send messages from your website';
    }

    function smtp_username() {
        $smtp_username = esc_attr(get_option('smtp_username'));
        echo '<input type="text" name="smtp_username" value="'.$smtp_username.'" />';
    }

    function smtp_password() {
        $smtp_password = esc_attr(get_option('smtp_password'));
        echo '<input type="text" name="smtp_password" value="'.$smtp_password.'" />';
    }

    function smtp_port() {
        $smtp_port = esc_attr( get_option( 'smtp_port' ) );
        echo '<input type="text" name="smtp_port" value="'.$smtp_port.'" />';
    }

    function smtp_host() {
        $smtp_host = esc_attr( get_option( 'smtp_host' ) );
        echo '<input type="text" name="smtp_host" value="'.$smtp_host.'" />';
    }

    function smtp_auth() {
        $smtpAuth = esc_attr( get_option( 'smtp_auth' ) );
        echo '<input type="text" name="smtp_auth" value="'.$smtpAuth.'" />';
    }

    function smtp_secure() {
        $smtpSecure = esc_attr( get_option( 'smtp_secure' ) );
        echo '<input type="text" name="smtp_secure" value="'.$smtpSecure.'" />';
    }
}