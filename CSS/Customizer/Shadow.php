<?php

namespace ORB\Products_Services\CSS\Customizer;

class Shadow
{
    public function __construct()
    {
        add_action('customize_register', [$this, 'orb_products_services_shadow_section']);
    }

    function orb_products_services_shadow_section($wp_customize)
    {
        $wp_customize->add_section(
            'orb_products_services_shadow_settings',
            array(
                'priority'       => 9,
                'capability'     => 'edit_theme_options',
                'theme_supports' => '',
                'title'          => __('Shadows', 'orb-products-services'),
                'description'    =>  __('Shadow Settings', 'orb-products-services'),
                'panel'  => 'orb_products_services_settings',
            )
        );

        $wp_customize->add_setting('orb_products_services_card_shadow', array(
            'sanitize_callback' => 'sanitize_text_field',
        ));

        $wp_customize->add_control(
            'orb_products_services_card_shadow',
            array(
                'type' => 'input',
                'label' => __('Card Box Shadow', 'orb-products-services'),
                'section' => 'orb_products_services_shadow_settings',
            )
        );

        $wp_customize->add_setting('orb_products_services_button_shadow', array(
            'sanitize_callback' => 'sanitize_text_field',
        ));

        $wp_customize->add_control(
            'orb_products_services_button_shadow',
            array(
                'type' => 'input',
                'label' => __('Button Box Shadow', 'orb-products-services'),
                'section' => 'orb_products_services_shadow_settings',
            )
        );
    }

    function load_css()
    {
?>
        <style>
            :root {
                --orb-products-services-card-shadow: <?php
                                                        if (empty(get_theme_mod('orb_products_services_card_shadow'))) {
                                                            echo esc_html('0 0 0.5em rgba(0, 0, 0, 0.85)');
                                                        } else {
                                                            error_log(get_theme_mod('orb_products_services_card_shadow'));
                                                            echo esc_html(get_theme_mod('orb_products_services_card_shadow'));
                                                        } ?>;
                --orb-products-services-btn-shadow: <?php
                                                    if (empty(get_theme_mod('orb_products_services_button_shadow'))) {
                                                        echo esc_html('0 0 0.5em rgba(0, 0, 0, 0.85)');
                                                    } else {
                                                        echo esc_html(get_theme_mod('orb_products_services_button_shadow'));
                                                    } ?>;
                --orb-products-services-btn-shadow-hover: <?php
                                                    if (empty(get_theme_mod('orb_products_services_button_shadow_hover'))) {
                                                        echo esc_html('unset');
                                                    } else {
                                                        echo esc_html(get_theme_mod('orb_products_services_button_shadow_hover'));
                                                    } ?>;
            }
        </style>
<?php
    }
}
