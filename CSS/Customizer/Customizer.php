<?php
namespace ORB_Products_Services\CSS\Customizer;

class Customizer
{
	public function __construct()
	{
		add_theme_support('custom-logo');
		add_theme_support("custom-background");

		add_action('customize_register', array($this, 'register_customizer_panel'));

		new BorderRadius;
		new Color;
		new Hero;
		// new Products;
		new Services;
		new Shadow;
	}

	function register_customizer_panel($wp_customize)
	{
		add_theme_support('customizer');
		$wp_customize->add_panel(
			'orb_products_services_settings',
			array(
				'title' => __('ORB Products & Services Settings', 'the-house-forever-wins'),
				'priority' => 10,
			)
		);
	}
}
