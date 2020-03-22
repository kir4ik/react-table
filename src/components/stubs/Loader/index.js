import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import circlesLoader from 'svg-loaders/svg-smil-loaders/circles.svg';

import './style.scss';

const Loader = ({
  type,
  isPage,
}) => {
  const loaderClass = classNames('loader', {
    [`loader_${type}`]: !!type,
    loader_page: !!isPage,
    loader_middle: isPage && !type,
  });

  return (
    <div className={loaderClass}>
      <img className="loader__icon" src={circlesLoader} alt="loading" />
    </div>
  );
};

Loader.propTypes = {
  type: PropTypes.oneOf([
    '',
    'small',
    'middle',
    'full',
  ]),
  isPage: PropTypes.bool,
};

Loader.defaultProps = {
  type: '',
  isPage: false,
};

export default Loader;
