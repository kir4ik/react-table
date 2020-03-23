import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const ToastContent = ({
  type,
  text,
}) => (
  <div className={`toast-content toast-content_${type}`}>
    <div className="toast-content__icon" />
    <div className="toast-content__right">
      <span className="toast-content__right__title">{type.toUpperCase()}</span>
      {text && <span className="toast-content__right__text">{text}</span>}
    </div>
  </div>
);

ToastContent.propTypes = {
  type: PropTypes.oneOf([
    'info',
    'warning',
    'success',
    'error',
  ]).isRequired,
  text: PropTypes.string,
};

ToastContent.defaultProps = {
  text: '',
};

export default ToastContent;
