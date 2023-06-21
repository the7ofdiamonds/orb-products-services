<section class="support">

    <h2>SUPPORT</h2>

    <?php
    $post_page = get_page_by_path('support');
    $post_id = $post_page->ID;
    $page = get_post($post_id);

    if ($page) {
        echo apply_filters('the_content', $page->post_content);
    }
    ?>

    <?php
    if (comments_open() || get_comments_number($post_id)) {
        comments_template();
    }
    ?>

</section>