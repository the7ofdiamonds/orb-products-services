<?php

namespace ORB_Products_Services\Post_Types\Services;

use Stripe\Exception\ApiErrorException;
use Stripe\Exception\InvalidRequestException;

class Services
{
    private $serviceID;
    private $servicesButton;
    private $serviceIcon;
    private $serviceDescription;
    private $serviceCost;
    private $newServiceCost;
    private $servicePriceID;

    private $stripeSecretKey;
    private $stripeClient;
    // Use stripe to enter prices and making updates
    public function __construct($stripeClient)
    {
        if (!session_id()) {
            session_start();
        }
        add_action('admin_init', [$this, 'add_services_meta_boxes']);
        add_action('save_post', [$this, 'save_post_services_button']);
        add_action('save_post', [$this, 'save_post_service_icon']);
        add_action('save_post', [$this, 'save_post_service_description']);
        add_action('save_post', [$this, 'save_post_service_cost']);
        add_action('save_post', [$this, 'save_post_service_features']);
        add_action('save_post', [$this, 'save_post_service_price_id']);

        add_action('save_post', [$this, 'add_service_to_stripe']);
        add_action('save_post', [$this, 'add_service_price_to_stripe']);
        // add_action('save_post', [$this, 'update_service_name_to_stripe']);
        // add_action('save_post', [$this, 'update_service_description_to_stripe']);

        $this->serviceID = get_the_ID();
        $this->servicePriceID = '';

        $this->stripeClient = $stripeClient;
    }

    function add_services_meta_boxes()
    {
        add_meta_box(
            "post_metadata_services_button",
            "Services Button",
            [$this, 'post_meta_box_services_button'],
            "services",
            "side",
            "low"
        );

        add_meta_box(
            "post_metadata_service_icon",
            "Service Icon",
            [$this, 'post_meta_box_service_icon'],
            "services",
            "side",
            "low"
        );

        add_meta_box(
            "post_metadata_service_description",
            "Service Description",
            [$this, 'post_meta_box_service_description'],
            "services",
            "side",
            "low"
        );

        add_meta_box(
            "post_metadata_service_cost",
            "Service Cost",
            [$this, 'post_meta_box_service_cost'],
            "services",
            "side",
            "low"
        );

        add_meta_box(
            "post_metadata_service_features",
            "Service Features",
            [$this, 'post_meta_box_service_features'],
            "services",
            "side",
            "low"
        );
    }

    function post_meta_box_services_button()
    {
        $this->servicesButton = get_post_meta(get_the_ID(), '_services_button', true); ?>
        <input type='text' name="_services_button" value="<?php print($this->servicesButton) ?>" placeholder="Service Button">
    <?php }

    function post_meta_box_service_icon()
    {
        $this->serviceIcon = get_post_meta(get_the_ID(), '_service_icon', true); ?>
        <input type='text' name="_service_icon" value="<?php print($this->serviceIcon) ?>" placeholder="Service Icon">
    <?php }

    function post_meta_box_service_description()
    {
        $this->serviceDescription = get_post_meta(get_the_ID(), '_service_description', true); ?>
        <input type='text' name="_service_description" value="<?php print($this->serviceDescription) ?>" placeholder="Service Description">
    <?php }

    function post_meta_box_service_cost()
    {
        $this->serviceCost = get_post_meta(get_the_ID(), '_service_cost', true); ?>
        <input type='text' name="_service_cost" value="<?php print($this->serviceCost) ?>" placeholder="Service Cost">
        <?php }

    function post_meta_box_service_features()
    {
        $serviceFeatures = get_post_meta(get_the_ID(), '_service_features', true);

        if (is_array($serviceFeatures) && !empty($serviceFeatures)) {
            foreach ($serviceFeatures as $index => $serviceFeature) {
                // Skip rendering if both feature name and cost are empty
                if (empty($serviceFeature['name']) && empty($serviceFeature['cost'])) {
                    continue;
                }
        ?>
                <div>
                    <input type="text" name="_feature_name[<?php echo $index; ?>]" value="<?php echo $serviceFeature['name']; ?>" placeholder="Feature Name">
                    <input type="text" name="_feature_cost[<?php echo $index; ?>]" value="<?php echo $serviceFeature['cost']; ?>" placeholder="Feature Cost">
                </div>
        <?php
            }
        }

        // Render an additional input field for a new feature
        ?>
        <div>
            <input type="text" name="_feature_name[]" value="" placeholder="Feature Name">
            <input type="text" name="_feature_cost[]" value="" placeholder="Feature Cost">
        </div>
<?php
    }

