import React from 'react';
import PropTypes from 'prop-types';

import { BaseButton } from 'components/buttons';

import './style.scss';

const Pagination = ({
  countPages,
  currentPage,
  onChangePage,
}) => {
  const prevPage = () => onChangePage(currentPage - 1);
  const nextPage = () => onChangePage(currentPage + 1);

  return (
    <div className="pagination">
      <BaseButton
        content="Prev"
        type="small"
        onClick={prevPage}
        disabled={currentPage <= 1}
      />
      <span className="pagination__page pagination__page_active">{currentPage}</span>
      <BaseButton
        content="Next"
        type="small"
        onClick={nextPage}
        disabled={currentPage >= countPages}
      />
    </div>
  );
};

Pagination.propTypes = {
  countPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number,
  onChangePage: PropTypes.func,
};

Pagination.defaultProps = {
  currentPage: 1,
  onChangePage: Function.prototype,
};

export default Pagination;
