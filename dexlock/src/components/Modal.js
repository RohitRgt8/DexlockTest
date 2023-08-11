import React from 'react';
import './assets/styles.css';
import { useState, useEffect } from 'react';

const Modal = ({ starship, onClose }) => {
    const [showTitle, setShowTitle] = useState(false);
  
    useEffect(() => {
      const animationTimeout = setTimeout(() => {
        setShowTitle(true);
      }, 2000); // Duration of the typing animation in milliseconds
  
      return () => clearTimeout(animationTimeout);
    }, []);
  
    return (
      <div className="modal-overlay">
        <div className="modal">
          {showTitle ? (
            <h2>{starship.name}</h2>
          ) : (
            <h2 className="typing-animation">{starship.name}</h2>
          )}
          <p><b>Model: </b>{starship.model}</p>
          <p><b>Manufacturer</b>: {starship.manufacturer}</p>
          <p><b>Passengers</b>: {starship.passengers}</p>
          <button onClick={onClose}>Return to Starship List</button>
        </div>
      </div>
    );
  };
  

export default Modal;
