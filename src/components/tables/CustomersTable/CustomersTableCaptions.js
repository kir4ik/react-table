import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const CustomersTableCaptions = ({
  captions,
  changeSort,
}) => {
  const getCaptionClass = ({
    isSortable = false,
    direction,
  } = {}) => classNames('customers-table__captions__label', {
    'customers-table__captions__label_sortable': isSortable,
    'customers-table__captions__label_down': direction < 0,
    'customers-table__captions__label_up': direction > 0,
  });

  return (
    <div className="customers-table__captions">
      {captions.map(item => (
        <span
          key={item.id}
          title={item.label}
          role="presentation"
          className={getCaptionClass({ isSortable: item.sortable, direction: item.direction })}
          onClick={!item.sortable ? null : (() => changeSort(item.id, item.direction))}
        >
          {item.label}
        </span>
      ))}
    </div>
  );
};

CustomersTableCaptions.propTypes = {
  captions: PropTypes.array.isRequired,
  changeSort: PropTypes.func.isRequired,
};

export default CustomersTableCaptions;
