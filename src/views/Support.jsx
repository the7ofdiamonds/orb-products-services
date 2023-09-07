import React, { useState } from 'react';

function SupportComponent() {
  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    subject: '',
    message: '',
  });

  const { first_name, last_name, email, subject, msg } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/wp-json/orb/v1/email/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: first_name,
          last_name: last_name,
          email: email,
          subject: subject,
          message: msg,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message;

        setMessage(errorMessage);
        setMessageType('error');
        throw new Error(errorMessage);
      }

      const responseData = await response.json();

      setMessage(responseData.message);
      setMessageType('success');

      setTimeout(() => {
        window.location.href = `/support/success?first_name=${encodeURIComponent(
          first_name
        )}&email=${encodeURIComponent(email)}`;
      }, 3000);

      return responseData;
    } catch (error) {
      setMessage(error.message);
      setMessageType('error');

      throw error.message;
    }
  };

  return (
    <>
      <div className="support-card card">
        <form>
          <table>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    name="first_name"
                    className="input"
                    id="first_name"
                    placeholder="First Name"
                    onChange={handleInputChange}
                    value={first_name}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="last_name"
                    className="input"
                    id="last_name"
                    placeholder="Last Name"
                    onChange={handleInputChange}
                    value={last_name}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <input
                    name="email"
                    type="email"
                    id="support_email"
                    className="input"
                    placeholder="Email"
                    onChange={handleInputChange}
                    value={email}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <input
                    name="subject"
                    type="text"
                    id="support_subject"
                    className="input"
                    placeholder="Subject"
                    onChange={handleInputChange}
                    value={subject}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <textarea
                    name="msg"
                    type="text"
                    id="support_message"
                    placeholder="Message"
                    onChange={handleInputChange}
                    value={msg}></textarea>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <input
                    type="hidden"
                    name="action"
                    value="thfw_email_support"
                  />
                  <button
                    className="sendmsg"
                    id="support_submit"
                    name="submit"
                    type="button"
                    value="submit"
                    onClick={handleSubmit}>
                    <h3>SEND</h3>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>

      {message && (
        <div className={`status-bar card ${messageType}`}>
          <span>{message}</span>
        </div>
      )}
    </>
  );
}

export default SupportComponent;
