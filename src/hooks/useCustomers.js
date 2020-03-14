import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

const cusomerSelector = state => console.count('selector') || state.customer;

export default () => {
  const data = useSelector(state => ({
    customer: cusomerSelector(state),
  }));

  const dispatch = useDispatch();

  const actions = useMemo(() => bindActionCreators({
    // actions
  }, dispatch), [dispatch]);

  return {
    ...data,
    ...actions,
  };
};
