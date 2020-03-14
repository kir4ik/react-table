export default (type, argNames = []) => (params = {}) => {
  const action = { type };

  argNames.forEach((arg) => {
    action[argNames[arg]] = params[arg];
  });

  return action;
};

// const editTodo = makeActionCreator(EDIT_TODO, ['id', 'text'])
