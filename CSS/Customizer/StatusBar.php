<?php

namespace ORB\Products_Services\CSS\Customizer;

class StatusBar
{
    private $customizer;

    public function __construct()
    {
        $this->customizer = new Customizer;
    }

    function orb_products_services_status_bar_section($wp_customize)
    {
        $wp_customize->add_section(
            'orb_products_services_status_bar_settings',
            array(
                'priority'       => 9,
                'capability'     => 'edit_theme_options',
                'theme_supports' => '',
                'title'          => __('Status Bar', 'orb-products-services'),
                'description'    =>  __('Status Bar Settings', 'orb-products-services'),
                'panel'  => 'orb_products_services_settings',
            )
        );

        $wp_customize->add_setting('orb_products_services_success_color', array(
            'sanitize_callback' => 'sanitize_text_field',
        ));

        $wp_customize->add_control(
            'orb_products_services_success_color',
            array(
                'type' => 'input',
                'label' => __('Success Color', 'orb-products-services'),
                'section' => 'orb_products_services_status_bar_settings',
            )
        );

        $wp_customize->add_setting('orb_products_services_error_color', array(
            'sanitize_callback' => 'sanitize_text_field',
        ));

        $wp_customize->add_control(
            'orb_products_services_error_color',
            array(
                'type' => 'input',
                'label' => __('Error Color', 'orb-products-services'),
                'section' => 'orb_products_services_status_bar_settings',
            )
        );

        $wp_customize->add_setting('orb_products_services_caution_color', array(
            'sanitize_callback' => 'sanitize_text_field',
        ));

        $wp_customize->add_control(
            'orb_products_services_caution_color',
            array(
                'type' => 'input',
                'label' => __('Caution Color', 'orb-products-services'),
                'section' => 'orb_products_services_status_bar_settings',
            )
        );

        $wp_customize->add_setting('orb_products_services_info_color', array(
            'sanitize_callback' => 'sanitize_text_field',
        ));

        $wp_customize->add_control(
            'orb_products_services_info_color',
            array(
                'type' => 'input',
                'label' => __('Info Color', 'orb-products-services'),
                'section' => 'orb_products_services_status_bar_settings',
            )
        );
    }

    function load_css()
    {
?>
        <style>
            :root {
                --orb-products-services-color-success: <?php
                                                        $h = !empty(get_theme_mod('orb_products_services_success_color_hue')) ? get_theme_mod('orb_products_services_success_color_hue') : 120;
                                                        $s = !empty(get_theme_mod('orb_products_services_success_color_saturation')) ? get_theme_mod('orb_products_services_success_color_saturation') : 100;
                                                        $l = !empty(get_theme_mod('orb_products_services_success_color_lightness')) ? get_theme_mod('orb_products_services_success_color_lightness') : 30;

                                                        echo "hsl({$h}, {$s}%, {$l}%)";
                                                        ?>;

                --orb-products-services-color-success-text: <?php
                                                            $lightness = $this->customizer->calculate_lightness($h, $l);

                                                            echo "hsl({$h}, {$s}%, {$lightness}%)";
                                                            ?>;

                --orb-products-services-color-error: <?php
                                                        $h = !empty(get_theme_mod('orb_products_services_error_color_hue')) ? get_theme_mod('orb_products_services_error_color_hue') : 0;
                                                        $s = !empty(get_theme_mod('orb_products_services_error_color_saturation')) ? get_theme_mod('orb_products_services_error_color_saturation') : 100;
                                                        $l = !empty(get_theme_mod('orb_products_services_error_color_lightness')) ? get_theme_mod('orb_products_services_error_color_lightness') : 50;

                                                        echo "hsl({$h}, {$s}%, {$l}%)";
                                                        ?>;

                --orb-products-services-color-error-text: <?php
                                                            $lightness = $this->customizer->calculate_lightness($h, $l);

                                                            echo "hsl({$h}, {$s}%, {$lightness}%)";
                                                            ?>;

                --orb-products-services-color-caution: <?php
                                                        $h = !empty(get_theme_mod('orb_products_services_caution_color_hue')) ? get_theme_mod('orb_products_services_caution_color_hue') : 60;
                                                        $s = !empty(get_theme_mod('orb_products_services_caution_color_saturation')) ? get_theme_mod('orb_products_services_caution_color_saturation') : 100;
                                                        $l = !empty(get_theme_mod('orb_products_services_caution_color_lightness')) ? get_theme_mod('orb_products_services_caution_color_lightness') : 50;

                                                        echo "hsl({$h}, {$s}%, {$l}%)";
                                                        ?>;

                --orb-products-services-color-caution-text: <?php
                                                            $lightness = $this->customizer->calculate_lightness($h, $l);

                                                            echo "hsl({$h}, {$s}%, {$lightness}%)";
                                                            ?>;

                --orb-products-services-color-info: <?php
                                                    $h = !empty(get_theme_mod('orb_products_services_info_color_hue')) ? get_theme_mod('orb_products_services_info_color_hue') : 240;
                                                    $s = !empty(get_theme_mod('orb_products_services_info_color_saturation')) ? get_theme_mod('orb_products_services_info_color_saturation') : 100;
                                                    $l = !empty(get_theme_mod('orb_products_services_info_color_lightness')) ? get_theme_mod('orb_products_services_info_color_lightness') : 50;

                                                    echo "hsl({$h}, {$s}%, {$l}%)";
                                                    ?>;

                --orb-products-services-color-info-text: <?php
                                                            $lightness = $this->customizer->calculate_lightness($h, $l);

                                                            echo "hsl({$h}, {$s}%, {$lightness}%)";
                                                            ?>;
            }
        </style>
<?php
    }
}
