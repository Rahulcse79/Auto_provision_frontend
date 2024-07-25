import React from 'react';

const Notification = ({ message, type, onClose }) => {
  return (
    <div className={`notification ${type}`}>
      <button className="close-button" onClick={onClose}>×</button>
      <div>{message}</div>
    </div>
  );
};

export default Notification;
