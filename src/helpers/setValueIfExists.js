export default (obj, key, value) => {
  if (value) {
    // eslint-disable-next-line no-param-reassign
    obj[key] = value;
  }
};
