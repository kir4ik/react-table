import { actionByTypes, actionTypes } from 'consts';
import { makeAsyncRequest } from 'helpers/redux';
import dbCore from 'helpers/dbCore';

export default ({ onsuccess, onerror, body } = {}) => makeAsyncRequest({
  queryKey: actionTypes.CUSTOMER_ADD,
  callApi: dbCore.actions.post,
  onsuccess,
  onerror,
  body,
  transformResult: res => res.data,
  updateResult: actionByTypes.CUSTOMER_ADD,
});
