<?php

namespace ORB\Products_Services\CSS\Customizer;

class Table
{
    private $customizer;

    public function __construct()
    {
        $this->customizer = new Customizer;
    }

    function orb_products_services_table_section($wp_customize)
    {
        $wp_customize->add_section(
            'orb_products_services_table_settings',
            array(
                'priority'       => 9,
                'capability'     => 'edit_theme_options',
                'theme_supports' => '',
                'title'          => __('Table', 'orb-accounts'),
                'description'    => __('Table Settings', 'orb-accounts'),
                'panel'  => 'orb_products_services_settings',
            )
        );

        $wp_customize->add_setting('orb_products_services_table_color_hue', array(
            'sanitize_callback' => 'sanitize_text_field',
        ));

        $wp_customize->add_setting('orb_products_services_table_color_saturation', array(
            'sanitize_callback' => 'sanitize_text_field',
        ));

        $wp_customize->add_setting('orb_products_services_table_color_lightness', array(
            'sanitize_callback' => 'sanitize_text_field',
        ));

        $wp_customize->add_setting('orb_products_services_table_body_color_hue', array(
            'sanitize_callback' => 'sanitize_text_field',
        ));

        $wp_customize->add_setting('orb_products_services_table_body_color_saturation', array(
            'sanitize_callback' => 'sanitize_text_field',
        ));

        $wp_customize->add_setting('orb_products_services_table_body_color_lightness', array(
            'sanitize_callback' => 'sanitize_text_field',
        ));

        $wp_customize->add_control(
            'orb_products_services_table_color_hue',
            array(
                'type' => 'input',
                'label' => __('Header & Footer Hue', 'orb-accounts'),
                'section' => 'orb_products_services_table_settings',
            )
        );

        $wp_customize->add_control(
            'orb_products_services_table_color_saturation',
            array(
                'type' => 'input',
                'label' => __('Header & Footer Saturation', 'orb-accounts'),
                'section' => 'orb_products_services_table_settings',
            )
        );

        $wp_customize->add_control(
            'orb_products_services_table_color_lightness',
            array(
                'type' => 'input',
                'label' => __('Header & Footer Lightness', 'orb-accounts'),
                'section' => 'orb_products_services_table_settings',
            )
        );

        $wp_customize->add_control(
            'orb_products_services_table_body_color_hue',
            array(
                'type' => 'input',
                'label' => __('Body Hue', 'orb-accounts'),
                'section' => 'orb_products_services_table_settings',
            )
        );

        $wp_customize->add_control(
            'orb_products_services_table_body_color_saturation',
            array(
                'type' => 'input',
                'label' => __('Body Saturation', 'orb-accounts'),
                'section' => 'orb_products_services_table_settings',
            )
        );

        $wp_customize->add_control(
            'orb_products_services_table_body_color_lightness',
            array(
                'type' => 'input',
                'label' => __('Body Lightness', 'orb-accounts'),
                'section' => 'orb_products_services_table_settings',
            )
        );
    }

    function load_css()
    {
?>
        <style>
            :root {
               --orb-products-services-table-color: <?php
                                            $h = !empty(get_theme_mod('orb_products_services_table_color_hue')) ? get_theme_mod('orb_products_services_table_color_hue') : 0;
                                            $s = !empty(get_theme_mod('orb_products_services_table_color_saturation')) ? get_theme_mod('orb_products_services_table_color_saturation') : 0;
                                            $l = !empty(get_theme_mod('orb_products_services_table_color_lightness')) ? get_theme_mod('orb_products_services_table_color_lightness') : 0;

                                            echo "hsl({$h}, {$s}%, {$l}%)";
                                            ?>;

               --orb-products-services-table-color-text: <?php
                                                    $hue = !empty(get_theme_mod('orb_products_services_table_color_hue')) ? get_theme_mod('orb_products_services_table_color_hue') : 0;
                                                    $lightness = !empty(get_theme_mod('orb_products_services_table_color_lightness')) ? get_theme_mod('orb_products_services_table_color_lightness') : 0;

                                                    $l = $this->customizer->calculate_lightness($hue, $lightness);

                                                    echo "hsl({$h}, {$s}%, {$l}%)";
                                                    ?>;

               --orb-products-services-table-border-color: <?php
                                                    $h = !empty(get_theme_mod('orb_products_services_table_body_color_hue')) ? get_theme_mod('orb_products_services_table_body_color_hue') : 0;
                                                    $s = !empty(get_theme_mod('orb_products_services_table_body_color_saturation')) ? get_theme_mod('orb_products_services_table_body_color_saturation') : 0;
                                                    $l = !empty(get_theme_mod('orb_products_services_table_body_color_lightness')) ? get_theme_mod('orb_products_services_table_body_color_lightness') : 100;

                                                    echo "hsl({$h}, {$s}%, {$l}%)";
                                                    ?>;

               --orb-products-services-table-body-color: <?php
                                                    echo "hsl({$h}, {$s}%, {$l}%)";
                                                    ?>;

               --orb-products-services-table-body-color-text: <?php
                                                        $hue = !empty(get_theme_mod('orb_products_services_table_body_color_hue')) ? get_theme_mod('orb_products_services_table_body_color_hue') : 0;
                                                        $lightness = !empty(get_theme_mod('orb_products_services_table_body_color_lightness')) ? get_theme_mod('orb_products_services_table_body_color_lightness') : 100;

                                                        $l = $this->customizer->calculate_lightness($hue, $lightness);

                                                        echo "hsl({$h}, {$s}%, {$l}%)";
                                                        ?>;

               --orb-products-services-table-body-border-color: <?php
                                                        $hue = !empty(get_theme_mod('orb_products_services_table_body_color_hue')) ? get_theme_mod('orb_products_services_table_body_color_hue') : 0;
                                                        $lightness = !empty(get_theme_mod('orb_products_services_table_body_color_lightness')) ? get_theme_mod('orb_products_services_table_body_color_lightness') : 100;

                                                        $l = $this->customizer->calculate_lightness($hue, $lightness);

                                                        echo "hsl({$h}, {$s}%, {$l}%)";
                                                        ?>;
            }
        </style>
<?php
    }
}
