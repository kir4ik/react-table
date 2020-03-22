import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getCustomers,
  multyPostCustomers,
  postCustomer,
  removeAllCustomers,
  removeCustomer,
  updateCustomer,
} from 'api';
import { actionTypes } from 'consts';

import {
  requestIsLoading,
  customerSelector,
} from './selectors';

export default () => {
  const data = useSelector(state => ({
    customers: customerSelector(state),
    customersIsLoading: requestIsLoading(state, actionTypes.CUSTOMER_GET_ALL),
  }));

  const dispatch = useDispatch();

  const actions = useMemo(() => bindActionCreators({
    getCustomers,
    multyPostCustomers,
    postCustomer,
    removeAllCustomers,
    removeCustomer,
    updateCustomer,
  }, dispatch), [dispatch]);

  return {
    ...data,
    ...actions,
  };
};
