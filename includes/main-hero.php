<main class="hero">

  <h2><?php echo get_bloginfo('description'); ?></h2>

  <div class="mission-statement-card card">
    <h4 class='mission-statement'><q>
        <?php echo get_option('hero-pitch'); ?>
      </q></h4>
  </div>
  
  <div class="hero-card card">

    <?php include_once ORB_PRODUCTS_SERVICES . '/includes/main-hero-animation.php'; ?>

  </div>

  <button class="start-btn" onclick="window.location.href='<?php echo esc_attr(get_option('hero-button-link')); ?>'">
    <i class="fas fa-power-off"></i>
    <h3>
      <?php echo esc_attr(get_option('hero-button-text')); ?>
    </h3>
  </button>
</main>