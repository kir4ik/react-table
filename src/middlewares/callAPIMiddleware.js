export default ({ dispatch, getState }) => next => (action) => {
  const {
    types,
    callAPI,
    shouldCallAPI = () => true,
    // payload = {},
  } = action;

  if (!types) {
    // Normal action: pass it on
    return next(action);
  }

  if (
    !Array.isArray(types)
    || types.length !== 3
    || !types.every(type => typeof type === 'string')
  ) {
    throw new Error('Expected an array of three string types.');
  }

  if (typeof callAPI !== 'function') {
    throw new Error('Expected callAPI to be a function.');
  }

  if (!shouldCallAPI(getState())) {
    return undefined;
  }

  const [requestType, successType, failureType] = types;

  dispatch({ type: requestType });

  return callAPI().then(
    response => dispatch({ response, type: successType }),
    error => dispatch({ error, type: failureType }),
  );
};

// function loadPosts(userId) {
//   return {
//     // Types of actions to emit before and after
//     types: ['LOAD_POSTS_REQUEST', 'LOAD_POSTS_SUCCESS', 'LOAD_POSTS_FAILURE'],
//     // Check the cache (optional):
//     shouldCallAPI: state => !state.posts[userId],
//     // Perform the fetching:
//     callAPI: () => fetch(`http://myapi.com/users/${userId}/posts`),
//     // Arguments to inject in begin/end actions
//     payload: { userId }
//   }
// }
