import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ type, text, onClick, title, customClasses }) => (
  <button
    className={['o-button', `${ customClasses }`].join(' ')}
    type={type}
    onClick={onClick}
    title={title}
  >
    <span>{text}</span>
  </button>
);

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
  customClasses: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;
