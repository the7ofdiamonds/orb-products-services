import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchService } from '../controllers/serviceSlice.js';

function ServiceComponent() {
  const location = useLocation();
  const servicePath = location.pathname.split('/')[2];

  const { loading, error } = useSelector((state) => state.service);
  const { title, description, features, action_word, content, cost, icon } =
    useSelector((state) => state.service.service);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchService(servicePath));
  }, [dispatch, servicePath]);

  const handleClick = () => {
    navigate('/services/start');
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
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
        <h4>
          {description}
        </h4>
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
        <h3>START</h3>
      </button>
    </>
  );
}
export default ServiceComponent;
