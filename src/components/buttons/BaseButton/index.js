import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';

const BaseButton = ({
  content,
  type,
  disabled,
  loading,
  ...props
}) => {
  const buttonClass = classNames('base-button', {
    [`base-button_${type}`]: !!type,
    'base-button_loading': !!loading,
  });

  return (
    <button
      type="button"
      className={buttonClass}
      {...props}
      disabled={disabled || loading}
    >
      {content}
    </button>
  );
};

BaseButton.propTypes = {
  content: PropTypes.oneOfType([
    PropTypes.arrayOf([PropTypes.node]),
    PropTypes.node,
  ]),
  type: PropTypes.oneOf([
    '',
    'small',
  ]),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

BaseButton.defaultProps = {
  content: null,
  type: '',
  disabled: false,
  loading: false,
};

export default BaseButton;
