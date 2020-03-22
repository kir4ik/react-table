import * as actionTypes from './actionTypes';

export default Object.entries(actionTypes)
  .reduce((acc, [name, value]) => {
    if ([
      actionTypes.REQUEST_START,
      actionTypes.REQUEST_SUCCESS,
      actionTypes.REQUEST_FAILURE,
    ].includes(value)) {
      acc[name] = data => ({ type: value, queryKey: data.queryKey, data });
    } else {
      acc[name] = data => ({ type: value, data });
    }

    return acc;
  }, {});
