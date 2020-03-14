import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const CustomersTableCaptions = ({
  captions,
  setSortUp,
  setSortDown,
  resetSort,
}) => {
  const getCaptionClass = ({
    isSortable = false,
    isDown = false,
    isUp = false,
  } = {}) => classNames('customers-table__captions__label', {
    'customers-table__captions__label_sortable': isSortable,
    'customers-table__captions__label_down': isDown,
    'customers-table__captions__label_up': isUp,
  });
  console.log(captions);

  return (
    <div className="customers-table__captions">
      {captions.map(item => (
        <span
          key={item.id}
          title={item.label}
          role="presentation"
          className={getCaptionClass({
            isSortable: item.sortable,
            isDown: item.isDown,
            isUp: item.isUp,
          })}
          onClick={(item.sortable && (
            (item.isDown && (() => setSortUp(item.id)))
            || (item.isUp && resetSort)
            || (() => setSortDown(item.id))
          )) || null}
        >
          {item.label}
        </span>
      ))}
    </div>
  );
};

CustomersTableCaptions.propTypes = {
  captions: PropTypes.array.isRequired,
  setSortUp: PropTypes.func.isRequired,
  setSortDown: PropTypes.func.isRequired,
  resetSort: PropTypes.func.isRequired,
};

export default CustomersTableCaptions;
