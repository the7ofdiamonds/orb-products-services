<?php get_header(); ?>

<?php include ORB_SERVICES . '/includes/section-support.php'; ?>

<?php get_footer(); ?>

<?php
 // Get the current request URL
 $request_path = $_SERVER['REQUEST_URI'];

// Split the request path into segments
print_r($path_segments = explode('/', $request_path));

// Check if the first segment is "services" and the second segment is "quote"
if ($path_segments[1] === 'support') {
    $page_template = ORB_SERVICES . '/pages/templates/page-quote.php';
}
?>