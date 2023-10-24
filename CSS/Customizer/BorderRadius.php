<?php

namespace ORB_Products_Services\CSS\Customizer;

class BorderRadius
{
    public function __construct()
    {
        add_action('customize_register', [$this, 'orb_products_services_border_radius_section']);
        add_action('wp_head', [$this, 'load_css']);
    }

    function orb_products_services_border_radius_section($wp_customize)
    {
        $wp_customize->add_section(
            'orb_products_services_border_radius_settings',
            array(
                'priority'       => 9,
                'capability'     => 'edit_theme_options',
                'theme_supports' => '',
                'title'          => __('Border Radius', 'the-house-forever-wins'),
                'description'    =>  __('Border Radius Settings', 'the-house-forever-wins'),
                'panel'  => 'orb_products_services_settings',
            )
        );

        $wp_customize->add_setting('orb_products_services_border_radius', array(
            'sanitize_callback' => 'sanitize_text_field',
        ));

        $wp_customize->add_control(
            'orb_products_services_border_radius',
            array(
                'type' => 'input',
                'label' => __('Border Radius', 'the-house-forever-wins'),
                'section' => 'orb_products_services_border_radius_settings',
            )
        );
    }

    function load_css()
    {
?>
        <style>
            :root {
                --orb-products-services-border-radius: <?php
                                                        if (empty(get_theme_mod('orb_products_services_border_radius'))) {
                                                            echo esc_html('0.5em');
                                                        } else {
                                                            echo esc_html(get_theme_mod('orb_products_services_border_radius'));
                                                        } ?>;
            }
        </style>
<?php
    }
}
