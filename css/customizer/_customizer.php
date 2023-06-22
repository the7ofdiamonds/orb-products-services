<?php
namespace ORB\Services\CSS\Customizer;

include 'customizer-hero.php';

use ORB\Services\CSS\Customizer\Hero\ORB_Services_Hero_Customizer;

class ORB_Services_Customizer
{
	public function __construct()
	{
		add_theme_support('custom-logo');
		add_theme_support("custom-background");
		add_action('wp_head', [$this, 'load_css']);

		new ORB_Services_Hero_Customizer();
	}

	function load_css()
	{
?>
		<style>
			:root {
				--orb-color-primary: #000;
				--orb-color-secondary: #fff;
				--orb-color-tertiary: red;
				--orb-color-quaternary: #2ed341;
				--orb-color-success: green;
				--orb-color-error: red;
				--orb-color-caution: yellow;
				--orb-color-info: blue;
				--orb-border-radius: 0.25em;
				--orb-box-shadow: 0.25em 0.25em 0.25em rgba(0, 0, 0, 0.5);
			}
		</style>
<?php
	}
}
