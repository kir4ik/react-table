import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';

import { BaseButton } from 'components/buttons';
import { BaseField, SelectField } from 'components/fields';
import { validateRequired } from 'helpers';
import { validateAddCustomers } from 'consts';

import BaseModal from '../BaseModal';

import './style.scss';

const genderValues = [
  { value: '', label: '-- No Selected --' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

const CustomerFormModal = ({
  title,
  onClose,
  isOpen,
  ...formProps
}) => (
  <BaseModal
    isOpen={isOpen}
    onClose={onClose}
    title={title}
  >
    <Form
      {...formProps}
      validate={validateAddCustomers}
      render={({
        handleSubmit,
        submitting,
        pristine,
        invalid,
      }) => (
        <form onSubmit={handleSubmit} className="customer-form-modal">
          <div className="customer-form-modal__fields">
            <Field
              component={BaseField}
              name="firstName"
              label="First Name"
              placeholder="First Name"
              validate={validateRequired}
            />
            <Field
              component={BaseField}
              name="lastName"
              label="Last Name"
              placeholder="Last Name"
              validate={validateRequired}
            />
            <Field
              component={BaseField}
              name="age"
              label="Age"
              placeholder="Age"
              validate={validateRequired}
            />
            <Field
              component={BaseField}
              name="phone"
              label="Phone"
              placeholder="___-___-____"
              validate={validateRequired}
            />
            <Field
              component={SelectField}
              name="gender"
              label="Gender"
              values={genderValues}
              validate={validateRequired}
            />
          </div>

          <div className="customer-form-modal__buttons">
            <BaseButton
              onClick={onClose}
              disabled={submitting}
              content="Cancel"
            />
            <BaseButton
              onClick={handleSubmit}
              disabled={pristine || invalid}
              loading={submitting}
              content="Submit"
            />
          </div>
        </form>
      )}
    />
  </BaseModal>
);

CustomerFormModal.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

CustomerFormModal.defaultProps = {
  title: '',
  isOpen: false,
};

export default CustomerFormModal;
