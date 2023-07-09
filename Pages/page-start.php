<?php
include_once ABSPATH . 'wp-includes/pluggable.php';
if (!is_user_logged_in()) {
    header('Location: /login');
    exit;
}
get_header();
?>

<?php include ORB_SERVICES . '/includes/section-start.php'; ?>

<?php get_footer(); ?>