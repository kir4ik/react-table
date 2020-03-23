import React, { useEffect, useCallback, useState } from 'react';

import { Loader } from 'components/stubs';
import { CustomersTable } from 'components/tables';
import { BaseButton } from 'components/buttons';
import { CustomerFormModal, ConfirmModal } from 'components/modals';
import { useCustomers } from 'hooks/api';
import { useModalState } from 'hooks';
import { CUSTOMER_CAPTIONS_ID } from 'consts';
import { generateRandomCustomers, successToast, warningToast } from 'helpers';

import './style.scss';

const CustomersScreen = () => {
  const {
    customers,
    getCustomers,
    multyPostCustomers,
    postCustomer,
    removeAllCustomers,
    removeCustomer,
    updateCustomer,
    customersIsLoading,
  } = useCustomers();

  const [selectedCustomer, setSelectedCustomer] = useState({});
  const {
    activeModal,
    closeModal,
    openModalCreate,
    openModalEdit,
    openModalDeleteConfirm,
    openModalClearConfirm,
  } = useModalState(false, ['create', 'edit', 'deleteConfirm', 'clearConfirm']);

  const getSuccessHandler = useCallback(msg => () => {
    closeModal();
    successToast(msg, { toastId: msg || 'success' });
  }, []);

  const onDeleteSubmit = useCallback(
    () => removeCustomer({ id: selectedCustomer.id, onsuccess: getSuccessHandler('The customer has been removed') }),
    [removeCustomer, selectedCustomer],
  );
  const onEditSubmit = useCallback(
    body => updateCustomer({ body, onsuccess: getSuccessHandler('The customer has been updated') }),
    [updateCustomer],
  );
  const onPostSubmit = useCallback(
    body => postCustomer({ body, onsuccess: getSuccessHandler('The customer has been added') }),
    [postCustomer],
  );
  const onConfirmClearSubmit = useCallback(
    () => removeAllCustomers({ onsuccess: getSuccessHandler('All customers have been removed') }),
    [removeAllCustomers],
  );

  const findCustomerAndUpdate = (id) => {
    const foundCustomer = customers.find(el => el.id === id);
    if (foundCustomer) {
      setSelectedCustomer(foundCustomer);
    } else {
      warningToast('The customer not found', { toastId: 'The customer not found' });
    }

    return foundCustomer;
  };

  const onEditCustomer = (id) => {
    const foundCustomer = findCustomerAndUpdate(id);
    if (foundCustomer) {
      openModalEdit();
    }
  };
  const onDeleteCustomer = (id) => {
    const foundCustomer = findCustomerAndUpdate(id);
    if (foundCustomer) {
      openModalDeleteConfirm();
    }
  };

  const devInstall = useCallback(
    () => multyPostCustomers({ body: generateRandomCustomers(), onsuccess: getSuccessHandler() }),
    [multyPostCustomers],
  );

  useEffect(() => {
    getCustomers();
  }, []);

  return customersIsLoading ? (
    <Loader isPage />
  ) : (
    <div className="customers-screen">
      {customers.length ? (
        <BaseButton content="Clear Table" onClick={openModalClearConfirm} />
      ) : (
        <BaseButton content="Dev Install" onClick={devInstall} />
      )}
      <CustomersTable
        initalSort={{
          id: CUSTOMER_CAPTIONS_ID.ID,
          direction: -1,
        }}
        customers={customers}
        onEditCustomer={onEditCustomer}
        onDeleteCustomer={onDeleteCustomer}
        style={{ marginTop: 20, marginBottom: 20 }}
      />
      <BaseButton content="Add New Customer" onClick={openModalCreate} />

      <CustomerFormModal
        isOpen={activeModal === 'create'}
        title="add new customer"
        onClose={closeModal}
        onSubmit={onPostSubmit}
      />
      <CustomerFormModal
        isOpen={activeModal === 'edit'}
        title="edit customer"
        onClose={closeModal}
        onSubmit={onEditSubmit}
        initialValues={selectedCustomer}
      />

      <ConfirmModal
        isOpen={activeModal === 'deleteConfirm'}
        onClose={closeModal}
        title="confirm delete"
        subTitle={`Are you sure you want to delete ${selectedCustomer.firstName} ${selectedCustomer.lastName}? (id: ${selectedCustomer.id})`}
        withButtons
        onConfirm={onDeleteSubmit}
      />
      <ConfirmModal
        isOpen={activeModal === 'clearConfirm'}
        onClose={closeModal}
        title="confirm clear table"
        subTitle="Are you sure you want to delete all customers?"
        withButtons
        onConfirm={onConfirmClearSubmit}
      />
    </div>
  );
};

export default CustomersScreen;
