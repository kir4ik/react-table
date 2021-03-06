export const validateRequired = value => !(value && String(value).trim());

export const validateAlphabetic = value => value && !(/^[a-z]+$/i.test(String(value).trim()));

export const validateInteger = value => !Number.isInteger(+value);

export const getValidatePhone = (min = 7, max = 15) => value => value && !(new RegExp(`^\\d{${min},${max}}$`).test(String(value).trim()));

export const getValidateMinSize = min => value => value && String(value).trim().length < min;

export const getValidateMaxSize = max => value => value && String(value).trim().length > max;

export const getValidateMinNumber = min => value => !Number.isFinite(+value) || +value < min;

export const getValidateMaxNumber = max => value => !Number.isFinite(+value) || +value > max;


export const composeValidators = validators => (...args) => {
  let error;

  validators.some((validate) => {
    error = validate(...args);
    return error;
  });

  return error;
};
