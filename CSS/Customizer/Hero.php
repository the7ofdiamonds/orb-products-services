<?php

namespace ORB\Products_Services\CSS\Customizer;

class Hero
{
    public function __construct()
    {
        add_action('customize_register', array($this, 'orb_products_services_hero_section'));
        add_action('wp_head', [$this, 'load_css']);
    }

    function orb_products_services_hero_section($wp_customize)
    {
        $wp_customize->add_section(
            'hero_settings',
            array(
                'priority'       => 2,
                'capability'     => 'edit_theme_options',
                'theme_supports' => '',
                'title'          => __('Hero', 'the-house-forever-wins'),
                'description'    =>  __('Hero Section Options', 'the-house-forever-wins'),
                'panel'  => 'orb_products_services_settings',
            )
        );

        $wp_customize->add_setting('hero_card_background_color', [
            'sanitize_callback' => 'sanitize_text_field',
        ]);

        $wp_customize->add_control(
            new \WP_Customize_Color_Control(
                $wp_customize,
                'hero_card_background_color',
                [
                    'label' => __('Hero Card Background Color', 'the-house-forever-wins'),
                    'section' => 'hero_settings',
                ]
            )
        );

        $wp_customize->add_setting('hero_card_background_color_hover', [
            'sanitize_callback' => 'sanitize_text_field',
        ]);

        $wp_customize->add_control(
            new \WP_Customize_Color_Control(
                $wp_customize,
                'hero_card_background_color_hover',
                [
                    'label' => __('Hero Card Background Color Hover', 'the-house-forever-wins'),
                    'section' => 'hero_settings',
                ]
            )
        );

        $wp_customize->add_setting('hero_card_text_color', [
            'sanitize_callback' => 'sanitize_text_field',
        ]);

        $wp_customize->add_control(
            new \WP_Customize_Color_Control(
                $wp_customize,
                'hero_card_text_color',
                [
                    'label' => __('Hero Card Text Color', 'the-house-forever-wins'),
                    'section' => 'hero_settings',
                ]
            )
        );

        $wp_customize->add_setting('hero_card_text_color_hover', [
            'sanitize_callback' => 'sanitize_text_field',
        ]);

        $wp_customize->add_control(
            new \WP_Customize_Color_Control(
                $wp_customize,
                'hero_card_text_color_hover',
                [
                    'label' => __('Hero Card Text Color Hover', 'the-house-forever-wins'),
                    'section' => 'hero_settings',
                ]
            )
        );

        $wp_customize->add_setting('hero_button_background_color', [
            'sanitize_callback' => 'sanitize_text_field',
        ]);

        $wp_customize->add_control(
            new \WP_Customize_Color_Control(
                $wp_customize,
                'hero_button_background_color',
                [
                    'label' => __('Hero Button Background Color', 'the-house-forever-wins'),
                    'section' => 'hero_settings',
                ]
            )
        );

        $wp_customize->add_setting('hero_button_background_color_hover', [
            'sanitize_callback' => 'sanitize_text_field',
        ]);

        $wp_customize->add_control(
            new \WP_Customize_Color_Control(
                $wp_customize,
                'hero_button_background_color_hover',
                [
                    'label' => __('Hero Button Background Color Hover', 'the-house-forever-wins'),
                    'section' => 'hero_settings',
                ]
            )
        );

        $wp_customize->add_setting('hero_button_text_color', [
            'sanitize_callback' => 'sanitize_text_field',
        ]);

        $wp_customize->add_control(
            new \WP_Customize_Color_Control(
                $wp_customize,
                'hero_button_text_color',
                [
                    'label' => __('Hero Button Text Color', 'the-house-forever-wins'),
                    'section' => 'hero_settings',
                ]
            )
        );

        $wp_customize->add_setting('hero_button_text_color_hover', [
            'sanitize_callback' => 'sanitize_text_field',
        ]);

        $wp_customize->add_control(
            new \WP_Customize_Color_Control(
                $wp_customize,
                'hero_button_text_color_hover',
                [
                    'label' => __('Hero Button Text Color Hover', 'the-house-forever-wins'),
                    'section' => 'hero_settings',
                ]
            )
        );

        $wp_customize->add_setting('hero_button_icon_color', [
            'sanitize_callback' => 'sanitize_text_field',
        ]);

        $wp_customize->add_control(
            new \WP_Customize_Color_Control(
                $wp_customize,
                'hero_button_icon_color',
                [
                    'label' => __('Hero Button Icon Color', 'the-house-forever-wins'),
                    'section' => 'hero_settings',
                ]
            )
        );

        $wp_customize->add_setting('hero_button_icon_color_hover', [
            'sanitize_callback' => 'sanitize_text_field',
        ]);

        $wp_customize->add_control(
            new \WP_Customize_Color_Control(
                $wp_customize,
                'hero_button_icon_color_hover',
                [
                    'label' => __('Hero Button Icon Color Hover', 'the-house-forever-wins'),
                    'section' => 'hero_settings',
                ]
            )
        );
    }

    function load_css()
    {
?>
        <style>
            .hero-card.card {
                background-color: <?php if (empty(get_theme_mod('hero_card_background_color'))) {
                                        echo esc_html('black');
                                    } else {
                                        echo esc_html(get_theme_mod('hero_card_background_color'));
                                    } ?>;

                color: <?php if (empty(get_theme_mod('hero_card_text_color'))) {
                            echo esc_html('white');
                        } else {
                            echo esc_html(get_theme_mod('hero_card_text_color'));
                        } ?>;
            }

            .start-btn {
                background-color: <?php if (empty(get_theme_mod('hero_button_background_color'))) {
                                        echo esc_html('black');
                                    } else {
                                        echo esc_html(get_theme_mod('hero_button_background_color'));
                                    } ?>;

                color: <?php if (empty(get_theme_mod('hero_button_text_color'))) {
                            echo esc_html('white');;
                        } else {
                            echo esc_html(get_theme_mod('hero_button_text_color'));
                        } ?>;
            }

            .start-btn i {
                color: <?php if (empty(get_theme_mod('hero_button_icon_color'))) {
                            echo esc_html('lime');;
                        } else {
                            echo esc_html(get_theme_mod('hero_button_icon_color'));
                        } ?>;
            }

            .start-btn i:hover {
                color: <?php if (empty(get_theme_mod('hero_button_icon_color_hover'))) {
                            echo esc_html('lime');;
                        } else {
                            echo esc_html(get_theme_mod('hero_button_icon_color_hover'));
                        } ?>;
            }
        </style>
<?php
    }
}
