import { get } from 'lodash';

export const requestSelector = (state, key) => get(state, `request.${key}`, {});
export const requestIsLoading = (state, key) => get(state, `request.${key}.isLoading`, false);
export const requestLastUpdate = (state, key) => get(state, `request.${key}.lastUpdate`);

export const customerSelector = state => get(state, 'customer.listCustomers', []);
