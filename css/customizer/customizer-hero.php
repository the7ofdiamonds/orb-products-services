<?php
namespace ORB\Services\CSS\Customizer\Hero;

class ORB_Services_Hero_Customizer
{

    public function __construct()
    {
        add_action('customize_register', array($this, 'register_orb_hero_customize_section'));
        add_action('wp_head', [$this, 'load_css']);
    }

    public function register_orb_hero_customize_section($wp_customize)
    {
        $this->orb_hero_section($wp_customize);
    }

    private function orb_hero_section($wp_customize)
    {

        $wp_customize->add_section(
            'hero_settings',
            array(
                'priority'       => 2,
                'capability'     => 'edit_theme_options',
                'theme_supports' => '',
                'title'          => __('Hero', 'the-house-forever-wins'),
                'description'    =>  __('Hero Section Options', 'the-house-forever-wins'),
                'panel'  => 'theme_options',
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
                background-color: <?php if (!get_theme_mod('hero_card_background_color')) {
                                        echo 'var(--orb-color-primary)';
                                    } else {
                                        echo esc_html(get_theme_mod('hero_card_background_color'));
                                    } ?>;

                color: <?php if (!get_theme_mod('hero_card_text_color')) {
                            echo 'var(--orb-color-secondary)';
                        } else {
                            echo esc_html(get_theme_mod('hero_card_text_color'));
                        } ?>;

                box-shadow: <?php if (!get_theme_mod('hero_card_box_shadow')) {
                                echo 'var(--orb-box-shadow)';
                            } else {
                                echo esc_html(get_theme_mod('hero_card_box_shadow'));
                            } ?>;

                border-radius: <?php if (!get_theme_mod('hero_card_border_radius')) {
                                    echo 'var(--orb-border-radius)';
                                } else {
                                    echo esc_html(get_theme_mod('hero_card_border_radius'));
                                } ?>;

            }

            .hero-btn {
                background-color: <?php if (!get_theme_mod('hero_button_background_color')) {
                                        echo 'var(--orb-color-primary)';
                                    } else {
                                        echo esc_html(get_theme_mod('hero_button_background_color'));
                                    } ?>;

                color: <?php if (!get_theme_mod('hero_button_text_color')) {
                            echo 'var(--orb-color-secondary)';
                        } else {
                            echo esc_html(get_theme_mod('hero_button_text_color'));
                        } ?>;
            }

            .hero-btn:hover {
                background-color: <?php if (!get_theme_mod('hero_button_background_color_hover')) {
                                        echo 'var(--orb-color-primary)';
                                    } else {
                                        echo esc_html(get_theme_mod('hero_button_background_color_hover'));
                                    } ?>;
                color: <?php if (!get_theme_mod('hero_button_text_color_hover')) {
                            echo 'var(--orb-color-secondary)';
                        } else {
                            echo esc_html(get_theme_mod('hero_button_text_color_hover'));
                        } ?>;
            }

            .hero-btn i {
                color: <?php if (!get_theme_mod('hero_button_icon_color')) {
                            echo 'var(--orb-color-tertiary)';
                        } else {
                            echo esc_html(get_theme_mod('hero_button_icon_color'));
                        } ?>;
            }

            .hero-btn:hover i {
                color: <?php if (!get_theme_mod('hero_button_icon_color_hover')) {
                            echo 'var(--orb-color-quaternary)';
                        } else {
                            echo esc_html(get_theme_mod('hero_button_icon_color_hover'));
                        } ?>;
            }
        </style>
<?php
    }
}
