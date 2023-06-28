<?php
namespace ORBServices\CSS\Customizer;

// include 'customizer-hero.php';
// include 'customizer-services.php';
// include 'customizer-shadow.php';

use ORBServices\CSS\Customizer\HeroCustomizer;
use ORBServices\CSS\Customizer\ServicesCustomizer;
use ORBServices\CSS\Customizer\ShadowCustomizer;

class Customizer
{
	public function __construct()
	{
		add_theme_support('custom-logo');
		add_theme_support("custom-background");
		add_action('wp_head', [$this, 'load_css']);

		new HeroCustomizer;
		new ServicesCustomizer;
		new ShadowCustomizer;
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
				--orb-box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.85);
				--orb-box-shadow-btn: 0 0 0.5em rgba(0, 0, 0, 0.85);
			}
		</style>
<?php
	}
}