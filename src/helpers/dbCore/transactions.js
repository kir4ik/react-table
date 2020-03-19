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

export const openTransaction = ({ db, table, permission }) => {
  const transaction = db.transaction(table, permission ? 'readwrite' : 'readonly');
  const tables = Array.isArray(table) ? table : [table];

  return {
    transaction,
    store: tables.reduce((acc, name) => ({ ...acc, [name]: transaction.objectStore(name) }), {}),
  };
};
