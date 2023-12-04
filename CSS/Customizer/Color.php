<?php

namespace ORB\Products_Services\CSS\Customizer;

use WP_Customize_Color_Control;

class Color
{
	public function __construct()
	{
		add_action('customize_register', [$this, 'orb_products_services_color_section']);
		add_action('wp_head', [$this, 'load_css']);
	}

	function orb_products_services_color_section($wp_customize)
	{
		$wp_customize->add_section(
			'orb_products_services_color_settings',
			array(
				'priority'       => 9,
				'capability'     => 'edit_theme_options',
				'theme_supports' => '',
				'title'          => __('Colors', 'the-house-forever-wins'),
				'description'    =>  __('Color Settings', 'the-house-forever-wins'),
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
					'label' => __('Primary Color Hue', 'the-house-forever-wins'),
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
					'label' => __('Primary Color Saturation', 'the-house-forever-wins'),
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
					'label' => __('Primary Color Lightness', 'the-house-forever-wins'),
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
				'label' => __('Secondary Color', 'the-house-forever-wins'),
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
				'label' => __('Tertiary Color', 'the-house-forever-wins'),
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
				'label' => __('Quaternary Color', 'the-house-forever-wins'),
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
				'label' => __('Success Color', 'the-house-forever-wins'),
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
				'label' => __('Error Color', 'the-house-forever-wins'),
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
				'label' => __('Caution Color', 'the-house-forever-wins'),
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
				'label' => __('Info Color', 'the-house-forever-wins'),
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
				'label' => __('Button Color', 'the-house-forever-wins'),
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
				'label' => __('Button Text Color', 'the-house-forever-wins'),
				'section' => 'orb_products_services_color_settings',
			)
		);
	}

