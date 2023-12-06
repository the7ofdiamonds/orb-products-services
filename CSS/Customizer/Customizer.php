<?php

namespace ORB\Products_Services\CSS\Customizer;

class Customizer
{
	public function __construct()
	{		
	}

	function register_customizer_panel($wp_customize)
	{
		add_theme_support('customizer');
		$wp_customize->add_panel(
			'orb_products_services_settings',
			array(
				'title' => __('ORB Products & Services Settings', 'orb-products-services'),
				'priority' => 10,
			)
		);
	}
}
