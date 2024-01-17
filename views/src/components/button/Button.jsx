
import React from 'react';
import './button.css';

export default function Button({ classs, text, onClick }) {
  const combined = `button ${classs}`;

  return (
    <div className={combined} onClick={onClick}>
      {text}
    </div>
  );
}
