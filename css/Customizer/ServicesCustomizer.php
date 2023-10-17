<?php

namespace ORB_Products_Services\CSS\Customizer;

class ServicesCustomizer
{

    public function __construct()
    {
        add_action('customize_register', array($this, 'register_orb_services_customize_section'));
        add_action('wp_head', [$this, 'load_css']);
    }

    public function register_orb_services_customize_section($wp_customize)
    {
        $this->orb_services_section($wp_customize);
    }

    private function orb_services_section($wp_customize)
    {

        $wp_customize->add_section(
            'services_settings',
            array(
                'priority'       => 2,
                'capability'     => 'edit_theme_options',
                'theme_supports' => '',
                'title'          => __('Services', 'the-house-forever-wins'),
                'description'    =>  __('Services Section Options', 'the-house-forever-wins'),
                'panel'  => 'theme_options',
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
                    'label' => __('Services Card Background Color', 'the-house-forever-wins'),
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
                    'label' => __('Services Card Background Color Hover', 'the-house-forever-wins'),
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
                    'label' => __('Services Card Text Color', 'the-house-forever-wins'),
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
                    'label' => __('Services Card Text Color Hover', 'the-house-forever-wins'),
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
                    'label' => __('Services Button Background Color', 'the-house-forever-wins'),
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
                    'label' => __('Services Button Background Color Hover', 'the-house-forever-wins'),
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
                    'label' => __('Services Button Text Color', 'the-house-forever-wins'),
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
                    'label' => __('Services Button Text Color Hover', 'the-house-forever-wins'),
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
                    'label' => __('Services Button Icon Color', 'the-house-forever-wins'),
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
                    'label' => __('Services Button Icon Color Hover', 'the-house-forever-wins'),
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
                background-color: <?php if (!get_theme_mod('services_card_background_color')) {
                                        echo 'var(--orb-color-secondary)';
                                    } else {
                                        echo esc_html(get_theme_mod('services_card_background_color'));
                                    } ?>;

                color: <?php if (!get_theme_mod('services_card_text_color')) {
                            echo 'var(--orb-color-primary)';
                        } else {
                            echo esc_html(get_theme_mod('services_card_text_color'));
                        } ?>;

                box-shadow: <?php if (!get_theme_mod('services_card_box_shadow')) {
                                echo 'var(--orb-box-shadow)';
                            } else {
                                echo esc_html(get_theme_mod('services_card_box_shadow'));
                            } ?>;

                border-radius: <?php if (!get_theme_mod('services_card_border_radius')) {
                                    echo 'var(--orb-border-radius)';
                                } else {
                                    echo esc_html(get_theme_mod('services_card_border_radius'));
                                } ?>;

            }

            .services-btn {
                background-color: <?php if (!get_theme_mod('services_button_background_color')) {
                                        echo 'var(--orb-color-primary)';
                                    } else {
                                        echo esc_html(get_theme_mod('services_button_background_color'));
                                    } ?>;

                color: <?php if (!get_theme_mod('services_button_text_color')) {
                            echo 'var(--orb-color-secondary)';
                        } else {
                            echo esc_html(get_theme_mod('services_button_text_color'));
                        } ?>;
            }

            .services-btn:hover {
                background-color: <?php if (!get_theme_mod('services_button_background_color_hover')) {
                                        echo 'var(--orb-color-primary)';
                                    } else {
                                        echo esc_html(get_theme_mod('services_button_background_color_hover'));
                                    } ?>;
                color: <?php if (!get_theme_mod('services_button_text_color_hover')) {
                            echo 'var(--orb-color-secondary)';
                        } else {
                            echo esc_html(get_theme_mod('services_button_text_color_hover'));
                        } ?>;
                box-shadow: unset;
            }

            .services-btn i {
                color: <?php if (!get_theme_mod('services_button_icon_color')) {
                            echo 'var(--orb-color-secondary)';
                        } else {
                            echo esc_html(get_theme_mod('services_button_icon_color'));
                        } ?>;
            }

            .services-btn:hover i {
                color: <?php if (!get_theme_mod('services_button_icon_color_hover')) {
                            echo 'unset';
                        } else {
                            echo esc_html(get_theme_mod('services_button_icon_color_hover'));
                        } ?>;
            }
        </style>
<?php
    }
}
