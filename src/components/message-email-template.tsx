import * as React from 'react';

interface EmailTemplateProps {
  name: String,
  email: String,
  phone: String,
  message: String
}

const MessageEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name, email, phone, message
}) => {
  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px'
  };

  const headingStyle = {
    color: '#333',
    borderBottom: '2px solid #ccc',
    paddingBottom: '10px'
  };

  const paragraphStyle = {
    fontSize: '16px',
    lineHeight: '1.5',
    marginBottom: '10px'
  };
  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Name: {name}</h2>
      <h2 style={headingStyle}>Email From: {email}</h2>
      <p style={paragraphStyle}>Phone Number: {phone}</p>
      <p style={paragraphStyle}>{message}</p>
    </div>
  );
}

export default MessageEmailTemplate;