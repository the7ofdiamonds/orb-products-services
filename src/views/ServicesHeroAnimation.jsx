import React, { useEffect } from 'react';

function ServicesHeroAnimation(props) {
  const { services } = props;
  
  const servicesList = document.querySelector('.hero-animation-services');

  useEffect(() => {
    if (servicesList) {
      const totalServices = servicesList.children.length;

      for (let i = 0; i < totalServices; i++) {
        servicesList.appendChild(servicesList.children[i].cloneNode(true));
      }

      document.documentElement.style.setProperty(
        '--total-services',
        totalServices
      );
    }
  }, [servicesList]);

  return (
    <>
      {services && services.length > 0 ? (
        <div class="hero-animation">
          <div class="hero-icons">
            <i class="fa-regular fa-lightbulb"></i>

            <i class="fa-solid fa-plus"></i>

            <i class="fa-solid fa-credit-card"></i>

            <i class="fa-solid fa-equals"></i>
          </div>

          <div class="hero-animation-services" id="hero-animation-services">
            {services.map((service, index) => (
              <>
                <div
                  class="hero-animation-service"
                  id="hero-animation-service"
                  key={index}>
                  <h3>{service.title}</h3>
                </div>
              </>
            ))}
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default ServicesHeroAnimation;
