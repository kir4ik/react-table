import merge from 'lodash/merge';

export default (state = {}, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }

  return state;
};
