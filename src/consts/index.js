import * as actionTypes from './actionTypes';
import * as tableCaptions from './tableCaptions';

const isDev = !!(process && process.env.NODE_ENV !== 'production');

export {
  actionTypes,
  tableCaptions,
  isDev,
};
