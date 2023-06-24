<div class="hero-animation">

    <div class="hero-icons">
        <i class="fa-solid fa-lightbulb"></i>

        <i class="fa-solid fa-plus"></i>

        <i class="fa-solid fa-credit-card"></i>

        <i class="fa-solid fa-equals"></i>
    </div>

    <div>
        <div class="hero-animation-services" id="hero-animation-services">
            <?php $args = array('post_type' => array('services'), 'orderby' => 'menu_order', 'order' => 'ASC');

            $services = get_posts($args);

            if ($services) :

                foreach ($services as $service) : ?>
                    <span class="hero-animation-service" id="hero-animation-service">
                        <h3><?php echo get_the_title($service->ID); ?></h3>
                    </span>
            <?php endforeach;
            endif; ?>
        </div>
    </div>
</div>