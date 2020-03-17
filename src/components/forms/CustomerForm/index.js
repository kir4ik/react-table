import React from 'react';
import { Form, Field } from 'react-final-form';

import { BaseButton } from 'components/buttons';
import { BaseField, SelectField } from 'components/fields';
import { validateRequired } from 'helpers';
import { validateAddCustomers } from 'consts';

import './style.scss';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const onSubmit = (...args) => console.log('args >>', ...args) || sleep(1500);

const genderValues = [
  { value: '', label: '-- No Selected --' },
  { value: 'm', label: 'Male' },
  { value: 'f', label: 'Female' },
];

const CustomerForm = formProps => (
  <Form
    {...formProps}
    onSubmit={onSubmit}
    validate={validateAddCustomers}
    render={({
      handleSubmit,
      submitting,
      pristine,
      form,
      invalid,
    }) => (
      <form onSubmit={handleSubmit} className="customer-form">
        <h2 className="customer-form__title">Add New Customer</h2>

        <div className="customer-form__fields">
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
          />
        </div>

        <div className="customer-form__buttons">
          <BaseButton
            onClick={form.reset}
            disabled={pristine || submitting}
            content="Reset"
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
);

export default CustomerForm;
