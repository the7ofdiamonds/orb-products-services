<?php 
session_start();

foreach ($_SESSION as $key => $value) {
    echo $key . ' => ' . $value . '<br>';
}
get_header(); 
?>

<?php include ORB_SERVICES . 'includes/section-services.php'; ?>

<?php get_footer(); ?>