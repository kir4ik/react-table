import React, { useEffect, useCallback } from 'react';

import { Loader } from 'components/stubs';
import { CustomersTable } from 'components/tables';
import { CustomerForm } from 'components/forms';
import { BaseButton } from 'components/buttons';
import { useCustomers } from 'hooks/api';
import { CUSTOMER_CAPTIONS_ID } from 'consts';
import { generateRandomCustomers } from 'helpers';

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

  const onDeleteSubmit = useCallback(
    id => removeCustomer({ id }),
    [removeCustomer],
  );
  const onEditSubmit = useCallback(
    body => updateCustomer({ body }),
    [updateCustomer],
  );
  const onPostSubmit = useCallback(
    body => postCustomer({ body }).then(res => ({ isReset: !res.isError })),
    [postCustomer],
  );

  const devInstall = useCallback(
    () => multyPostCustomers({ body: generateRandomCustomers() }),
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
        <BaseButton content="Clear Table" onClick={removeAllCustomers} />
      ) : (
        <BaseButton content="Dev Install" onClick={devInstall} />
      )}
      <CustomersTable
        initalSort={{
          id: CUSTOMER_CAPTIONS_ID.ID,
          isDown: true,
        }}
        customers={customers}
        onDeleteSubmit={onDeleteSubmit}
        onEditSubmit={onEditSubmit}
      />
      <CustomerForm onSubmit={onPostSubmit} />
    </div>
  );
};

export default CustomersScreen;
