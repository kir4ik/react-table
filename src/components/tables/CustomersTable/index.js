import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';

import Pagination from 'components/Pagination';
import { CUSTOMER_CAPTIONS, CUSTOMER_CAPTIONS_ID } from 'consts';
import { customSorts, glider } from 'helpers';

import CustomersTableCaptions from './CustomersTableCaptions';
import CustomersTableRow from './CustomersTableRow';
import './style.scss';

const getInitSortParams = initalSort => (initalSort && Number.isFinite(initalSort.id)
  ? { ...initalSort }
  : null
);
const gliderDirection = (value, defaultValue) => glider(value, { range: [-1, 1], defaultValue });

const CustomersTable = ({
  customers,
  initalSort,
  fillPageSize,
  onEditCustomer,
  onDeleteCustomer,
  style,
}) => {
  const [sortParams, setSortParams] = useState(() => getInitSortParams(initalSort));
  const [currentPage, setPage] = useState(1);

  const captions = useMemo(() => {
    let res = CUSTOMER_CAPTIONS;
    const { id, direction } = sortParams || {};

    if (Number.isFinite(id)) {
      res = CUSTOMER_CAPTIONS.map(item => (item.id === id
        ? { ...item, direction }
        : item
      ));
    }

    return res;
  }, [sortParams]);

  const sortedCustomers = useMemo(() => {
    let res = customers;

    if (!sortParams.direction) {
      return res;
    }

    const options = {
      direction: sortParams.direction,
    };

    switch (sortParams.id) {
      case CUSTOMER_CAPTIONS_ID.ID:
        options.key = 'id';
        break;
      case CUSTOMER_CAPTIONS_ID.FIRST_NAME:
        options.key = 'firstName';
        break;
      case CUSTOMER_CAPTIONS_ID.LAST_NAME:
        options.key = 'lastName';
        break;
      case CUSTOMER_CAPTIONS_ID.PHONE:
        options.key = 'phone';
        options.asType = 'number';
        break;
      case CUSTOMER_CAPTIONS_ID.GENDER:
        options.key = 'gender';
        break;
      case CUSTOMER_CAPTIONS_ID.AGE:
        options.key = 'age';
        options.asType = 'number';
        break;

      default:
        break;
    }

    if (options.direction && options.key) {
      res = customSorts(customers, options);
    }

    return res;
  }, [customers, sortParams]);

  const { dataTable, countPages, noData } = useMemo(() => {
    const sliceFrom = (currentPage - 1) * fillPageSize;

    const res = {
      dataTable: sortedCustomers.slice(sliceFrom, sliceFrom + fillPageSize),
      countPages: Math.ceil(sortedCustomers.length / fillPageSize),
    };
    res.noData = !res.dataTable.length;

    return res;
  }, [sortedCustomers, currentPage, fillPageSize]);

  const changeSort = useCallback((id, activeDirection) => setSortParams({
    id,
    direction: gliderDirection(activeDirection - 1, -1),
  }), []);

  useEffect(() => {
    // автоматический переход на страницу с данными (когда с текущей данные были удалены или вся таблица очищена)
    if (currentPage > countPages) {
      setPage(Math.max(countPages, 1));
    }
  }, [currentPage, countPages]);

  return (
    <div className="customers-table" style={style}>
      <CustomersTableCaptions
        captions={captions}
        changeSort={changeSort}
      />
      {noData ? (
        <h3 className="customers-table__empty">No Data</h3>
      ) : (
        dataTable.map(item => (
          <CustomersTableRow
            key={item.id}
            info={item}
            onEdit={onEditCustomer}
            onDelete={onDeleteCustomer}
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
  onEditCustomer: PropTypes.func.isRequired,
  onDeleteCustomer: PropTypes.func.isRequired,
  initalSort: PropTypes.object,
  style: PropTypes.object,
  fillPageSize: PropTypes.number,
};

CustomersTable.defaultProps = {
  initalSort: null,
  style: null,
  fillPageSize: 10,
};

export default CustomersTable;
