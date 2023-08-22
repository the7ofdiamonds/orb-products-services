<?php
require_once ORB_SERVICES . 'Admin/Admin.php';

use ORB_Services\Admin\Admin;

$admin = new Admin();

if (!empty($_POST['google_service_account']) && isset($_POST['google_service_account'])) {
    $googleServiceAccountData = $_POST['google_service_account'];
    $unescapedJson = stripslashes($googleServiceAccountData);

    $googleServiceAccount = json_decode($unescapedJson, true);

    if (json_last_error() === JSON_ERROR_NONE) {
        echo "The submitted data is valid JSON.";

        $encodedGoogleServiceAccount = json_encode($googleServiceAccount, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);

        $admin->save_google_service_account($encodedGoogleServiceAccount);
    } else {
        echo "The submitted data is not valid JSON.";
    }
}

if (!empty($_POST['stripe_secret_key']) && isset($_POST['stripe_secret_key'])) {
    $admin->save_stripe_secret_key($_POST['stripe_secret_key']);
}
?>
<section class="orb-services-admin">
    <h1>ORB SERVICES DASHBOARD</h1>

    <?php settings_errors(); ?>
    <form method="post" action="/wp-admin/admin.php?page=orb_services">
        <?php settings_fields('orb-admin-group'); ?>
        <?php do_settings_sections('orb_services'); ?>
        <?php submit_button(); ?>
    </form>
</section>