<?php
global $post;

$post_title = $post->post_title;
$post_id = $post->ID;
$page_content = $post->post_content;
?>
<section class="faq">

    <h2 class="title"><?php echo $post_title; ?></h2>

    <?php
    if ($page_content) {
        echo apply_filters('the_content', $page->post_content);
    }
    ?>

    <?php
    if (comments_open() || get_comments_number($post_id)) {
        comments_template();
    }
    ?>

</section>