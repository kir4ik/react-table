import React from 'react';

import { CustomersScreen } from 'src/screens';
import dbCore from 'helpers/dbCore';

dbCore.onready(() => {
  console.log('---- dbCore ready ----');
  console.log(dbCore);
  // post & put & getById & remove & clear & getAll & postAll & count
  dbCore.actions.getAll({
    onsuccess: res => console.log('promise executed success >>>', res),
    onerror: res => console.log('promise executed failed >>>', res),
  });
});

const App = () => (
  <CustomersScreen />
);

export default App;
