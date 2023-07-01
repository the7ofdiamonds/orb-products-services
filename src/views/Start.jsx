import React from 'react';
import { useNavigate } from 'react-router-dom';

import ClientComponent from './Client';

function Start() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/services/quote');
  };

  return (
    <>
      <ClientComponent />

      <button id="quote_button" onClick={handleClick}>
        <h3>QUOTE</h3>
      </button>
    </>
  );
}

export default Start;
