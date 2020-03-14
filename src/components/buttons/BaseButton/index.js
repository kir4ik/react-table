import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';

const BaseButton = ({
  content,
  type,
  ...props
}) => {
  const buttonClass = classNames('base-button', {
    [`base-button_${type}`]: !!type,
  });

  return (
    <button
      type="button"
      className={buttonClass}
      {...props}
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
};

BaseButton.defaultProps = {
  content: null,
  type: '',
};

export default BaseButton;
