<?php

namespace ORB\Products_Services\Post_Types\Services;

use ORB\Products_Services\Database\DatabaseServices;

class Services
{
    private $inputs;
    private $post_type;
    private $services_database;
    private $service;

    public function __construct()
    {
        add_action('add_meta_boxes', [$this, 'add_custom_meta_boxes']);

        $this->inputs = [
            [
                "name" => "Service Price",
                "alias" => "service_price",
                "position" => "side",
                "priority" => "high"
            ],
            [
                "name" => "Service Description",
                "alias" => "service_description",
                "position" => "normal",
                "priority" => "high"
            ],
            [
                "name" => "Service Features",
                "alias" => "service_features",
                "position" => "normal",
                "priority" => "high"
            ],
            [
                "name" => "Onboarding Link",
                "alias" => "onboarding_link",
                "position" => "side",
                "priority" => "low"
            ],
            [
                "name" => "Service Button",
                "alias" => "service_button",
                "position" => "side",
                "priority" => "low"
            ],
            [
                "name" => "Service Icon",
                "alias" => "service_icon",
                "position" => "side",
                "priority" => "low"
            ]
        ];
        $this->post_type = 'services';

        add_action('wp_enqueue_scripts', [$this, 'enqueue_jquery']);
        add_action('admin_enqueue_scripts', [$this, 'add_custom_js']);

        add_action('load-post.php', [$this, 'get_service']);
        add_action('load-post-new.php', [$this, 'get_service']);

        $this->services_database = new DatabaseServices;

        add_action('save_post', [$this, 'save_service']);
    }

    function add_custom_meta_boxes()
    {
        if (is_array($this->inputs)) {
            foreach ($this->inputs as $input) {
                add_meta_box(
                    $input['alias'],
                    $input['name'],
                    [$this, $input['alias']],
                    $this->post_type,
                    $input['position'],
                    $input['priority']
                );
            }
        }
    }

    function enqueue_jquery()
    {
        wp_enqueue_script('jquery');
    }

    function add_custom_js()
    {
        wp_enqueue_script('custom-js', ORB_PRODUCTS_SERVICES_URL . 'Post_Types/Services/Services.js', array('jquery'), '1.0', true);
    }

    function get_service()
    {
        if (isset($_GET['post'])) {
            $post_id = absint($_GET['post']);

            if ($post_id) {
                $this->service = $this->services_database->getService($post_id);
            }
        }
    }

    function service_description()
    { ?>
        <textarea name="description"><?php echo esc_textarea(isset($this->service['description']) ? $this->service['description'] : ''); ?></textarea>
    <?php }

    function service_price()
    { ?>
        <input type='text' name="price" value="<?php echo esc_attr(isset($this->service['price']) ? $this->service['price'] : ''); ?>" placeholder="Service Price">
    <?php }

    function service_features()
    { ?>
        <div class="features-list" id="features_list">
            <?php
            $features_list = isset($this->service['features_list']) ? unserialize($this->service['features_list']) : '';

            if (is_array($features_list)) {
                foreach ($features_list as $i => $feature) {
            ?>
                    <div class="feature" id="feature">
                        <input type="text" name="features_list[<?php echo $i; ?>][name]" value="<?php echo esc_attr(isset($feature['name']) ? $feature['name'] : ''); ?>" placeholder="Feature Name">
                        <input type='text' name="features_list[<?php echo $i; ?>][cost]" value="<?php echo esc_attr(isset($feature['cost']) ? $feature['cost'] : ''); ?>" placeholder="Faeture Cost" />
                    </div>
            <?php }
            } ?>
        </div>
        <button id="add_feature_button">Add Feature</button>
    <?php
    }

    function onboarding_link()
    { ?>
        <input type='url' name="onboarding_link" value="<?php echo esc_attr(isset($this->service['onboarding_link']) ? $this->service['onboarding_link'] : ''); ?>" placeholder="Onboarding Link" />
    <?php }

    function service_button()
    { ?>
        <input type='text' name="service_button" value="<?php echo esc_attr(isset($this->service['service_button']) ? $this->service['service_button'] : ''); ?>" placeholder="Service Button">
    <?php }

    function service_icon()
    { ?>
        <input type='text' name="service_icon" value="<?php echo esc_attr(isset($this->service['service_icon']) ? $this->service['service_icon'] : ''); ?>" placeholder="Service Icon">
<?php }

    function getServiceFeaturesList()
    {
        if (is_array($_REQUEST['features_list']) && count($_REQUEST['features_list']) > 0) {
            $features_list = $_REQUEST['features_list'];
            $featureslist = [];

            foreach ($features_list as $i => $feature) {
                if (isset($feature['name']) && isset($feature['cost'])) {
                    $featureObject = [
                        'name' => $feature['name'],
                        'cost' => $feature['cost'],
                    ];

                    $featureslist[] = $featureObject;
                }
            }

            return $featureslist;
        } else {
            return [];
        }
    }

    function save_service($post_id)
    {
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }

        $service_features = [];

        if (isset($_REQUEST['features_list'])) {
            $service_features = $this->getServiceFeaturesList();
        }

        $service = [
            'service_id' => $post_id,
            'name' => get_the_title($post_id),
            'price' => isset($_REQUEST['price']) ? sanitize_text_field($_REQUEST['price']) : '',
            'description' => isset($_REQUEST['description']) ? sanitize_text_field($_REQUEST['description']) : '',
            'features_list' => $service_features,
            'onboarding_link' => isset($_REQUEST['onboarding_link']) ? sanitize_text_field($_REQUEST['onboarding_link']) : '',
            'service_button' => isset($_REQUEST['service_button']) ? sanitize_text_field($_REQUEST['service_button']) : '',
            'service_icon' => isset($_REQUEST['service_icon']) ? sanitize_text_field($_REQUEST['service_icon']) : ''
        ];

        $existing_service = $this->services_database->getService($post_id);

        if (is_array($existing_service)) {
            return $this->services_database->updateService($post_id, $service);
        } else {
            return $this->services_database->saveService($service);
        }
    }
}
