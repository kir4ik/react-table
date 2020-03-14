import React from 'react';

import { CustomersTable } from 'components/tables';
import { useCustomers } from 'hooks';
import { tableCaptions } from 'consts';

const CustomersScreen = () => {
  const {
    customer,
  } = useCustomers();
  console.log('customer >>>', customer);

  return (
    <CustomersTable
      initalSort={{
        id: tableCaptions.CUSTOMER_CAPTIONS_ID.ID,
        isDown: true,
      }}
    />
  );
};

export default CustomersScreen;
