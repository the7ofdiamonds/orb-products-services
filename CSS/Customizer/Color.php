<?php

namespace ORB\Products_Services\CSS\Customizer;

use WP_Customize_Color_Control;

class Color
{
	public function __construct()
	{
		add_action('customize_register', [$this, 'orb_products_services_color_section']);
	}

	function orb_products_services_color_section($wp_customize)
	{
		$wp_customize->add_section(
			'orb_products_services_color_settings',
			array(
				'priority'       => 9,
				'capability'     => 'edit_theme_options',
				'theme_supports' => '',
				'title'          => __('Colors', 'orb-products-services'),
				'description'    =>  __('Color Settings', 'orb-products-services'),
				'panel'  => 'orb_products_services_settings',
			)
		);

		$wp_customize->add_setting('orb_products_services_primary_color_hue', array(
			'sanitize_callback' => 'sanitize_text_field',
		));

		$wp_customize->add_control(
			new WP_Customize_Color_Control(
				$wp_customize,
				'orb_products_services_primary_color_hue',
				array(
					'type' => 'text',
					'label' => __('Primary Color Hue', 'orb-products-services'),
					'section' => 'orb_products_services_color_settings',
				)
			)
		);

		$wp_customize->add_setting('orb_products_services_primary_color_saturation', array(
			'sanitize_callback' => 'sanitize_text_field',
		));

		$wp_customize->add_control(
			new WP_Customize_Color_Control(
				$wp_customize,
				'orb_products_services_primary_color_saturation',
				array(
					'type' => 'text',
					'label' => __('Primary Color Saturation', 'orb-products-services'),
					'section' => 'orb_products_services_color_settings',
				)
			)
		);

		$wp_customize->add_setting('orb_products_services_primary_color_lightness', array(
			'sanitize_callback' => 'sanitize_text_field',
		));

		$wp_customize->add_control(
			new WP_Customize_Color_Control(
				$wp_customize,
				'orb_products_services_primary_color_lightness',
				array(
					'type' => 'text',
					'label' => __('Primary Color Lightness', 'orb-products-services'),
					'section' => 'orb_products_services_color_settings',
				)
			)
		);

		$wp_customize->add_setting('orb_products_services_secondary_color', array(
			'sanitize_callback' => 'sanitize_text_field',
		));

		$wp_customize->add_control(
			'orb_products_services_secondary_color',
			array(
				'type' => 'color',
				'label' => __('Secondary Color', 'orb-products-services'),
				'section' => 'orb_products_services_color_settings',
			)
		);

		$wp_customize->add_setting('orb_products_services_tertiary_color', array(
			'sanitize_callback' => 'sanitize_text_field',
		));

		$wp_customize->add_control(
			'orb_products_services_tertiary_color',
			array(
				'type' => 'color',
				'label' => __('Tertiary Color', 'orb-products-services'),
				'section' => 'orb_products_services_color_settings',
			)
		);

		$wp_customize->add_setting('orb_products_services_quaternary_color', array(
			'sanitize_callback' => 'sanitize_text_field',
		));

		$wp_customize->add_control(
			'orb_products_services_quaternary_color',
			array(
				'type' => 'color',
				'label' => __('Quaternary Color', 'orb-products-services'),
				'section' => 'orb_products_services_color_settings',
			)
		);

		$wp_customize->add_setting('orb_products_services_success_color', array(
			'sanitize_callback' => 'sanitize_text_field',
		));

		$wp_customize->add_control(
			'orb_products_services_success_color',
			array(
				'type' => 'color',
				'label' => __('Success Color', 'orb-products-services'),
				'section' => 'orb_products_services_color_settings',
			)
		);

		$wp_customize->add_setting('orb_products_services_error_color', array(
			'sanitize_callback' => 'sanitize_text_field',
		));

		$wp_customize->add_control(
			'orb_products_services_error_color',
			array(
				'type' => 'color',
				'label' => __('Error Color', 'orb-products-services'),
				'section' => 'orb_products_services_color_settings',
			)
		);

		$wp_customize->add_setting('orb_products_services_caution_color', array(
			'sanitize_callback' => 'sanitize_text_field',
		));

		$wp_customize->add_control(
			'orb_products_services_caution_color',
			array(
				'type' => 'color',
				'label' => __('Caution Color', 'orb-products-services'),
				'section' => 'orb_products_services_color_settings',
			)
		);

		$wp_customize->add_setting('orb_products_services_info_color', array(
			'sanitize_callback' => 'sanitize_text_field',
		));

		$wp_customize->add_control(
			'orb_products_services_info_color',
			array(
				'type' => 'color',
				'label' => __('Info Color', 'orb-products-services'),
				'section' => 'orb_products_services_color_settings',
			)
		);

		$wp_customize->add_setting('orb_products_services_btn_color', array(
			'sanitize_callback' => 'sanitize_text_field',
		));

		$wp_customize->add_control(
			'orb_products_services_btn_color',
			array(
				'type' => 'color',
				'label' => __('Button Color', 'orb-products-services'),
				'section' => 'orb_products_services_color_settings',
			)
		);

		$wp_customize->add_setting('orb_products_services_btn_font_color', array(
			'sanitize_callback' => 'sanitize_text_field',
		));

		$wp_customize->add_control(
			'orb_products_services_btn_font_color',
			array(
				'type' => 'color',
				'label' => __('Button Text Color', 'orb-products-services'),
				'section' => 'orb_products_services_color_settings',
			)
		);
	}

