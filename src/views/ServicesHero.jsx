import React from 'react';

import ServicesHeroAnimation from './ServicesHeroAnimation';

function ServicesHero(props) {
  const { description, heroButtonText, heroButtonLink, services } = props;

  const start = () => {
    window.location.href = heroButtonLink;
  };

  return (
    <main class="hero">
      <h2 className="title">{description}</h2>

      <div class="hero-card card">
        <ServicesHeroAnimation services={services} />
      </div>

      <button class="start-btn" onClick={start}>
        <i class="fas fa-power-off"></i>
        <h3 className="title">{heroButtonText}</h3>
      </button>
    </main>
  );
}

export default ServicesHero;
