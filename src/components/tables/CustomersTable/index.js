import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

import { CUSTOMER_CAPTIONS } from 'consts';
import Pagination from 'components/Pagination';

import CustomersTableCaptions from './CustomersTableCaptions';
import CustomersTableRow from './CustomersTableRow';
import './style.scss';

const getInitSortParams = initalSort => (initalSort && (initalSort.id || Number.isFinite(initalSort.id))
  ? { ...initalSort }
  : null
);

const CustomersTable = ({
  customers,
  initalSort,
  fillPageSize,
  onEditSubmit,
  onDeleteSubmit,
}) => {
  const [sortParams, setSortParams] = useState(() => getInitSortParams(initalSort));
  const [currentPage, setPage] = useState(1);

  const captions = useMemo(() => {
    let res = CUSTOMER_CAPTIONS;
    const {
      id,
      isUp,
      isDown,
    } = sortParams || {};

    if (id || Number.isFinite(id)) {
      res = CUSTOMER_CAPTIONS.map(item => (item.id === id
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

  const { dataTable, countPages, noData } = useMemo(() => {
    const sliceFrom = (currentPage - 1) * fillPageSize;

    const res = {
      dataTable: customers.slice(sliceFrom, sliceFrom + fillPageSize),
      countPages: Math.ceil(customers.length / fillPageSize),
    };
    res.noData = !res.dataTable.length;

    return res;
  }, [customers, currentPage, fillPageSize]);

  const setSortUp = useCallback(id => setSortParams({ id, isUp: true }), []);
  const setSortDown = useCallback(id => setSortParams({ id, isDown: true }), []);
  const resetSort = useCallback(() => setSortParams(getInitSortParams()), []);

  console.log('sortParams >>>', sortParams);

  return (
    <div className="customers-table">
      <CustomersTableCaptions
        captions={captions}
        setSortUp={setSortUp}
        setSortDown={setSortDown}
        resetSort={resetSort}
      />
      {noData ? (
        <h3 className="customers-table__empty">No Data</h3>
      ) : (
        dataTable.map(item => (
          <CustomersTableRow
            key={item.id}
            info={item}
            onEdit={onEditSubmit} // TODO open edit modal
            onDelete={onDeleteSubmit} // TODO oppen confirm delete modal
          />
        ))
      )}

      <Pagination
        countPages={countPages}
        currentPage={currentPage}
        onChangePage={setPage}
      />
    </div>
  );
};

CustomersTable.propTypes = {
  customers: PropTypes.array.isRequired,
  onEditSubmit: PropTypes.func.isRequired,
  onDeleteSubmit: PropTypes.func.isRequired,
  initalSort: PropTypes.object,
  fillPageSize: PropTypes.number,
};

CustomersTable.defaultProps = {
  initalSort: null,
  fillPageSize: 10,
};

export default CustomersTable;
