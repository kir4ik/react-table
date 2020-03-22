import { makeReducer } from 'helpers/redux';
import { actionTypes } from 'consts';

const initialState = {
  listCustomers: [],
};

export default makeReducer(initialState, {
  [actionTypes.CUSTOMER_REMOVE_ALL]: () => ({ ...initialState }),
  [actionTypes.CUSTOMER_REMOVE]: (state, { data: id }) => (id != null ? ({
    ...state,
    listCustomers: state.listCustomers.filter(el => el.id !== id),
  }) : state),
  [actionTypes.CUSTOMER_GET_ALL]: (state, { data }) => ({
    ...state,
    listCustomers: data,
  }),
  [actionTypes.CUSTOMER_UPDATE]: (state, { data }) => ({
    ...state,
    listCustomers: state.listCustomers.map(el => (el.id === data.id
      ? data
      : el
    )),
  }),
  [actionTypes.CUSTOMER_ADD]: (state, { data }) => ({
    ...state,
    listCustomers: [...state.listCustomers, data],
  }),
  [actionTypes.CUSTOMER_MULTY_ADD]: (state, { data }) => ({
    ...state,
    listCustomers: [...state.listCustomers, ...data],
  }),
});
