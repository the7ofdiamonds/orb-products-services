<?php

namespace ORB\Products_Services\CSS\Customizer;

class Services
{
    public function __construct()
    {
        add_action('customize_register', array($this, 'orb_products_services_section'));
        add_action('wp_head', [$this, 'load_css']);
    }

   function orb_products_services_section($wp_customize)
    {
        $wp_customize->add_section(
            'services_settings',
            array(
                'priority'       => 2,
                'capability'     => 'edit_theme_options',
                'theme_supports' => '',
                'title'          => __('Services', 'orb-products-services'),
                'description'    =>  __('Services Section Options', 'orb-products-services'),
                'panel'  => 'orb_products_services_settings',
            )
        );

        $wp_customize->add_setting('services_card_background_color', [
            'sanitize_callback' => 'sanitize_text_field',
        ]);

        $wp_customize->add_control(
            new \WP_Customize_Color_Control(
                $wp_customize,
                'services_card_background_color',
                [
                    'label' => __('Services Card Background Color', 'orb-products-services'),
                    'section' => 'services_settings',
                ]
            )
        );

        $wp_customize->add_setting('services_card_background_color_hover', [
            'sanitize_callback' => 'sanitize_text_field',
        ]);

        $wp_customize->add_control(
            new \WP_Customize_Color_Control(
                $wp_customize,
                'services_card_background_color_hover',
                [
                    'label' => __('Services Card Background Color Hover', 'orb-products-services'),
                    'section' => 'services_settings',
                ]
            )
        );

        $wp_customize->add_setting('services_card_text_color', [
            'sanitize_callback' => 'sanitize_text_field',
        ]);

        $wp_customize->add_control(
            new \WP_Customize_Color_Control(
                $wp_customize,
                'services_card_text_color',
                [
                    'label' => __('Services Card Text Color', 'orb-products-services'),
                    'section' => 'services_settings',
                ]
            )
        );

        $wp_customize->add_setting('services_card_text_color_hover', [
            'sanitize_callback' => 'sanitize_text_field',
        ]);

        $wp_customize->add_control(
            new \WP_Customize_Color_Control(
                $wp_customize,
                'services_card_text_color_hover',
                [
                    'label' => __('Services Card Text Color Hover', 'orb-products-services'),
                    'section' => 'services_settings',
                ]
            )
        );

        $wp_customize->add_setting('services_button_background_color', [
            'sanitize_callback' => 'sanitize_text_field',
        ]);

        $wp_customize->add_control(
            new \WP_Customize_Color_Control(
                $wp_customize,
                'services_button_background_color',
                [
                    'label' => __('Services Button Background Color', 'orb-products-services'),
                    'section' => 'services_settings',
                ]
            )
        );

        $wp_customize->add_setting('services_button_background_color_hover', [
            'sanitize_callback' => 'sanitize_text_field',
        ]);

        $wp_customize->add_control(
            new \WP_Customize_Color_Control(
                $wp_customize,
                'services_button_background_color_hover',
                [
                    'label' => __('Services Button Background Color Hover', 'orb-products-services'),
                    'section' => 'services_settings',
                ]
            )
        );

        $wp_customize->add_setting('services_button_text_color', [
            'sanitize_callback' => 'sanitize_text_field',
        ]);

        $wp_customize->add_control(
            new \WP_Customize_Color_Control(
                $wp_customize,
                'services_button_text_color',
                [
                    'label' => __('Services Button Text Color', 'orb-products-services'),
                    'section' => 'services_settings',
                ]
            )
        );

        $wp_customize->add_setting('services_button_text_color_hover', [
            'sanitize_callback' => 'sanitize_text_field',
        ]);

        $wp_customize->add_control(
            new \WP_Customize_Color_Control(
                $wp_customize,
                'services_button_text_color_hover',
                [
                    'label' => __('Services Button Text Color Hover', 'orb-products-services'),
                    'section' => 'services_settings',
                ]
            )
        );

        $wp_customize->add_setting('services_button_icon_color', [
            'sanitize_callback' => 'sanitize_text_field',
        ]);

        $wp_customize->add_control(
            new \WP_Customize_Color_Control(
                $wp_customize,
                'services_button_icon_color',
                [
                    'label' => __('Services Button Icon Color', 'orb-products-services'),
                    'section' => 'services_settings',
                ]
            )
        );

        $wp_customize->add_setting('services_button_icon_color_hover', [
            'sanitize_callback' => 'sanitize_text_field',
        ]);

        $wp_customize->add_control(
            new \WP_Customize_Color_Control(
                $wp_customize,
                'services_button_icon_color_hover',
                [
                    'label' => __('Services Button Icon Color Hover', 'orb-products-services'),
                    'section' => 'services_settings',
                ]
            )
        );
    }

    function load_css()
    {
?>
        <style>
            .services-card.card {
                background-color: <?php if (empty(get_theme_mod('services_card_background_color'))) {
                                        echo esc_html('white');
                                    } else {
                                        echo esc_html(get_theme_mod('services_card_background_color'));
                                    } ?>;

                color: <?php if (empty(get_theme_mod('services_card_text_color'))) {
                            echo esc_html('black');
                        } else {
                            echo esc_html(get_theme_mod('services_card_text_color'));
                        } ?>;
            }

            .services-btn {
                background-color: <?php if (empty(get_theme_mod('services_button_background_color'))) {
                                        echo esc_html('black');
                                    } else {
                                        echo esc_html(get_theme_mod('services_button_background_color'));
                                    } ?>;

                color: <?php if (empty(get_theme_mod('services_button_text_color'))) {
                            echo esc_html('white');
                        } else {
                            echo esc_html(get_theme_mod('services_button_text_color'));
                        } ?>;
            }

            .services-btn:hover {
                background-color: <?php if (empty(get_theme_mod('services_button_background_color_hover'))) {
                                        echo esc_html('black');
                                    } else {
                                        echo esc_html(get_theme_mod('services_button_background_color_hover'));
                                    } ?>;
                color: <?php if (empty(get_theme_mod('services_button_text_color_hover'))) {
                            echo esc_html('white');
                        } else {
                            echo esc_html(get_theme_mod('services_button_text_color_hover'));
                        } ?>;
                box-shadow: unset;
            }

            .services-btn i {
                color: <?php if (empty(get_theme_mod('services_button_icon_color'))) {
                            echo esc_html('white');
                        } else {
                            echo esc_html(get_theme_mod('services_button_icon_color'));
                        } ?>;
            }

            .services-btn:hover i {
                color: <?php if (empty(get_theme_mod('services_button_icon_color_hover'))) {
                            echo 'unset';
                        } else {
                            echo esc_html(get_theme_mod('services_button_icon_color_hover'));
                        } ?>;
            }
        </style>
<?php
    }
}
