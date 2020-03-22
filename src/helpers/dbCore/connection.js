let instanceDB = null;

export const dbName = 'store';
export const dbVersion = 1;
export const table = 'customers';

export const close = () => {
  if (instanceDB) {
    instanceDB.close();
    instanceDB = null;
  }
};

export const open = () => new Promise((resolve, reject) => {
  if (instanceDB) {
    return resolve(instanceDB);
  }

  const openRequest = indexedDB.open(dbName, dbVersion);

  openRequest.onupgradeneeded = () => {
    const db = openRequest.result;

    switch (db.version) { // существующая (старая) версия базы данных
      case 0:
      case 1:
      // версия 0 означает, что на клиенте нет базы данных
      // выполнить инициализацию
        db.createObjectStore(table, {
          keyPath: 'id',
          autoIncrement: true,
        });
        break;

      default: break;
    }
  };

  openRequest.onerror = () => {
    reject(openRequest.error);
  };

  openRequest.onsuccess = () => {
    instanceDB = openRequest.result;

    instanceDB.onversionchange = () => {
      close();
      alert('База данных устарела, пожалуста, перезагрузите страницу.');
    };

    resolve(instanceDB);
  };

  openRequest.onblocked = () => {
    // есть другое соединение к той же базе
    // и оно не было закрыто после срабатывания на нём db.onversionchange
    console.log('>>> db has been onblocked <<<');
  };

  return undefined;
});
