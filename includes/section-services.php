<section id='services' class='services'>
    
    <h2 class="title">SERVICES</h2>

    <div class="services-list">
        <?php

        $args = array('post_type' => array('services'), 'orderby' => 'menu_order', 'order' => 'ASC');

        $services = get_posts($args);

        if ($services) :

            foreach ($services as $service) : ?>

                <div class="services-card card">

                    <h3 class="services-name">
                        <?php echo get_the_title($service->ID); ?>
                    </h3>

                    <div class="services-icon">
                        <i class="<?php echo get_post_meta($service->ID, '_services_button_icon', true); ?>"></i>
                    </div>

                    <div class="services-description">
                        <h4>
                            <?php echo $service->post_excerpt; ?>
                        </h4>
                    </div>

                    <div class="services-features">
                        <ul>
                            <?php
                            $features = get_post_meta($service->ID, '_service_features', false);
                            $index = 0;
                            
                            if (!empty($features)) {
                                foreach ($features[0] as $index => $feature) {
                            ?>
                                    <li><?php echo $feature['name']; ?></li>
                            <?php
                                    $index++;
                                }
                            }
                            ?>
                        </ul>
                    </div>

                    <div class="services-action">
                        <button onclick="location.href='<?php echo get_post_permalink($service->ID); ?>'" class="services-btn">
                            <i class="<?php echo get_post_meta($service->ID, '_services_button_icon', true); ?>"></i>
                            <h3>
                                <?php echo get_post_meta($service->ID, '_services_button', true); ?>
                            </h3>
                        </button>
                    </div>
                </div>
        <?php endforeach;
        endif; ?>
    </div>
</section>