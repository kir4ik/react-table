import React from 'react';
import PropTypes from 'prop-types';

import editIcon from 'assets/img/edit.svg';
import deleteIcon from 'assets/img/delete.svg';

const formatPhone = phone => String(phone).replace(/(\d{3})/g, '$1-').replace(/-?(\d{1})-?$/, '$1');

const CustomersTableRow = ({
  info,
  onEdit,
  onDelete,
}) => (
  <div className="customers-table__row">
    <span className="customers-table__row__text" title={info.id}>{info.id}</span>
    <span className="customers-table__row__text" title={info.firstName}>{info.firstName}</span>
    <span className="customers-table__row__text" title={info.lastName}>{info.lastName}</span>
    <span className="customers-table__row__text" title={info.phone}>{formatPhone(info.phone)}</span>
    <span className="customers-table__row__text" title={info.gender}>{info.gender}</span>
    <div className="customers-table__row__ceil">
      <span className="customers-table__row__text" title={info.age}>{info.age}</span>
      <div className="customers-table__row__ceil__control">
        <img
          className="customers-table__row__ceil__control__icon"
          src={editIcon}
          alt="edit"
          role="presentation"
          onClick={() => onEdit(info.id)}
        />
        <img
          className="customers-table__row__ceil__control__icon"
          src={deleteIcon}
          alt="delete"
          role="presentation"
          onClick={() => onDelete(info.id)}
        />
      </div>
    </div>
  </div>
);

CustomersTableRow.propTypes = {
  info: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CustomersTableRow;
