import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import './style.scss';

const BaseModal = ({
  children,
  onClose,
  isOpen,
  title,
  titleStyle,
  ...rest
}) => (
  <Modal
    overlayClassName="base-modal-overlay"
    className="base-modal"
    onRequestClose={onClose}
    isOpen={isOpen}
    closeTimeoutMS={200}
    {...rest}
  >
    {title && (
      <h2 className="base-modal__title" style={titleStyle}>{title}</h2>
    )}
    {children}
  </Modal>
);

BaseModal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf([PropTypes.node]),
    PropTypes.node,
  ]),
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  titleStyle: PropTypes.object,
};

BaseModal.defaultProps = {
  children: '',
  onClose: null,
  isOpen: false,
  title: '',
  titleStyle: null,
};

export default BaseModal;
