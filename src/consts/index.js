import * as types from './actionTypes';

export * from './formValidators';
export * from './tableCaptions';

export const isDev = !!(process && process.env.NODE_ENV !== 'production');
export const actionTypes = types;
