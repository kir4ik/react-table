import {
  openTransaction,
  promiseTransaction,
  getResponse,
} from './transactions';

export const count = ({ db, table } = {}) => () => promiseTransaction(
  () => openTransaction({ db, table, permission: 0 }).store[table].count(),
);

export const getById = ({ db, table } = {}) => ({ id }) => promiseTransaction(
  ({ useChainRequests }) => {
    const { store } = openTransaction({ db, table, permission: 0 });
    return useChainRequests(
      () => store[table].get(id),
      (e) => {
        if (!getResponse(e.target).isExists) {
          throw new Error(`id ${id} not found`);
        }
      },
    );
  },
);

export const getAll = ({ db, table } = {}) => () => promiseTransaction(
  () => openTransaction({ db, table, permission: 0 }).store[table].getAll(),
);

export const post = ({ db, table } = {}) => body => promiseTransaction(
  ({ useChainRequests }) => {
    const { store } = openTransaction({ db, table, permission: 1 });
    return useChainRequests(
      () => store[table].add(body),
      e => store[table].get(getResponse(e.target).data),
    );
  },
);

export const put = ({ db, table } = {}) => body => promiseTransaction(
  ({ useChainRequests }) => {
    const { store } = openTransaction({ db, table, permission: 1 });

    return useChainRequests(
      () => store[table].get(body.id), // проверить на существование записи
      (e) => { // модификация существующей записи
        const response = getResponse(e.target);
        if (response.isExists) {
          return store[table].put(body);
        }

        throw new Error(`id ${body.id} not found`);
      },
      e => store[table].get(getResponse(e.target).data),
    );
  },
);

export const remove = ({ db, table } = {}) => ({ id }) => promiseTransaction(
  ({ useChainRequests }) => {
    const { store } = openTransaction({ db, table, permission: 1 });

    return useChainRequests(
      () => store[table].get(id),
      (e) => {
        const response = getResponse(e.target);
        if (response.isExists) {
          return store[table].delete(id);
        }

        throw new Error(`id ${id} not found`);
      },
    );
  },
);

export const clear = ({ db, table } = {}) => () => promiseTransaction(
  () => openTransaction({ db, table, permission: 1 }).store[table].clear(),
);

export const postAll = ({ db, table } = {}) => body => promiseTransaction(
  ({ useChainRequests }) => {
    const { store } = openTransaction({ db, table, permission: 1 });

    return useChainRequests(
      ...body.map(item => () => store[table].add(item)),
      () => store[table].getAll(),
    );
  },
);
