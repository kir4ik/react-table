import {
  composeValidators,
  getValidateMinNumber,
  getValidateMaxNumber,
  getValidateMinSize,
  getValidateMaxSize,
  getValidatePhone,
  validateInteger,
  validateAlphabetic,
  setValueIfExists,
} from 'helpers';

const checkAndSetErrors = (errors, fields) => {
  fields.forEach(({ name, value, validate }) => {
    if (value) {
      setValueIfExists(errors, name, validate(value));
    }
  });
};

// eslint-disable-next-line import/prefer-default-export
export const validateAddCustomers = (fields) => {
  const errors = {};

  checkAndSetErrors(errors, [
    {
      name: 'firstName',
      value: fields.firstName,
      validate: composeValidators([
        getValidateMinSize(2),
        getValidateMaxSize(20),
        validateAlphabetic,
      ]),
    },
    {
      name: 'lastName',
      value: fields.lastName,
      validate: composeValidators([
        getValidateMinSize(2),
        getValidateMaxSize(20),
        validateAlphabetic,
      ]),
    },
    {
      name: 'age',
      value: fields.age,
      validate: composeValidators([
        validateInteger,
        getValidateMinNumber(18),
        getValidateMaxNumber(100),
      ]),
    },
    {
      name: 'phone',
      value: fields.phone,
      validate: getValidatePhone(5),
    },
  ]);

  return errors;
};
