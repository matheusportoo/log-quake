import React from 'react';

const Button = ({ type, text, onClick }) => (
  <button className="button" type={type} onClick={onClick}>{text}</button>
);

export default Button;
