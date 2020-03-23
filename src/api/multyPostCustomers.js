import { actionByTypes, actionTypes } from 'consts';
import { makeAsyncRequest } from 'helpers/redux';
import dbCore from 'helpers/dbCore';

export default ({ onsuccess, onerror, body } = {}) => makeAsyncRequest({
  queryKey: actionTypes.CUSTOMER_MULTY_ADD,
  callApi: dbCore.actions.postAll,
  onsuccess,
  onerror,
  body,
  transformResult: res => res.data,
  updateResult: actionByTypes.CUSTOMER_MULTY_ADD,
  showError: true,
});
