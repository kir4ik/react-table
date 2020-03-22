import React from 'react';

import { ConnectionWrapper } from 'components/stubs';
import { CustomersScreen } from 'src/screens';
import dbCore from 'helpers/dbCore';

const App = () => (
  <ConnectionWrapper connection={dbCore}>
    <CustomersScreen />
  </ConnectionWrapper>
);

export default App;
