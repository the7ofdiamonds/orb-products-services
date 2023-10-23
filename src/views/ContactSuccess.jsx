import React from 'react';

function ContactSuccessComponent() {
  const urlParams = new URLSearchParams(window.location.search);
  const firstName = urlParams.get('first_name');
  const email = urlParams.get('email');

  return (
    <main className="contact-success">
      <div className="status-bar card success">
        <span>
          <h4>
            Thank You, {firstName}. Your message has been sent, and a reply will
            be sent to {email}.
          </h4>
        </span>
      </div>
    </main>
  );
}

export default ContactSuccessComponent;
