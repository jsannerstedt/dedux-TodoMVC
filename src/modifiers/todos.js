'use strict';

export default {
  initialState: () => ({ list: [], filteredTodos: [], activeFilter: 'all' }),
  activateFilter: (filter, state) => {
    const newState = Object.assign(state, { activeFilter: filter });
    return getNewState(newState.list, newState);
  },
  addTodo: (payload, state) => getNewState([...state.list, payload], state),
  removeCompleted: (payload, state) => getNewState(state.list.filter(t => !t.completed), state),
  removeTodo: (todo, state) => getNewState(state.list.filter(t => todo !== t), state),
  toggleAll: (payload, state) => {
    const list = state.list.map(todo => {
      todo.completed = payload;
      return todo;
    });
    return getNewState(list, state);
  },
  updateTodo: (payload, state) => {
    const list = state.list.map(t => {
      const todo = t;
      if (payload.todo === t) {
        Object.assign(todo, payload.value);
      }
      return todo;
    });
    return getNewState(list, state);
  }
};

function getNewState(list, state) {
  return {
    list,
    filteredTodos: calculateFilteredTodos(list, state),
    remaining: calculateRemaining(list),
    allDone: allDone(list)
  };
}

function calculateFilteredTodos(list, state) {
  if (state.activeFilter === 'active') {
    return list.filter(t => !t.completed);
  } else if (state.activeFilter === 'completed') {
    return list.filter(t => t.completed);
  }
  return list;
}

function calculateRemaining(list) {
  return list.filter(t => !t.completed).length;
}

function allDone(list) {
  return calculateRemaining(list) === 0;
}