	function load_css()
	{
?>
		<style>
			:root {
				--orb-color-primary: <?php
														$h = !empty(get_theme_mod('orb_products_services_primary_color_hue')) ? get_theme_mod('orb_products_services_primary_color_hue') : 0;
														$s = !empty(get_theme_mod('orb_products_services_primary_color_saturation')) ? get_theme_mod('orb_products_services_primary_color_saturation') : 0;
														$l = !empty(get_theme_mod('orb_products_services_primary_color_lightness')) ? get_theme_mod('orb_products_services_primary_color_lightness') : 100;

														echo "hsl({$h}, {$s}%, {$l}%)";
														?>;

				--orb-color-secondary: <?php
															$h = !empty(get_theme_mod('orb_products_services_secondary_color_hue')) ? get_theme_mod('orb_products_services_secondary_color_hue') : 0;
															$s = !empty(get_theme_mod('orb_products_services_secondary_color_saturation')) ? get_theme_mod('orb_products_services_secondary_color_saturation') : 0;
															$l = !empty(get_theme_mod('orb_products_services_secondary_color_lightness')) ? get_theme_mod('orb_products_services_secondary_color_lightness') : 0;

															echo "hsl({$h}, {$s}%, {$l}%)";
															?>;

				--orb-color-tertiary: <?php
														$h = !empty(get_theme_mod('orb_products_services_tertiary_color_hue')) ? get_theme_mod('orb_products_services_tertiary_color_hue') : 0;
														$s = !empty(get_theme_mod('orb_products_services_tertiary_color_saturation')) ? get_theme_mod('orb_products_services_tertiary_color_saturation') : 100;
														$l = !empty(get_theme_mod('orb_products_services_tertiary_color_lightness')) ? get_theme_mod('orb_products_services_tertiary_color_lightness') : 50;

														echo "hsl({$h}, {$s}%, {$l}%)";
														?>;

				--orb-color-quaternary: <?php
															$h = !empty(get_theme_mod('orb_products_services_quaternary_color_hue')) ? get_theme_mod('orb_products_services_quaternary_color_hue') : 120;
															$s = !empty(get_theme_mod('orb_products_services_quaternary_color_saturation')) ? get_theme_mod('orb_products_services_quaternary_color_saturation') : 100;
															$l = !empty(get_theme_mod('orb_products_services_quaternary_color_lightness')) ? get_theme_mod('orb_products_services_quaternary_color_lightness') : 30;

															echo "hsl({$h}, {$s}%, {$l}%)";
															?>;

				--orb-color-success: <?php
														$h = !empty(get_theme_mod('orb_products_services_success_color_hue')) ? get_theme_mod('orb_products_services_success_color_hue') : 120;
														$s = !empty(get_theme_mod('orb_products_services_success_color_saturation')) ? get_theme_mod('orb_products_services_success_color_saturation') : 100;
														$l = !empty(get_theme_mod('orb_products_services_success_color_lightness')) ? get_theme_mod('orb_products_services_success_color_lightness') : 30;

														echo "hsl({$h}, {$s}%, {$l}%)";
														?>;

				--orb-color-success-text: <?php
															$h = !empty(get_theme_mod('orb_products_services_success_color_hue')) ? get_theme_mod('orb_products_services_success_color_hue') : 120;
															$s = !empty(get_theme_mod('orb_products_services_success_color_saturation')) ? get_theme_mod('orb_products_services_success_color_saturation') : 100;
															$l = 90;

															echo "hsl({$h}, {$s}%, {$l}%)";
															?>;

				--orb-color-error: <?php
														$h = !empty(get_theme_mod('orb_products_services_error_color_hue')) ? get_theme_mod('orb_products_services_error_color_hue') : 0;
														$s = !empty(get_theme_mod('orb_products_services_error_color_saturation')) ? get_theme_mod('orb_products_services_error_color_saturation') : 100;
														$l = !empty(get_theme_mod('orb_products_services_error_color_lightness')) ? get_theme_mod('orb_products_services_error_color_lightness') : 50;

														echo "hsl({$h}, {$s}%, {$l}%)";
														?>;

				--orb-color-error-text: <?php
															$h = !empty(get_theme_mod('orb_products_services_error_color_hue')) ? get_theme_mod('orb_products_services_error_color_hue') : 0;
															$s = !empty(get_theme_mod('orb_products_services_error_color_saturation')) ? get_theme_mod('orb_products_services_error_color_saturation') : 100;
															$l = 90;

															echo "hsl({$h}, {$s}%, {$l}%)";
															?>;

				--orb-color-caution: <?php
														$h = !empty(get_theme_mod('orb_products_services_caution_color_hue')) ? get_theme_mod('orb_products_services_caution_color_hue') : 60;
														$s = !empty(get_theme_mod('orb_products_services_caution_color_saturation')) ? get_theme_mod('orb_products_services_caution_color_saturation') : 100;
														$l = !empty(get_theme_mod('orb_products_services_caution_color_lightness')) ? get_theme_mod('orb_products_services_caution_color_lightness') : 50;

														echo "hsl({$h}, {$s}%, {$l}%)";
														?>;

				--orb-color-caution-text: <?php
															$h = !empty(get_theme_mod('orb_products_services_caution_color_hue')) ? get_theme_mod('orb_products_services_caution_color_hue') : 60;
															$s = !empty(get_theme_mod('orb_products_services_caution_color_saturation')) ? get_theme_mod('orb_products_services_caution_color_saturation') : 100;
															$l = 10;

															echo "hsl({$h}, {$s}%, {$l}%)";
															?>;

				--orb-color-info: <?php
													$h = !empty(get_theme_mod('orb_products_services_info_color_hue')) ? get_theme_mod('orb_products_services_info_color_hue') : 240;
													$s = !empty(get_theme_mod('orb_products_services_info_color_saturation')) ? get_theme_mod('orb_products_services_info_color_saturation') : 100;
													$l = !empty(get_theme_mod('orb_products_services_info_color_lightness')) ? get_theme_mod('orb_products_services_info_color_lightness') : 50;

													echo "hsl({$h}, {$s}%, {$l}%)";
													?>;

				--orb-color-info-text: <?php
															$h = !empty(get_theme_mod('orb_products_services_info_color_hue')) ? get_theme_mod('orb_products_services_info_color_hue') : 240;
															$s = !empty(get_theme_mod('orb_products_services_info_color_saturation')) ? get_theme_mod('orb_products_services_info_color_saturation') : 100;
															$l = 90;

															echo "hsl({$h}, {$s}%, {$l}%)";
															?>;

				--orb-btn-color: <?php
													$h = !empty(get_theme_mod('orb_products_services_btn_color_hue')) ? get_theme_mod('orb_products_services_btn_color_hue') : 0;
													$s = !empty(get_theme_mod('orb_products_services_btn_color_saturation')) ? get_theme_mod('orb_products_services_btn_color_saturation') : 0;
													$l = !empty(get_theme_mod('orb_products_services_btn_color_lightness')) ? get_theme_mod('orb_products_services_btn_color_lightness') : 0;

													echo "hsl({$h}, {$s}%, {$l}%)";
													?>;

				--orb-btn-font-color: <?php
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
