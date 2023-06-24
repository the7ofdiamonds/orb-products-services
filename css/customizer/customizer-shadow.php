<?php

namespace ORB\Services\CSS\Customizer\Shadow;

class ORB_Services_Customizer_Shadow
{

    public function __construct()
    {
        add_action('customize_register', array($this, 'register_thfw_shadow_customize_settings'));
        add_action('wp_head', [$this, 'load_css']);
    }

    public function register_thfw_shadow_customize_settings($wp_customize)
    {
        $this->thfw_shadow_callout_settings($wp_customize);
    }

    private function thfw_shadow_callout_settings($wp_customize)
    {

        $wp_customize->add_section('orb_shadow_settings', array(
            'title'          => __('ORB Shadow', 'the-house-forever-wins'),
            'description'    =>  __('ORB Shadow options', 'the-house-forever-wins'),
            'priority'       => 7,
            'capability'     => 'edit_theme_options',
            'theme_supports' => '',
            'panel'  => 'theme_options',
        ));

        $wp_customize->add_setting('orb_card_box_shadow', array(
            'sanitize_callback' => 'sanitize_text_field',
        ));

        $wp_customize->add_control(
            'orb_card_box_shadow',
            array(
                'type' => 'input',
                'label' => __('ORB Card Shadow', 'the-house-forever-wins'),
                'section' => 'orb_shadow_settings',
            )
        );

        $wp_customize->add_setting('orb_button_box_shadow', array(
            'sanitize_callback' => 'sanitize_text_field',
        ));

        $wp_customize->add_control(
            'orb_button_box_shadow',
            array(
                'type' => 'input',
                'label' => __('ORB Button Shadow', 'the-house-forever-wins'),
                'section' => 'orb_shadow_settings',
            )
        );

        $wp_customize->add_setting('orb_input_box_shadow', array(
            'sanitize_callback' => 'sanitize_text_field',
        ));

        $wp_customize->add_control(
            'orb_input_box_shadow',
            array(
                'type' => 'input',
                'label' => __('Input Shadow', 'the-house-forever-wins'),
                'section' => 'shadow_settings',
            )
        );
    }

    function load_css()
    {
?>
        <style>
            .services-card.card {
                box-shadow: <?php
                            if (!get_theme_mod('orb_card_box_shadow')) {
                                echo 'var(--orb-box-shadow)';
                            } else {
                                echo esc_html(get_theme_mod('orb_card_box_shadow'));
                            } ?>;
            }

            .services-btn {
                box-shadow: <?php
                            if (!get_theme_mod('orb_button_box_shadow')) {
                                echo 'var(--orb-box-shadow-btn)';
                            } else {
                                echo esc_html(get_theme_mod('orb_button_box_shadow'));
                            } ?>;
            }

            .services-input,
            .services-textarea {
                box-shadow: <?php
                            if (!get_theme_mod('orb_input_box_shadow')) {
                                echo 'var(--orb-box-shadow-input)';
                            } else {
                                echo esc_html(get_theme_mod('orb_input_box_shadow'));
                            } ?>;
            }

            .services-input,
            .services-textarea:hover,
            .services-btn:hover {
                box-shadow: unset;
            }
        </style>
<?php
    }
}
