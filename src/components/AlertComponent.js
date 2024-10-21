import React from 'react';

const AlertComponent = ({ type, message }) => {
  if (!message) return null; // Ne rien rendre si aucun message

  const alertType = type === 'success' ? 'alert-success' : 'alert-danger';
  const icon = type === 'success' ? '✓' : '✖';

  return (
    <div className={`alert ${alertType}`} role="alert">
      <span className="alert-icon">{icon}</span> {message}
    </div>
  );
};

export default AlertComponent;
