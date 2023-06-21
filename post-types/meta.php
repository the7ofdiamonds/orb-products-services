<?php

class ORB_Services_Meta
{
    public function __construct()
    {
        add_action('admin_init', [$this, 'add_services_meta_boxes']);
        add_action('save_post', [$this, 'save_post_services_button']);
        add_action('save_post', [$this, 'save_post_services_button_icon']);
        add_action('save_post', [$this, 'save_post_service_features']);
        add_action('save_post', [$this, 'save_post_service_cost']);
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
            "post_metadata_services_button_icon",
            "Services Button Icon",
            [$this, 'post_meta_box_services_button_icon'],
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
            "post_metadata_features",
            "Service Features & Cost",
            [$this, 'post_meta_box_service_features'],
            "services",
            "side",
            "low"
        );
    }

    function post_meta_box_services_button()
    {
        global $post;
        $projectButton = get_post_meta($post->ID, '_services_button', true);

        echo "<input type='text' name=\"_services_button\" value=\"" . $projectButton . "\" placeholder=\"Services Button\">";
    }

    function post_meta_box_services_button_icon()
    {
        global $post;
        $projectButtonIcon = get_post_meta($post->ID, '_services_button_icon', true);

        echo "<input type='text' name=\"_services_button_icon\" value=\"" . $projectButtonIcon . "\" placeholder=\"Services Button Icon\">";
    }

    function post_meta_box_service_cost()
    {
        global $post;
        $serviceCost = get_post_meta($post->ID, '_service_cost', true);

        echo "<input type='text' name=\"_service_cost\" value=\"" . $serviceCost . "\" placeholder=\"Services Cost\">";
    }

    function post_meta_box_service_features()
    {
        global $post;

        // Get existing meta values
        $serviceFeatures = get_post_meta($post->ID, '_service_features', true);

        // Loop through existing values and display input fields
        if (is_array($serviceFeatures) && !empty($serviceFeatures)) {
            foreach ($serviceFeatures as $index => $serviceFeature) {
?>
                <div>
                    <input type='text' name='_feature_name' value='<?php echo $serviceFeature['name']; ?>' placeholder='Service Feature'>
                    <input type='text' name='_feature_cost' value='<?php echo $serviceFeature['cost']; ?>' placeholder='Service Cost'>
                </div>
        <?php
            }
        }

        // Display additional input fields for new service feature
        ?>
        <div>
            <input type='text' name='_feature_name' value='' placeholder='Service Feature'>
            <input type='text' name='_feature_cost' value='' placeholder='Service Cost'>
        </div>
<?php
    }

    function save_post_services_button()
    {
        global $post;
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }

        update_post_meta($post->ID, "_services_button", sanitize_text_field($_POST["_services_button"]));
    }

    function save_post_services_button_icon()
    {
        global $post;
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }

        update_post_meta($post->ID, "_services_button_icon", sanitize_text_field($_POST["_services_button_icon"]));
    }

    function save_post_service_cost()
    {
        global $post;
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }

        update_post_meta($post->ID, "_service_cost", sanitize_text_field($_POST["_service_cost"]));
    }

    function save_post_service_features()
    {
        global $post;

        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }

        $featureName = $_POST["_feature_name"];
        $featureCost = $_POST["_feature_cost"];

        if (!empty($featureName) && !empty($featureCost)) {

            $serviceFeature = array(
                'name' => $featureName,
                'cost' => $featureCost
            );

            $serviceFeatures = get_post_meta($post->ID, "_service_features", true);

            if (!is_array($serviceFeatures)) {
                $serviceFeatures = array();
            }

            array_push($serviceFeatures, $serviceFeature);

            update_post_meta($post->ID, "_service_features", $serviceFeatures);
        }
    }
}
