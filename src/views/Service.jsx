import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchService } from '../controllers/serviceSlice.js';

import LoadingComponent from '../loading/LoadingComponent.jsx';
import ErrorComponent from '../error/ErrorComponent.jsx';

function Service() {
  const location = useLocation();
  const servicePath = location.pathname.split('/')[2];

  const { serviceLoading, serviceError } = useSelector(
    (state) => state.service
  );
  const { title, description, features, action_word, content, cost, icon } =
    useSelector((state) => state.service.service);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchService(servicePath));
  }, [dispatch, servicePath]);

  if (serviceLoading) {
    return <LoadingComponent />;
  }

  if (serviceError) {
    return <ErrorComponent error={serviceError} />;
  }

  const handleClick = () => {
    window.location.href = '/client/start';
  };

  return (
    <>
      <section className="service">
        <h2>{title}</h2>

        <div className="service-icon">
          <i className={icon}></i>
        </div>

        <div className="service-features-card card">
          <h3>Includes</h3>

          <div className="service-features">
            {features && features.length ? (
              <React.Fragment>
                {features.map((feature) => (
                  <>
                    <p className="feature-name" id="feature_name">
                      {feature.name}
                    </p>
                  </>
                ))}
              </React.Fragment>
            ) : (
              <h4>No features to show yet</h4>
            )}
          </div>
        </div>

        <div className="details-card card">
          <h4>{description}</h4>
          <div className="details">
            <p>{content}</p>
          </div>
        </div>

        <div className="pricing">
          <h4>
            Starting at{' '}
            {new Intl.NumberFormat('us', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(cost)}
          </h4>
        </div>

        <button className="start-btn" onClick={handleClick}>
          <i class="fas fa-power-off"></i>
          <h3>{action_word}</h3>
        </button>
      </section>
    </>
  );
}

export default Service;
