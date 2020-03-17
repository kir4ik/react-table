import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';

const SelectField = ({
  input,
  meta,
  values,
  label,
  onChange,
  ...rest
}) => {
  const fieldClass = classNames('select-field', {
    'select-field_error': !meta.pristine && !!(meta.error || meta.invalid),
  });

  const composeChange = (e) => {
    onChange(e.target.value);
    input.onChange(e);
  };

  return (
    <div className={fieldClass}>
      {label && <span className="select-field__label">{label}</span>}
      <select
        className="select-field__select"
        {...input}
        onChange={composeChange}
        {...rest}
      >
        {values.map(item => (
          <option
            key={item.value}
            value={item.value}
            className="select-field__select__option"
            {...item}
          >
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

SelectField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  values: PropTypes.array.isRequired,
  label: PropTypes.oneOfType([
    PropTypes.arrayOf([PropTypes.node]),
    PropTypes.node,
  ]),
  onChange: PropTypes.func,
};

SelectField.defaultProps = {
  label: '',
  onChange: Function.prototype,
};

export default SelectField;
