<?php

namespace ORB_Services\Admin;

class AdminHero
{

    public function __construct()
    {
        add_action('admin_menu', [$this, 'register_custom_submenu_page']);
    }

    function register_custom_submenu_page()
    {

        add_submenu_page('thfw_admin', 'Edit Hero Section', 'Edit Hero', 'manage_options', 'orb_hero', [$this, 'create_section'], 0);

        add_action('admin_init', [$this, 'register_section']);
    }

    function create_section()
    {

        include plugin_dir_path(__FILE__) . 'includes/admin-edit-hero.php';
    }

    function register_section()
    {
        add_settings_section('orb-admin-hero', 'Edit Hero', [$this, 'section_description'], 'orb_hero');
        register_setting('orb-admin-hero-group', 'hero-pitch');
        register_setting('orb-admin-hero-group', 'hero-button-link');
        register_setting('orb-admin-hero-group', 'hero-button-text');
        add_settings_field('hero_tagline', 'Tagline', [$this, 'hero_tagline'], 'orb_hero', 'orb-admin-hero');
        add_settings_field('hero-pitch', 'Pitch', [$this, 'hero_pitch'], 'orb_hero', 'orb-admin-hero');
        add_settings_field('hero-button-link', 'Button Link', [$this, 'hero_button_link'], 'orb_hero', 'orb-admin-hero');
        add_settings_field('hero-button-text', 'Button Text', [$this, 'hero_button_text'], 'orb_hero', 'orb-admin-hero');
    }

    function section_description()
    {
        echo 'Edit Hero section on the front page';
    }

    function hero_tagline()
    {
        echo '<p>Edit your site tagline in the <a href="/wp-admin/options-general.php">General Settings</a> page.</p>';
    }

    function hero_pitch()
    {

        $pitch = get_option('hero-pitch');
        echo '<input type="text" name="hero-pitch" value="' . $pitch . '" />';
    }

    function hero_button_link()
    {
        $button_link = get_option('hero-button-link');
        echo '<input type="text" name="hero-button-link" value="' . $button_link . '" />';
    }

    function hero_button_text()
    {
        $button_text = get_option('hero-button-text');
        echo '<input type="text" name="hero-button-text" value="' . $button_text . '" />';
    }
}
