import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchServices } from '../controllers/servicesSlice.js';

import LoadingComponent from '../loading/LoadingComponent.jsx';
import ErrorComponent from '../error/ErrorComponent.jsx';

import ServicesHero from './ServicesHero';
import Services from './Services';
import ProductsHero from './ProductsHero';
import Products from './Products';

function Frontpage() {
  const description = 'Business in your hand';
  const heroButtonText = 'start';
  const heroButtonLink = '/start';

  const dispatch = useDispatch();

  const { servicesLoading, servicesError, services } = useSelector(
    (state) => state.services
  );

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  // if (servicesLoading) {
  //   return <LoadingComponent />;
  // }

  // if (servicesError) {
  //   return <ErrorComponent error={servicesError} />;
  // }

  return (
    <>
      <ServicesHero
        description={description}
        heroButtonText={heroButtonText}
        heroButtonLink={heroButtonLink}
        services={services}
      />
      <Services services={services} />
      <ProductsHero />
      <Products />
    </>
  );
}

export default Frontpage;
