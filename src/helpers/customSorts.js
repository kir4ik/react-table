import { get } from 'lodash';

const getToTypeMethod = (type) => {
  if (/string/i.test(type)) {
    return String;
  }
  if (/number/i.test(type)) {
    return Number;
  }

  return value => value;
};

export default (inputData, {
  key,
  direction = -1, // down
  asType,
}) => {
  const toType = getToTypeMethod(asType);

  return [...inputData].sort((a, b) => {
    const first = toType(get(a, key));
    const second = toType(get(b, key));
    let resCompare = 0;

    if (first > second) {
      resCompare = direction;
    } else if (first < second) {
      resCompare = -direction;
    }

    return resCompare;
  });
};
