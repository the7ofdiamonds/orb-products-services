<main class="hero">

  <div class="hero-card card">

    <h2><?php echo get_bloginfo('description'); ?></h2>

    <div class="hero-animation">

      <div class="hero-icons">
        <i class="fa-solid fa-lightbulb"></i>

        <i class="fa-solid fa-plus"></i>

        <i class="fa-solid fa-credit-card"></i>

        <i class="fa-solid fa-equals"></i>
      </div>

      <div>
        <div class="hero-animation-services">
          <span>
            <h3>WEBSITE</h3>
          </span>
          <span>
            <h3>WEB APP</h3>
          </span>
          <span>
            <h3>iOS APP</h3>
          </span>
          <span>
            <h3>ANDROID APP</h3>
          </span>
        </div>
      </div>
    </div>

    <h4><?php echo get_option('hero-pitch'); ?></h4>

    <button class="hero-btn" onclick="window.location.href='<?php echo esc_attr(get_option('hero-button-link')); ?>'">
      <i class="fas fa-power-off"></i>
      <h3>
        <?php echo esc_attr(get_option('hero-button-text')); ?>
      </h3>
    </button>
  </div>
</main>