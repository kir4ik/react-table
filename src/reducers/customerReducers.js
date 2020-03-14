// import merge from 'lodash/merge';

import { makeReducer } from 'helpers/redux';
import { actionTypes } from 'consts';

const initialState = {};

export default makeReducer(initialState, {
  [actionTypes.UPDATE_ENTITIES]: (state, { response }) => {
    console.log('state >>>', state);

    return response;
  },
});