	function load_css()
	{
?>
		<style>
			:root {
				--orb-products-services-color-primary: <?php
										$h = !empty(get_theme_mod('orb_products_services_primary_color_hue')) ? get_theme_mod('orb_products_services_primary_color_hue') : 0;
										$s = !empty(get_theme_mod('orb_products_services_primary_color_saturation')) ? get_theme_mod('orb_products_services_primary_color_saturation') : 0;
										$l = !empty(get_theme_mod('orb_products_services_primary_color_lightness')) ? get_theme_mod('orb_products_services_primary_color_lightness') : 100;

										echo "hsl({$h}, {$s}%, {$l}%)";
										?>;

				--orb-products-services-color-secondary: <?php
										$h = !empty(get_theme_mod('orb_products_services_secondary_color_hue')) ? get_theme_mod('orb_products_services_secondary_color_hue') : 0;
										$s = !empty(get_theme_mod('orb_products_services_secondary_color_saturation')) ? get_theme_mod('orb_products_services_secondary_color_saturation') : 0;
										$l = !empty(get_theme_mod('orb_products_services_secondary_color_lightness')) ? get_theme_mod('orb_products_services_secondary_color_lightness') : 0;

										echo "hsl({$h}, {$s}%, {$l}%)";
										?>;

				--orb-products-services-color-tertiary: <?php
										$h = !empty(get_theme_mod('orb_products_services_tertiary_color_hue')) ? get_theme_mod('orb_products_services_tertiary_color_hue') : 0;
										$s = !empty(get_theme_mod('orb_products_services_tertiary_color_saturation')) ? get_theme_mod('orb_products_services_tertiary_color_saturation') : 100;
										$l = !empty(get_theme_mod('orb_products_services_tertiary_color_lightness')) ? get_theme_mod('orb_products_services_tertiary_color_lightness') : 50;

										echo "hsl({$h}, {$s}%, {$l}%)";
										?>;

				--orb-products-services-color-quaternary: <?php
										$h = !empty(get_theme_mod('orb_products_services_quaternary_color_hue')) ? get_theme_mod('orb_products_services_quaternary_color_hue') : 120;
										$s = !empty(get_theme_mod('orb_products_services_quaternary_color_saturation')) ? get_theme_mod('orb_products_services_quaternary_color_saturation') : 100;
										$l = !empty(get_theme_mod('orb_products_services_quaternary_color_lightness')) ? get_theme_mod('orb_products_services_quaternary_color_lightness') : 30;

										echo "hsl({$h}, {$s}%, {$l}%)";
										?>;

				--orb-products-services-color-success: <?php
										$h = !empty(get_theme_mod('orb_products_services_success_color_hue')) ? get_theme_mod('orb_products_services_success_color_hue') : 120;
										$s = !empty(get_theme_mod('orb_products_services_success_color_saturation')) ? get_theme_mod('orb_products_services_success_color_saturation') : 100;
										$l = !empty(get_theme_mod('orb_products_services_success_color_lightness')) ? get_theme_mod('orb_products_services_success_color_lightness') : 30;

										echo "hsl({$h}, {$s}%, {$l}%)";
										?>;

				--orb-products-services-color-success-text: <?php
											$h = !empty(get_theme_mod('orb_products_services_success_color_hue')) ? get_theme_mod('orb_products_services_success_color_hue') : 120;
											$s = !empty(get_theme_mod('orb_products_services_success_color_saturation')) ? get_theme_mod('orb_products_services_success_color_saturation') : 100;
											$l = 90;

											echo "hsl({$h}, {$s}%, {$l}%)";
											?>;

				--orb-products-services-color-error: <?php
									$h = !empty(get_theme_mod('orb_products_services_error_color_hue')) ? get_theme_mod('orb_products_services_error_color_hue') : 0;
									$s = !empty(get_theme_mod('orb_products_services_error_color_saturation')) ? get_theme_mod('orb_products_services_error_color_saturation') : 100;
									$l = !empty(get_theme_mod('orb_products_services_error_color_lightness')) ? get_theme_mod('orb_products_services_error_color_lightness') : 50;

									echo "hsl({$h}, {$s}%, {$l}%)";
									?>;

				--orb-products-services-color-error-text: <?php
										$h = !empty(get_theme_mod('orb_products_services_error_color_hue')) ? get_theme_mod('orb_products_services_error_color_hue') : 0;
										$s = !empty(get_theme_mod('orb_products_services_error_color_saturation')) ? get_theme_mod('orb_products_services_error_color_saturation') : 100;
										$l = 90;

										echo "hsl({$h}, {$s}%, {$l}%)";
										?>;

				--orb-products-services-color-caution: <?php
										$h = !empty(get_theme_mod('orb_products_services_caution_color_hue')) ? get_theme_mod('orb_products_services_caution_color_hue') : 60;
										$s = !empty(get_theme_mod('orb_products_services_caution_color_saturation')) ? get_theme_mod('orb_products_services_caution_color_saturation') : 100;
										$l = !empty(get_theme_mod('orb_products_services_caution_color_lightness')) ? get_theme_mod('orb_products_services_caution_color_lightness') : 50;

										echo "hsl({$h}, {$s}%, {$l}%)";
										?>;

				--orb-products-services-color-caution-text: <?php
											$h = !empty(get_theme_mod('orb_products_services_caution_color_hue')) ? get_theme_mod('orb_products_services_caution_color_hue') : 60;
											$s = !empty(get_theme_mod('orb_products_services_caution_color_saturation')) ? get_theme_mod('orb_products_services_caution_color_saturation') : 100;
											$l = 10;

											echo "hsl({$h}, {$s}%, {$l}%)";
											?>;

				--orb-products-services-color-info: <?php
									$h = !empty(get_theme_mod('orb_products_services_info_color_hue')) ? get_theme_mod('orb_products_services_info_color_hue') : 240;
									$s = !empty(get_theme_mod('orb_products_services_info_color_saturation')) ? get_theme_mod('orb_products_services_info_color_saturation') : 100;
									$l = !empty(get_theme_mod('orb_products_services_info_color_lightness')) ? get_theme_mod('orb_products_services_info_color_lightness') : 50;

									echo "hsl({$h}, {$s}%, {$l}%)";
									?>;

				--orb-products-services-color-info-text: <?php
										$h = !empty(get_theme_mod('orb_products_services_info_color_hue')) ? get_theme_mod('orb_products_services_info_color_hue') : 240;
										$s = !empty(get_theme_mod('orb_products_services_info_color_saturation')) ? get_theme_mod('orb_products_services_info_color_saturation') : 100;
										$l = 90;

										echo "hsl({$h}, {$s}%, {$l}%)";
										?>;

				--orb-products-services-btn-color: <?php
									$h = !empty(get_theme_mod('orb_products_services_btn_color_hue')) ? get_theme_mod('orb_products_services_btn_color_hue') : 0;
									$s = !empty(get_theme_mod('orb_products_services_btn_color_saturation')) ? get_theme_mod('orb_products_services_btn_color_saturation') : 0;
									$l = !empty(get_theme_mod('orb_products_services_btn_color_lightness')) ? get_theme_mod('orb_products_services_btn_color_lightness') : 0;

									echo "hsl({$h}, {$s}%, {$l}%)";
									?>;

				--orb-products-services-btn-font-color: <?php
										$h = !empty(get_theme_mod('orb_products_services_btn_color_hue')) ? get_theme_mod('orb_products_services_btn_color_hue') : 0;
										$s = !empty(get_theme_mod('orb_products_services_btn_color_saturation')) ? get_theme_mod('orb_products_services_btn_color_saturation') : 0;
										$l = !empty(get_theme_mod('orb_products_services_btn_color_lightness')) ? get_theme_mod('orb_products_services_btn_color_lightness') : 100;

										echo "hsl({$h}, {$s}%, {$l}%)";
										?>;
			}
		</style>
<?php
	}
}
