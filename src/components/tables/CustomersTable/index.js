import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

import { tableCaptions } from 'consts';
import Pagination from 'components/Pagination';

import CustomersTableCaptions from './CustomersTableCaptions';
import CustomersTableRow from './CustomersTableRow';
import './style.scss';

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const dataSize = 50;
const randomData = Array.from(Array(dataSize)).map((el, i) => ({
  id: i + 1,
  firstName: `Test name ${i + 1}`,
  lastName: `Test last name ${i + 1}`,
  age: rand(18, 100),
  gender: rand(0, 1) > 0 ? 'male' : 'female',
  phone: Array.from(Array(rand(7, 15))).map(() => rand(0, 9)).join(''),
}));

const getInitSortParams = initalSort => (initalSort && (initalSort.id || Number.isFinite(initalSort.id))
  ? { ...initalSort }
  : null
);

const fillPageSize = 10;
const CustomersTable = ({
  data = randomData,
  initalSort,
  // onEdit,
  // onDelete,
}) => {
  const [sortParams, setSortParams] = useState(() => getInitSortParams(initalSort));
  const [currentPage, setPage] = useState(1);

  const countPages = Math.ceil(data.length / fillPageSize);

  const captions = useMemo(() => {
    let res = tableCaptions.CUSTOMER_CAPTIONS;
    const {
      id,
      isUp,
      isDown,
    } = sortParams || {};

    if (id || Number.isFinite(id)) {
      res = tableCaptions.CUSTOMER_CAPTIONS.map(item => (item.id === id
        ? { ...item, isUp, isDown }
        : item
      ));

      // if (isUp) {
      //   res.sort((a, b) => a - b);
      // } else if (isDown) {
      //   res.sort((a, b) => b - a);
      // }
    }

    return res;
  }, [sortParams]);

  const setSortUp = useCallback(id => setSortParams({ id, isUp: true }), []);
  const setSortDown = useCallback(id => setSortParams({ id, isDown: true }), []);
  const resetSort = useCallback(() => setSortParams(getInitSortParams()), []);

  console.log('sortParams >>>', sortParams);
  const sliceFrom = (currentPage - 1) * fillPageSize;

  return (
    <div className="customers-table">
      <CustomersTableCaptions
        captions={captions}
        setSortUp={setSortUp}
        setSortDown={setSortDown}
        resetSort={resetSort}
      />
      {data.slice(sliceFrom, sliceFrom + fillPageSize).map(item => <CustomersTableRow key={item.id} info={item} />)}

      <Pagination
        countPages={countPages}
        currentPage={currentPage}
        onChangePage={setPage}
      />
    </div>
  );
};

CustomersTable.propTypes = {
  data: PropTypes.array.isRequired,
  // onEdit: PropTypes.func.isRequired,
  // onDelete: PropTypes.func.isRequired,
  initalSort: PropTypes.object,
};

CustomersTable.defaultProps = {
  initalSort: null,
};

export default CustomersTable;
