import React from 'react';

import { CustomersTable } from 'components/tables';
import { CustomerForm } from 'components/forms';
import { useCustomers } from 'hooks';
import { tableCaptions } from 'consts';

const CustomersScreen = () => {
  const {
    customer,
  } = useCustomers();
  console.log('customer >>>', customer);

  return (
    <div>
      <CustomersTable
        initalSort={{
          id: tableCaptions.CUSTOMER_CAPTIONS_ID.ID,
          isDown: true,
        }}
      />
      <CustomerForm />
    </div>
  );
};

export default CustomersScreen;
