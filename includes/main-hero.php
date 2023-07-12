<main class="hero">

  <h2><?php echo get_bloginfo('description'); ?></h2>

  <div class="hero-card card">

    <h4><?php echo get_option('hero-pitch'); ?></h4>

    <?php include_once ORB_SERVICES . '/includes/main-hero-animation.php'; ?>

    <button class="start-btn" onclick="window.location.href='<?php echo esc_attr(get_option('hero-button-link')); ?>'">
      <i class="fas fa-power-off"></i>
      <h3>
        <?php echo esc_attr(get_option('hero-button-text')); ?>
      </h3>
    </button>
  </div>
</main>