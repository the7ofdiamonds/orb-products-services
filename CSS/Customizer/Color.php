<?php

namespace ORB_Products_Services\CSS\Customizer;

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

		$wp_customize->add_setting('orb_products_services_primary_color', array(
			'sanitize_callback' => 'sanitize_text_field',
		));

		$wp_customize->add_control(
			'orb_products_services_primary_color',
			array(
				'type' => 'input',
				'label' => __('Primary Color', 'the-house-forever-wins'),
				'section' => 'orb_products_services_color_settings',
			)
		);

		$wp_customize->add_setting('orb_products_services_secondary_color', array(
			'sanitize_callback' => 'sanitize_text_field',
		));

		$wp_customize->add_control(
			'orb_products_services_secondary_color',
			array(
				'type' => 'input',
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
				'type' => 'input',
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
				'type' => 'input',
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
				'type' => 'input',
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
				'type' => 'input',
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
				'type' => 'input',
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
				'type' => 'input',
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
				'type' => 'input',
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
				'type' => 'input',
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
				--orb-products-services-color-primary: <?php
														if (empty(get_theme_mod('orb_products_services_primary_color'))) {
															echo esc_html('#fff');
														} else {
															echo esc_html(get_theme_mod('orb_products_services_primary_color'));
														} ?>;
				--orb-products-services-color-secondary: <?php
															if (empty(get_theme_mod('orb_products_services_secondary_color'))) {
																echo esc_html('#000');
															} else {
																echo esc_html(get_theme_mod('orb_products_services_secondary_color'));
															} ?>;
				--orb-products-services-color-tertiary: <?php
														if (empty(get_theme_mod('orb_products_services_tertiary_color'))) {
															echo esc_html('red');
														} else {
															echo esc_html(get_theme_mod('orb_products_services_tertiary_color'));
														} ?>;
				--orb-products-services-color-quaternary: <?php
															if (empty(get_theme_mod('orb_products_services_quaternary_color'))) {
																echo esc_html('#2ed341');
															} else {
																echo esc_html(get_theme_mod('orb_products_services_quaternary_color'));
															} ?>;
				--orb-products-services-color-success: <?php
														if (empty(get_theme_mod('orb_products_services_success_color'))) {
															echo esc_html('green');
														} else {
															echo esc_html(get_theme_mod('orb_products_services_success_color'));
														} ?>;
				--orb-products-services-color-error: <?php
														if (empty(get_theme_mod('orb_products_services_error_color'))) {
															echo esc_html('red');
														} else {
															echo esc_html(get_theme_mod('orb_products_services_error_color'));
														} ?>;
				--orb-products-services-color-caution: <?php
														if (empty(get_theme_mod('orb_products_services_caution_color'))) {
															echo esc_html('yellow');
														} else {
															echo esc_html(get_theme_mod('orb_products_services_caution_color'));
														} ?>;
				--orb-products-services-color-info: <?php
													if (empty(get_theme_mod('orb_products_services_info_color'))) {
														echo esc_html('blue');
													} else {
														echo esc_html(get_theme_mod('orb_products_services_info_color'));
													} ?>;
				--orb-products-services-btn-color: <?php
													if (empty(get_theme_mod('orb_products_services_btn_color'))) {
														echo esc_html('black');
													} else {
														echo esc_html(get_theme_mod('orb_products_services_btn_color'));
													} ?>;
				--orb-products-services-btn-font-color: <?php
														if (empty(get_theme_mod('orb_products_services_btn_font_color'))) {
															echo esc_html('white');
														} else {
															echo esc_html(get_theme_mod('orb_products_services_btn_font_color'));
														} ?>;
			}
		</style>
<?php
	}
}
