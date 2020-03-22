import { combineReducers } from 'redux';

import customer from './customerReducer';
import request from './requestReduser';

export default combineReducers({
  customer,
  request,
});
