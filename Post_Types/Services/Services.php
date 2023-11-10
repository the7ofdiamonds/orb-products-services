<?php

namespace ORB\Products_Services\Post_Types\Services;

use ORB\Products_Services\Database\DatabaseServices;
use ORB\Products_Services\Post_Types\Services\ServicesStripe;

use Exception;

class Services
{
    private $inputs;
    private $post_type;
    private $services_database;
    private $services_stripe;
    private $service_database;
    private $service_stripe;
    private $service_prices;

    public function __construct($stripeClient)
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
                "name" => "Service Currency",
                "alias" => "service_currency",
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
            ],
            [
                "name" => "Stripe Price ID",
                "alias" => "price_id",
                "position" => "side",
                "priority" => "low"
            ],
        ];
        $this->post_type = 'services';

        add_action('wp_enqueue_scripts', [$this, 'enqueue_jquery']);
        add_action('admin_enqueue_scripts', [$this, 'add_custom_js']);

        add_action('load-post.php', [$this, 'get_service']);
        add_action('load-post-new.php', [$this, 'get_service']);

        $this->services_database = new DatabaseServices;
        $this->services_stripe = new ServicesStripe($stripeClient);

        add_action('save_post', [$this, 'save_service']);
        add_action('save_post', [$this, 'update_service']);
        add_action('save_post', [$this, 'get_service']);
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
        if (!empty($_GET['post'])) {
            $post_id = absint($_GET['post']);

            if ($post_id) {
                $this->service_database = $this->services_database->getService($post_id);
                $this->service_stripe = $this->services_stripe->get_service_from_stripe($post_id);
                $this->service_prices = $this->services_stripe->get_service_prices_from_stripe($post_id);
            }
        }
    }

    function service_description()
    { ?>
        <textarea name="description"><?php echo esc_textarea(!empty($this->service_database['description']) ? $this->service_database['description'] : ''); ?></textarea>
    <?php }

    function service_price()
    { ?>
        <input type='text' name="price" value="<?php echo esc_attr(!empty($this->service_database['price']) ? $this->service_database['price'] : ''); ?>" placeholder="Service Price">
    <?php }

    function service_currency()
    { ?>
        <input type='text' name="currency" value="<?php echo esc_attr(!empty($this->service_database['currency']) ? $this->service_database['currency'] : ''); ?>" placeholder="Service Currency">
    <?php }

    function service_features()
    { ?>
        <div class="features-list" id="features_list">
            <?php
            $features_list = !empty($this->service_database['features_list']) ? unserialize($this->service_database['features_list']) : '';

            if (is_array($features_list)) {
                foreach ($features_list as $i => $feature) {
            ?>
                    <div class="feature" id="feature">
                        <input type="text" name="features_list[<?php echo $i; ?>][name]" value="<?php echo esc_attr(!empty($feature['name']) ? $feature['name'] : ''); ?>" placeholder="Feature Name">
                        <input type='text' name="features_list[<?php echo $i; ?>][cost]" value="<?php echo esc_attr(!empty($feature['cost']) ? $feature['cost'] : ''); ?>" placeholder="Faeture Cost" />
                    </div>
            <?php }
            } ?>
        </div>
        <button id="add_feature_button">Add Feature</button>
    <?php
    }

    function onboarding_link()
    { ?>
        <input type='url' name="onboarding_link" value="<?php echo esc_attr(!empty($this->service_database['onboarding_link']) ? $this->service_database['onboarding_link'] : ''); ?>" placeholder="Onboarding Link" />
    <?php }

    function service_button()
    { ?>
        <input type='text' name="service_button" value="<?php echo esc_attr(!empty($this->service_database['service_button']) ? $this->service_database['service_button'] : ''); ?>" placeholder="Service Button">
    <?php }

    function service_icon()
    { ?>
        <input type='text' name="service_icon" value="<?php echo esc_attr(!empty($this->service_database['service_icon']) ? $this->service_database['service_icon'] : ''); ?>" placeholder="Service Icon">
    <?php }

    function price_id()
    { ?>
        <div>
            <h2><?php echo esc_attr(!empty($this->service_prices[0]->id) ? $this->service_prices[0]->id : ''); ?></h2>
        </div>
<?php }

    function getServiceFeaturesList()
    {
        if (!empty($_POST['features_list']) && is_array($_POST['features_list']) && count($_POST['features_list']) > 0) {
            $features_list = $_POST['features_list'];
            $featureslist = [];

            foreach ($features_list as $i => $feature) {
                if (!empty($feature['name']) && !empty($feature['cost'])) {
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

    function update_service($post_id)
    {
        try {
            if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
                return;
            }

            $existing_service = $this->services_database->getService($post_id);

            if (!empty($_POST) && is_array($existing_service)) {
                $service_name = get_the_title($post_id);
                $service_description = !empty($_POST['description']) ? sanitize_textarea_field($_POST['description']) : '';
                $service_price = !empty($_POST['price']) ? sanitize_text_field($_POST['price']) : '';
                $service_currency = !empty($_POST['currency']) ? sanitize_text_field($_POST['currency']) : '';
                $stripe_price_id = !empty($this->service_prices[0]->id) ? sanitize_text_field($this->service_prices[0]->id) : '';
                $service_features = $this->getServiceFeaturesList();

                $service_features = [];

                $service = [
                    'service_id' => $post_id,
                    'name' => $service_name,
                    'price' => $service_price,
                    'currency' => $service_currency,
                    'description' =>  $service_description,
                    'features_list' => $service_features,
                    'onboarding_link' => !empty($_POST['onboarding_link']) ? sanitize_text_field($_POST['onboarding_link']) : '',
                    'service_button' => !empty($_POST['service_button']) ? sanitize_text_field($_POST['service_button']) : '',
                    'service_icon' => !empty($_POST['service_icon']) ? sanitize_text_field($_POST['service_icon']) : '',
                    'stripe_price_id' => $stripe_price_id
                ];

                if (!empty($stripe_price_id)) {
                    error_log('sripe price id set ' . $stripe_price_id);
                    $this->services_database->updateService($post_id, $service);

                    if (!empty($this->service_stripe->description) && !empty($service_description) && $this->service_stripe->description !== $service_description) {
                        $this->services_stripe->update_service_at_stripe($post_id, $service_description);
                        error_log('description change ' . $this->service_stripe->description . ' does not equal ' . $service_description);
                    }

                    if (!empty($this->service_prices[0]->unit_amount) && !empty($service_price) && intval($this->service_prices[0]->unit_amount) === intval($service_price)) {
                        if ($this->service_prices[0]->currency !== $service_currency) {
                            $this->services_stripe->update_service_price_at_stripe($stripe_price_id, $service_price, $service_currency);
                        }
                    } else {
                        error_log('price change ' . $this->service_prices[0]->unit_amount . ' does not equal ' . $service_price);
                        $this->services_stripe->add_service_price_to_stripe($post_id, $service_price, $service_currency);
                    }
                } else {
                    error_log('sripe price id not set');
                    $this->services_stripe->add_service_to_stripe($post_id, $service_name, $service_description);
                    $this->services_stripe->add_service_price_to_stripe($post_id, $service_price, $service_currency);
                    $this->services_database->updateService($post_id, $service);
                }
            }
        } catch (Exception $e) {
            $errorMessage = $e->getMessage();
            $errorCode = $e->getCode();
            $response = $errorMessage . ' ' . $errorCode;

            error_log($response . ' at update_service');
            return $response;
        }
    }

    function save_service($post_id)
    {
        try {
            $existing_service = $this->services_database->getService($post_id);

            if (!empty($_POST) && !is_array($existing_service)) {
                if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
                    return;
                }

                $service_name = get_the_title($post_id);
                $service_description = !empty($_POST['description']) ? sanitize_text_field($_POST['description']) : '';
                $service_price = !empty($_POST['price']) ? sanitize_text_field($_POST['price']) : '';
                $service_currency = !empty($_POST['currency']) ? sanitize_text_field($_POST['currency']) : '';

                $service_features = [];

                if (!empty($_POST['features_list'])) {
                    $service_features = $this->getServiceFeaturesList();
                }

                $product = $this->services_stripe->add_service_to_stripe($post_id, $service_name, $service_description);
                $price = $this->services_stripe->add_service_price_to_stripe($product->id, $service_price, $service_currency);

                $service = [
                    'service_id' => $post_id,
                    'name' => $service_name,
                    'price' => $service_price,
                    'currency' => $service_currency,
                    'description' =>  $service_description,
                    'features_list' => $service_features,
                    'onboarding_link' => !empty($_POST['onboarding_link']) ? sanitize_text_field($_POST['onboarding_link']) : '',
                    'service_button' => !empty($_POST['service_button']) ? sanitize_text_field($_POST['service_button']) : '',
                    'service_icon' => !empty($_POST['service_icon']) ? sanitize_text_field($_POST['service_icon']) : '',
                    'stripe_price_id' => !empty($price->id) ? sanitize_text_field($price->id) : ''
                ];

                $this->services_database->saveService($service);
            }
        } catch (Exception $e) {
            $errorMessage = $e->getMessage();
            $errorCode = $e->getCode();
            $response = $errorMessage . ' ' . $errorCode;

            error_log($response . ' at save_service');
            return $response;
        }
    }
}
