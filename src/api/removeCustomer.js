import { actionByTypes, actionTypes } from 'consts';
import { makeAsyncRequest } from 'helpers/redux';
import dbCore from 'helpers/dbCore';

export default ({ onsuccess, onerror, id } = {}) => makeAsyncRequest({
  queryKey: actionTypes.CUSTOMER_REMOVE,
  callApi: dbCore.actions.remove,
  onsuccess,
  onerror,
  body: { id },
  transformResult: () => id,
  updateResult: actionByTypes.CUSTOMER_REMOVE,
  showError: true,
});
