import * as connection from './connection';
import * as actions from './actions';
import { getResponse } from './transactions';

const actionsInterface = {
  count: Function.prototype,
  getById: Function.prototype,
  getAll: Function.prototype,
  post: Function.prototype,
  put: Function.prototype,
  remove: Function.prototype,
  clear: Function.prototype,
  postAll: Function.prototype,
};

const getDbCore = () => {
  const interfaceDB = {
    name: connection.dbName,
    version: connection.dbVersion,
    db: connection.open(),
    ready: false,
    actions: { ...actionsInterface },
    onreadyListeners: [],
  };
  interfaceDB.close = () => {
    connection.close();
    interfaceDB.ready = false;
  };
  interfaceDB.onready = (cb) => {
    if (interfaceDB.ready) {
      cb();
    } else {
      interfaceDB.onreadyListeners.push(cb);
    }
  };

  interfaceDB.db.then((instance) => {
    interfaceDB.db = instance;
    // set actions
    Object.entries(actions).forEach(([name, fn]) => {
      interfaceDB.actions[name] = ({
        body = {},
        onsuccess = Function.prototype,
        onerror = Function.prototype,
      } = {}) => Promise.resolve().then(() => fn({
        db: interfaceDB.db,
        table: connection.table,
      })(body)
        .then((response) => {
          onsuccess(response);
          return response;
        })
        .catch((error) => {
          const response = getResponse(null, error);
          onerror(response);
          return response;
        }));
    });

    interfaceDB.ready = true;
    interfaceDB.onreadyListeners.forEach(cb => cb());
    interfaceDB.onreadyListeners = [];
  });

  return interfaceDB;
};

export default getDbCore();
