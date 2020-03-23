import * as types from './actionTypes';

export { default as actionByTypes } from './actionByTypes';
export * from './tableCaptions';

export const isDev = !!(process && process.env.NODE_ENV !== 'production');
export const actionTypes = types;
