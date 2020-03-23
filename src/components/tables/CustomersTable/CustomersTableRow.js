import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import editIcon from 'assets/img/edit.svg';
import deleteIcon from 'assets/img/delete.svg';

const formatPhone = phone => String(phone).replace(/(\d{3})/g, '$1-').replace(/-?(\d{1})-?$/, '$1');
const animationDurationStyle = '3s';

const CustomersTableRow = ({
  info,
  onEdit,
  onDelete,
}) => {
  const ref = useRef();
  const timerId = useRef();
  const inited = useRef();

  useEffect(() => {
    clearTimeout(timerId.current);
    if (inited.current) {
      ref.current.style.animation = 'none';
      // eslint-disable-next-line no-unused-expressions
      ref.current.offsetHeight; /* trigger reflow */
      ref.current.style.removeProperty('animation');
      ref.current.style.animationDuration = animationDurationStyle;

      timerId.current = setTimeout(() => {
        if (ref.current) {
          ref.current.style.removeProperty('animation-duration');
        }
      }, Number.parseFloat(animationDurationStyle) * 1000);
    } else {
      inited.current = true;
    }
  }, [info]);

  return (
    <div className="customers-table__row" ref={ref}>
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
};

CustomersTableRow.propTypes = {
  info: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CustomersTableRow;
