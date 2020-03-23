import { actionByTypes, actionTypes } from 'consts';
import { makeAsyncRequest } from 'helpers/redux';
import dbCore from 'helpers/dbCore';

export default ({ onsuccess, onerror } = {}) => makeAsyncRequest({
  queryKey: actionTypes.CUSTOMER_GET_ALL,
  callApi: dbCore.actions.getAll,
  onsuccess,
  onerror,
  transformResult: res => res.data || [],
  updateResult: actionByTypes.CUSTOMER_GET_ALL,
  showError: true,
});
