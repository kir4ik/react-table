import React from 'react';
import PropTypes from 'prop-types';

import { BaseButton } from 'components/buttons';

import BaseModal from '../BaseModal';

import './style.scss';

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  subTitle,
  withButtons,
  children,
}) => (
  <BaseModal
    isOpen={isOpen}
    onClose={onClose}
    title={title}
  >
    {!!subTitle && <h3 className="confirm-modal__subtitle">{subTitle}</h3>}
    {children}
    {!!withButtons && (
      <div className="confirm-modal__buttons">
        <BaseButton content="Cancel" onClick={onClose} />
        <BaseButton content="Confirm" onClick={onConfirm} />
      </div>
    )}
  </BaseModal>
);

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool,
  withButtons: PropTypes.bool,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  children: PropTypes.oneOf([
    PropTypes.arrayOf([PropTypes.node]),
    PropTypes.node,
  ]),
  onConfirm: PropTypes.func,
  onClose: PropTypes.func.isRequired,
};

ConfirmModal.defaultProps = {
  isOpen: false,
  withButtons: false,
  title: '',
  subTitle: '',
  children: null,
  onConfirm: null,
};

export default ConfirmModal;
