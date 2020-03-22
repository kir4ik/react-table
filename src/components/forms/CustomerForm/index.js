import React from 'react';
import { Form, Field } from 'react-final-form';

import { BaseButton } from 'components/buttons';
import { BaseField, SelectField } from 'components/fields';
import { validateRequired } from 'helpers';
import { validateAddCustomers } from 'consts';

import './style.scss';

const genderValues = [
  { value: '', label: '-- No Selected --' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

const resetWrapper = (submit, form) => e => submit(e).then(({ isReset } = {}) => isReset && form.reset());

const CustomerForm = formProps => (
  <Form
    {...formProps}
    validate={validateAddCustomers}
    render={({
      handleSubmit,
      submitting,
      pristine,
      form,
      invalid,
    }) => (
      <form onSubmit={resetWrapper(handleSubmit, form)} className="customer-form">
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
            validate={validateRequired}
          />
        </div>

        <div className="customer-form__buttons">
          <BaseButton
            onClick={form.reset}
            disabled={pristine || submitting}
            content="Reset"
          />
          <BaseButton
            onClick={resetWrapper(handleSubmit, form)}
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
