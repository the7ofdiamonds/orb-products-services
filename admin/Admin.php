<?php

namespace ORB_Services\Admin;

use ORB_Services\Admin\AdminEmail;
use ORB_Services\Admin\AdminHero;
use ORB_Services\Admin\AdminLocation;
use ORB_Services\Admin\AdminOfficeHours;
use ORB_Services\Admin\AdminCommunication;
use ORB_Services\Admin\AdminStripe;

class Admin
{

    public function __construct()
    {
        add_action('admin_menu', [$this, 'register_custom_menu_page']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_styles']);

        new AdminEmail;
        new AdminHero;
        new AdminOfficeHours;
        new AdminLocation;
        new AdminCommunication;
        new AdminStripe;
    }

    function register_custom_menu_page()
    {
        add_menu_page(
            'ORB Services',
            'ORB Services',
            'manage_options',
            'orb_services',
            [$this, 'create_section'],
            'dashicons-info',
            3
        );
        add_submenu_page(
            'orb_services',
            'ORB Services Dashboard',
            'Dashboard',
            'manage_options',
            'orb_services',
            [$this, 'create_section'],
            0
        );
        add_action('admin_init', [$this, 'register_section']);
    }

    function create_section()
    {
        include ORB_SERVICES . 'Admin/includes/admin.php';
    }

    function register_section()
    {

        add_settings_section('orb-admin', 'Google Services', [$this, 'google_services_section_description'], 'orb_services');
        register_setting('orb-admin-group', 'orb-admin');
        add_settings_field('orb-google-service-account', 'Google Service Account', [$this, 'google_service_account'], 'orb_services', 'orb-admin');
        add_settings_section('orb-admin-stripe', 'Stripe Payments', [$this, 'stripe_section_description'], 'orb_services');
        add_settings_field('orb-stripe-secret-key', 'Stripe Secret Key', [$this, 'stripe_secret_key'], 'orb_services', 'orb-admin-stripe');
    }

    function google_services_section_description()
    {
        echo 'To add Google services to your website, paste your service account below. You can find more information on how to do that ' ?><a href="https://cloud.google.com/iam/docs/keys-create-delete" target="_blank">here.</a>
    <?php
    }

    function google_service_account()
    { ?>
        <textarea name="google_service_account" id="" cols="60" rows="20"></textarea>
    <?php }

    function save_google_service_account($data)
    {
        $envFilePath = ORB_SERVICES . 'serviceAccount.json';

        $file = fopen($envFilePath, 'w');

        if ($file) {
            fwrite($file, $data);

            fclose($file);

            echo "Data has been saved to the Google service account file.";
        } else {
            echo "Error: Unable to open Google service account file for writing.";
        }
    }

    function stripe_section_description()
    {
        echo 'To accept payments using Stripe, paste your secret key below. Instructions on how to obtain both a test and live key can be found ' ?><a href="https://stripe.com/docs/keys" target="_blank">here.</a>
    <?php
    }

    function stripe_secret_key()
    { ?>
        <input class="admin-input" type="text" name="stripe_secret_key" maxlength="100">
    <?php }

    function save_stripe_secret_key($data)
    {
        $envFilePath = ORB_SERVICES . '.env';

        $file = fopen($envFilePath, 'w');

        if ($file) {
            fwrite($file, $data);

            fclose($file);

            echo "Data has been saved to .env file.";
        } else {
            echo "Error: Unable to open .env file for writing.";
        }
    }

    function enqueue_admin_styles()
    {
        wp_enqueue_style('orb-admin-styles', ORB_SERVICES_URL . 'Admin/CSS/Admin.css');
    }
}
