export default (initialState, handlers) => (state = initialState, action) => {
  if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    return handlers[action.type](state, action);
  }

  return state;
};

// createReducer([], {
//   [ActionTypes.ADD_TODO]: (state, action) => {
//     const text = action.text.trim()
//     return [...state, text]
//   }
// })
