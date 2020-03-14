// const name = 'store';

// const openRequest = indexedDB.open(name, version);

// openRequest.onupgradeneeded = () => {
//   // срабатывает, если на клиенте нет базы данных
//   // ...выполнить инициализацию...
// };

// openRequest.onerror = () => {
//   console.error('Error', openRequest.error);
// };

// openRequest.onsuccess = () => {
//   const db = openRequest.result;
//   // продолжить работу с базой данных, используя объект db
// };


// //

// // проверить существование указанной версии базы данных, обновить по мере необходимости:
// openRequest.onupgradeneeded = () => {
//   // the existing database version is less than 2 (or it doesn't exist)
//   const db = openRequest.result;
//   switch (db.version) { // существующая (старая) версия базы данных
//     case 0:
//     // версия 0 означает, что на клиенте нет базы данных
//     // выполнить инициализацию
//       break;
//     case 1:
//     // на клиенте версия базы данных 1
//     // обновить
//       break;

//     default: break;
//   }
// };


// // const deleteRequest = indexedDB.deleteDatabase(name)
// // deleteRequest.onsuccess/onerror отслеживает результат
