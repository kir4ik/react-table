import React from 'react';
import PropTypes from 'prop-types';

const CustomersTableRow = ({
  info,
}) => (
  <div className="customers-table__row">
    <span className="customers-table__row__text" title={info.id}>{info.id}</span>
    <span className="customers-table__row__text" title={info.firstName}>{info.firstName}</span>
    <span className="customers-table__row__text" title={info.lastName}>{info.lastName}</span>
    <span className="customers-table__row__text" title={info.phone}>{info.phone}</span>
    <span className="customers-table__row__text" title={info.gender}>{info.gender}</span>
    <span className="customers-table__row__text" title={info.age}>{info.age}</span>
  </div>
);

CustomersTableRow.propTypes = {
  info: PropTypes.object.isRequired,
};

export default CustomersTableRow;
