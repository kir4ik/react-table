import rand from './rand';

export default (dataSize = 50) => Array.from(Array(dataSize)).map((el, i) => ({
  id: i + 1,
  firstName: 'firstName',
  lastName: 'lastName',
  age: String(rand(18, 100)),
  gender: rand(0, 1) > 0 ? 'male' : 'female',
  phone: Array.from(Array(rand(7, 15))).map(() => rand(0, 9)).join(''),
}));
