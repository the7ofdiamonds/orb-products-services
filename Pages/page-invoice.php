<?php
if (!is_user_logged_in()) {
    $fullUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

    wp_redirect('/login' . '?redirectTo=' . $fullUrl);
    exit;
}

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

get_header();

include ORB_PRODUCTS_SERVICES . 'includes/section-invoice.php';

get_footer();
