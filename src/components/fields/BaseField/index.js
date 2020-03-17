import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';

const BaseField = ({
  input,
  meta,
  label,
  id,
  ...rest
}) => {
  console.log(input.name, meta);
  const fieldClass = classNames('base-field', {
    'base-field_error': meta.touched && !!(meta.error || meta.invalid),
  });

  const inputId = id || input.name;

  return (
    <div className={fieldClass}>
      {label && <label htmlFor={inputId} className="base-field__label">{label}</label>}
      <input
        {...input}
        {...rest}
        id={inputId}
        type="text"
        className="base-field__input"
      />
    </div>
  );
};

BaseField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.oneOfType([
    PropTypes.arrayOf([PropTypes.node]),
    PropTypes.node,
  ]),
  id: PropTypes.string,
};

BaseField.defaultProps = {
  label: '',
  id: '',
};

export default BaseField;
