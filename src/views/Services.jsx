import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServices } from '../controllers/servicesSlice.js';

function ServicesComponent() {
  const { loading, error, services } = useSelector((state) => state.services);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  if (error) {
    return (
      <main className="error">
        <div className="status-bar card">
          <span className="error">
            "We encountered an issue while loading this page. Please try again,
            and if the problem persists, kindly contact the website
            administrators for assistance."
          </span>
        </div>
      </main>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleServiceClick = (serviceId) => {
    navigate(`/services/${serviceId}`);
  };

  return (
    <>
      <h2 className="title">SERVICES</h2>
      <div className="services-list">
        {services && services.length ? (
          <React.Fragment>
            {services.map((service) => (
              <div className="services-card card" key={service.price_id}>
                <div className="services-title">
                  <div className="services-icon">
                    <i className={service.icon}></i>
                  </div>
                  <h3 className="services-name">{service.title}</h3>
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
                    }).format(service.cost)}
                  </h4>
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
            ))}
          </React.Fragment>
        ) : (
          <h3>No services found.</h3>
        )}
      </div>
    </>
  );
}

export default ServicesComponent;
