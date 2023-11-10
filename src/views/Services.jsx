import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchServices } from '../controllers/servicesSlice.js';

import LoadingComponent from '../loading/LoadingComponent.jsx';
import ErrorComponent from '../error/ErrorComponent.jsx';

function Services(props) {
  const { servicesLoading, servicesError, services } = useSelector(
    (state) => state.services
  );
  console.log(services);
  const servicesToRender = props.services || services;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  if (servicesLoading) {
    return <LoadingComponent />;
  }

  if (servicesError) {
    return <ErrorComponent error={servicesError} />;
  }

  const handleServiceClick = (serviceId) => {
    window.location.href = `/services/${serviceId}`;
  };

  return (
    <>
      <section className="services">
        <h2 className="title">SERVICES</h2>

        <div className="services-list">
          {(props.services && props.services) ||
          (services && services.length) ? (
            <React.Fragment>
              {servicesToRender.map((service) => (
                <>
                  <div className="service">
                    <div className="services-card card" key={service.price_id}>
                      <div className="services-title">
                        <div className="services-icon">
                          <i className={service.icon}></i>
                        </div>
                        <h3 className="services-name title">{service.title}</h3>
                      </div>

                      <div className="services-features">
                        {Array.isArray(service.features) && (
                          <ul>
                            {service.features.map((feature) => (
                              <li key={feature.id}>{feature.name}</li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div className="services-pricing">
                        <h4>
                          Starting at{' '}
                          {new Intl.NumberFormat('us', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          }).format(service.price)}
                        </h4>
                      </div>
                    </div>

                    <div className="services-action">
                      <button
                        onClick={() => handleServiceClick(service.slug)}
                        className="services-btn">
                        <i className={service.icon}></i>
                        <h3>{service.action_word}</h3>
                      </button>
                    </div>
                  </div>
                </>
              ))}
            </React.Fragment>
          ) : (
            <h3>No services found.</h3>
          )}
        </div>
      </section>
    </>
  );
}

export default Services;
