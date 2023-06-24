<?php
$path = $_SERVER['REQUEST_URI'];
echo $path;
$segments = explode('/', $path);
$slug = $segments[2];
$service = get_page_by_path($slug, OBJECT, 'services');
$id = $service->ID;
$post = get_post($id);
?>

<section id="service" class="service">
    <?php if ($service) : ?>
        <h2 class="service-name">
            <?php echo get_the_title($service->ID); ?>
        </h2>
        <div class="service-description card">
            <p><?php echo $post->post_content; ?></p>
        </div>
    <?php endif; ?>
    <div class="orb-service" id="orb_service"></div>
</section>