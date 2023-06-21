import { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();
  const buttonRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current && location.pathname === buttonRef.current.getAttribute('data-target')) {
      buttonRef.current.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  }, [location]);

  return (
    <>
      <div className="orb-service-navigation">
        <nav>
          <div className="step">
            <NavLink to="/" ref={buttonRef} data-target="/">
              <button ref={buttonRef}>
                <span>
                  <h3>1</h3>
                </span>
                <h4>QUOTE</h4>
              </button>
            </NavLink>
          </div>

          <div className="step">
            <NavLink to="/schedule" ref={buttonRef} data-target="/schedule">
              <button ref={buttonRef}>
                <span>
                  <h3>2</h3>
                </span>
                <h4>SCHEDULE</h4>
              </button>
            </NavLink>
          </div>

          <div className="step">
            <NavLink to="/invoice" ref={buttonRef} data-target="/invoice">
              <button ref={buttonRef}>
                <span>
                  <h3>3</h3>
                </span>
                <h4>INVOICE</h4>
              </button>
            </NavLink>
          </div>

          <div className="step">
            <NavLink to="/payment" ref={buttonRef} data-target="/payment">
              <button ref={buttonRef}>
                <span>
                  <h3>4</h3>
                </span>
                <h4>PAYMENT</h4>
              </button>
            </NavLink>
          </div>

          <div className="step">
            <NavLink to="/receipt" ref={buttonRef} data-target="/receipt">
              <button ref={buttonRef}>
                <span>
                  <h3>5</h3>
                </span>
                <h4>RECEIPT</h4>
              </button>
            </NavLink>
          </div>
        </nav>
      </div>
    </>
  );
}
