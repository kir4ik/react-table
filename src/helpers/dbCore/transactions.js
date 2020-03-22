/**
 * Создаёт цепочку запросов
 * Каждый запрос должен возвращать request для продолжения цепочки
 * При возникновении ошибки завершает цепочку с ошибкой
 * Цепочка также оборвётся, но без ошибок, если не вернуть request
 * !!! Первый запрос в цепочки должен возвращать request
 *
 * @param {Function} updateRequest - сработает на новом запросе
 * @param {Function} onerror - сработает на отмену транзации (проброшена ошибка в цепочке)
 *
 * @returns {Function}
 */
export const createChainRequests = (updateRequest, onerror) => (...requests) => {
  const onsuccessChain = successFn => requestFn => (e) => {
    let request;
    try {
      request = requestFn(e);
      if (request) {
        request.onsuccess = successFn;

        if (updateRequest) {
          updateRequest(request);
        }
      }
    } catch (error) {
      if (e && e.target) {
        e.target.transaction.abort();
        onerror(error);
      } else {
        throw error;
      }
    }

    return request;
  };

  return (Array.isArray(requests[0]) ? requests[0] : requests)
    .reduceRight((acc, req) => onsuccessChain(acc)(req), null)();
};

/**
 * Если есть someError - то request игнорируется
 * В ответе поле isError - сообщает об ошибке запроса
 * В ответе поле error - информация об ишбке в виде строки
 * В ответе поле data - конечный результат запроса
 * В ответе поле isExists - проверяет наличие поля data (не null и не undefined)
 *
 * @param {Object} request - информация по запросу IndexDB
 * @param {Error|String} someError - информация о любой ошибке
 *
 * @return {Object}
 */
export const getResponse = (request, someError) => {
  let response = {};

  if (someError) {
    response = { isError: true, error: someError };
  } else if (!request) {
    response = { isError: true, error: new Error('response not availibale') };
  } else {
    response = { isError: !!request.error, error: request.error };
  }

  if (!response.isError) {
    response.data = request.result;
    response.isExists = response.data != null;
  } else {
    response.error = response.error.message || response.error;
  }

  return response;
};

/**
 * Оборачивает все действия транзакции в Promise
 * Автоматически обрабатывает конечное состояние транзакции и завершает promise
 * В transactionDone будет передан объект, основной метод это useChainRequests ( смотреть описание createChainRequests ) - который
 * автоматичски обноляет request в response, позволяет разбить транзакцию на несколько последовательный операций
 * которые будут выполнены в порядке объвление при условии что предидущая завершилась успехом(и был возвращён request объект)
 * Если в цепочки операций не возвращается request - цепочка завершается(без ошибок)
 * Для завершения с ошибкой нужно пробросить исключение
 *
 * @param {Function} transactionDone - содержимое транзакции (все необходимые операции)
 *
 * @returns {Promise}
 */
export const promiseTransaction = transactionDone => new Promise((resolve, reject) => {
  const tmp = {};
  const updateRequest = (request) => {
    tmp.request = request;
    return request;
  };
  const onerror = (error) => {
    tmp.error = error;
  };

  tmp.request = transactionDone({
    resolve,
    reject,
    updateRequest,
    useChainRequests: createChainRequests(updateRequest, onerror),
  });

  tmp.request.transaction.oncomplete = () => {
    resolve(getResponse(tmp.request));
  };
  tmp.request.transaction.onabort = (e) => {
    reject(e.target.error || tmp.error);
  };
});

/**
 * Открытие транзакции по конкретным таблицам
 * Возвращает поля transaction(экземпляр транзакции) и store(объект с таблицами)
 *
 * @param {Object} options
 * @param {Object} options.db - экземпляр IndexDB
 * @param {String|[String]} options.table - названия таблиц, которые нужны
 * @param {Boolean} [options.permission] - true - режим чтения/записи, иначе только чтение
 *
 * @return {Object}
 */
export const openTransaction = ({ db, table, permission }) => {
  const transaction = db.transaction(table, permission ? 'readwrite' : 'readonly');
  const tables = Array.isArray(table) ? table : [table];

  return {
    transaction,
    store: tables.reduce((acc, name) => ({ ...acc, [name]: transaction.objectStore(name) }), {}),
  };
};
