export default (value, { range: [min, max], defaultValue = 0 } = {}) => {
  let res = Number(value);
  if (value > max) {
    res = min;
  } else if (value < min) {
    res = max;
  }

  return Number.isFinite(res) ? res : defaultValue;
};