    function save_post_services_button()
    {
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }

        $servicesButton = isset($_POST["_services_button"]) ? sanitize_text_field($_POST["_services_button"]) : '';
        update_post_meta(get_the_ID(), "_services_button", $servicesButton);
    }

    function save_post_service_icon()
    {
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }

        $serviceIcon = isset($_POST["_service_icon"]) ? sanitize_text_field($_POST["_service_icon"]) : '';
        update_post_meta(get_the_ID(), "_service_icon", $serviceIcon);
    }

    function save_post_service_description()
    {
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }
        // Save to database & stripe
        $serviceDescription = isset($_POST["_service_description"]) ? sanitize_text_field($_POST["_service_description"]) : '';
        update_post_meta(get_the_ID(), "_service_description", $serviceDescription);
    }

    function save_post_service_cost()
    {
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }
        // Save to database & stripe
        $serviceCost = isset($_POST["_service_cost"]) ? sanitize_text_field($_POST["_service_cost"]) : '';
        update_post_meta(get_the_ID(), "_service_cost", $serviceCost);
    }

    function save_post_service_features()
    {
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }

        $featureNames = isset($_POST['_feature_name']) ? $_POST['_feature_name'] : [];
        $featureCosts = isset($_POST['_feature_cost']) ? $_POST['_feature_cost'] : [];

        $serviceFeatures = [];

        foreach ($featureNames as $index => $featureName) {
            $featureCost = isset($featureCosts[$index]) ? $featureCosts[$index] : '';

            $serviceFeatures[] = [
                'name' => sanitize_text_field($featureName),
                'cost' => sanitize_text_field($featureCost)
            ];
        }

        update_post_meta(get_the_ID(), '_service_features', $serviceFeatures);
    }

    function save_post_service_price_id()
    {
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }

        $serviceID = get_the_ID();
        $serviceCost = get_post_meta($serviceID, '_service_cost', true);

        if (!empty($serviceCost)) {

            try {
                $price = $this->stripeClient->prices->create([
                    'unit_amount' => str_replace('.', '', $serviceCost),
                    'currency' => 'usd',
                    'product' => $serviceID,
                ]);

                update_post_meta($serviceID, '_service_price_id', $price->id);
            } catch (ApiErrorException $e) {
                echo $e->getMessage();
            }
        }
    }

    function add_service_to_stripe()
    {
        if ($this->serviceID) {
            return;
        }

        $serviceName = get_the_title(get_the_ID());
        $serviceDescription = get_post_meta(get_the_ID(), '_service_description', true);
        $serviceCost = get_post_meta(get_the_ID(), '_service_cost', true);

        if ($serviceName !== '' && $serviceDescription !== '' && $serviceCost > 50) {
            try {
                $product = $this->stripeClient->products->create([
                    'id' => get_the_ID(),
                    'name' => $serviceName,
                    'description' => $serviceDescription,
                ]);

                $price = $this->stripeClient->prices->create([
                    'unit_amount' => str_replace('.', '', $serviceCost),
                    'currency' => 'usd',
                    'product' => $product->id,
                ]);

                return $price;
            } catch (ApiErrorException $e) {
                echo $e->getMessage();
            }
        }
    }

    function update_service_name_to_stripe()
    {
        $serviceName = get_the_title(get_the_ID());

        if ($serviceName !== '') {
            try {
                $product = $this->stripeClient->products->update(
                    get_the_ID(),
                    ['name' => $serviceName]
                );

                return $product;
            } catch (InvalidRequestException $e) {
                echo $e;
            }
        }
    }

    function update_service_description_to_stripe()
    {
        $serviceDescription = get_post_meta(get_the_ID(), '_service_description', true);

        if ($serviceDescription !== '') {

            $product = $this->stripeClient->products->update(
                get_the_ID(),
                ['description' => $serviceDescription]
            );

            return $product;
        }
    }

    function add_service_price_to_stripe()
    {
        if ($this->serviceCost !== null) {
            $price = $this->stripeClient->prices->create([
                'unit_amount' => str_replace('.', '', $this->serviceCost),
                'currency' => 'usd',
                'product' => $this->serviceID,
            ]);

            // Use the arrow operator to set the value of the id property
            $price->id = $this->servicePriceID;

            return $price->id; // Return the updated id value
        }
    }
}
