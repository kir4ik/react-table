import React from 'react';
// import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';

import { BaseButton } from 'components/buttons';
import { BaseField } from 'components/fields';

import './style.scss';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = (...args) => console.log('args >>', ...args) || sleep(1500);

const CustomerForm = () => (
  <Form
    onSubmit={onSubmit}
    // validate={onSubmit}
    render={({
      handleSubmit,
      submitting,
      pristine,
      form,
    }) => (
      <form onSubmit={handleSubmit} className="customer-form">
        <h2 className="customer-form__title">Add New Customer</h2>

        <div className="customer-form__fields">
          <Field
            component={BaseField}
            name="firstName"
            label="First Name"
            placeholder="First Name"
          />
          <Field
            component={BaseField}
            name="lastName"
            label="Last Name"
            placeholder="Last Name"
          />
          <Field
            component={BaseField}
            name="age"
            label="Age"
            placeholder="Age"
          />
          <Field
            component={BaseField}
            name="phone"
            label="Phone"
            placeholder="___-___-____"
          />
          {/* TODO set Gender via SelectField */}
          {/* <Field
            component={SelectField}
            name="gender"
            label="Gender"
          /> */}
        </div>

        <div className="customer-form__buttons">
          <BaseButton
            onClick={form.reset}
            disabled={pristine || submitting}
            content="Reset"
          />
          <BaseButton
            onClick={handleSubmit}
            disabled={pristine}
            // TODO loading={submitting}
            content="Submit"
          />
        </div>
      </form>
    )}
  />
);

CustomerForm.propTypes = {};

export default CustomerForm;
