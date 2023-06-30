<?php

namespace ORBServices\Roles;

class Roles
{
    public function __construct()
    {
        add_action('init', [$this, 'create_client']);
        add_action('template_redirect', [$this, 'restrict_client_access']);
    }

    function create_client()
    {
        add_role(
            'client',
            'Client',
            [
                'read' => true,
            ]
        );
    }

    function restrict_client_access() {
        if (is_page('invoice') || is_page('payment') || is_page('receipt') && !is_user_logged_in()) {
            // Redirect non-logged-in users to the login page or show an error message
            wp_redirect(wp_login_url());
            exit;
        }
        
        $current_user = wp_get_current_user();
        if (is_page('invoice') || is_page('payment') || is_page('receipt') && !in_array('client', $current_user->roles)) {
            // Redirect users without the 'client' role to a specific page or show an error message
            wp_redirect(home_url('/services/schedule'));
            exit;
        }
    }    
}