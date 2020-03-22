import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Loader from '../Loader';

import './style.scss';

const ConnectionWrapper = ({
  connection,
  children,
  content,
  ...wrapperProps
}) => {
  const [ready, setReady] = useState(connection.ready);

  useEffect(() => {
    if (!ready) {
      connection.onready(() => setReady(true));
    }

    // return () => connection.close();
  }, []);

  return ready ? children : (
    <div className="connection-wrapper" {...wrapperProps}>
      <div className="connection-wrapper__loading">
        <Loader />
      </div>
      <div className="connection-wrapper__content">{content}</div>
    </div>
  );
};

ConnectionWrapper.propTypes = {
  connection: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf([PropTypes.node]),
    PropTypes.node,
  ]).isRequired,
  content: PropTypes.oneOfType([
    PropTypes.arrayOf([PropTypes.node]),
    PropTypes.node,
  ]),
};

ConnectionWrapper.defaultProps = {
  content: 'Connection ...',
};

export default ConnectionWrapper;
