export const CUSTOMER_CAPTIONS = [
  {
    id: 0,
    name: 'ID',
    label: 'ID',
    sortable: true,
  },
  {
    id: 1,
    name: 'FIRST_NAME',
    label: 'First Name',
    sortable: true,
  },
  {
    id: 2,
    name: 'LAST_NAME',
    label: 'Last Name',
    sortable: true,
  },
  {
    id: 3,
    name: 'PHONE',
    label: 'Phone',
    sortable: true,
  },
  {
    id: 4,
    name: 'GENDER',
    label: 'Gender',
    sortable: true,
  },
  {
    id: 5,
    name: 'AGE',
    label: 'Age',
    sortable: true,
  },
];

export const CUSTOMER_CAPTIONS_ID = (() => CUSTOMER_CAPTIONS.reduce((acc, item) => {
  acc[item.name] = item.id;
  return acc;
}, {}))();
