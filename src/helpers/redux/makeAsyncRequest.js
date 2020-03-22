import { actionByTypes } from 'consts';

export default options => async (dispatch) => {
  dispatch(actionByTypes.REQUEST_START({
    queryKey: options.queryKey,
    data: options.body,
  }));

  return options.callApi({
    body: options.body,
    onsuccess: (response) => {
      if (options.onsuccess) {
        options.onsuccess(response);
      }

      dispatch(actionByTypes.REQUEST_SUCCESS({
        queryKey: options.queryKey,
        data: response,
      }));

      const dataForStore = options.transformResult
        ? options.transformResult(response)
        : response;

      const action = options.updateResult(dataForStore);
      if (action) {
        dispatch(action);
      }
    },
    onerror: (response) => {
      if (options.onerror) {
        options.onerror(response);
      }

      dispatch(actionByTypes.REQUEST_FAILURE({
        queryKey: options.queryKey,
        data: response,
      }));
    },
  });
};
