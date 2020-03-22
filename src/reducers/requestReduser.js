import { makeReducer } from 'helpers/redux';
import { actionTypes } from 'consts';

const initialState = {};

const getHandlerRequest = (isStart = false) => (state, { data: { queryKey, data } }) => ({
  ...state,
  [queryKey]: {
    ...state[queryKey],
    isLoading: isStart,
    lastUpdate: Date.now(),
    data,
  },
});

export default makeReducer(initialState, {
  [actionTypes.REQUEST_START]: getHandlerRequest(true),
  [actionTypes.REQUEST_SUCCESS]: getHandlerRequest(),
  [actionTypes.REQUEST_FAILURE]: getHandlerRequest(),
});
