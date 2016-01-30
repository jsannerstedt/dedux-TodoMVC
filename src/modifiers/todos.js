const toggleCompleted = (isComplete, list) => list.map(todo => Object.assign(todo, { completed: isComplete }));
const calculateFilteredTodos = (list, filter) => list.filter(t => 'completed' === filter ? t.completed : !t.completed);
const updateTodo = (todo, props, list) => list.map(t => t === todo ? Object.assign({}, todo, props) : t);
const calculateRemaining = list => list.filter(t => !t.completed).length;
const allDone = list => calculateRemaining(list) === 0;
const getNewState = (list, filter) => ({
  list,
  filteredTodos: 'all' === filter ? list : calculateFilteredTodos(list, filter),
  remaining: calculateRemaining(list),
  allDone: allDone(list)
});

export default {
  initialState: () => ({ list: [], filteredTodos: [], activeFilter: 'all' }),
  activateFilter: (filter, state) => Object.assign(getNewState(state.list, filter), { activeFilter: filter }),
  addTodo: (todo, state) => getNewState([...state.list, todo], state.activeFilter),
  removeCompleted: (payload, state) => getNewState(state.list.filter(t => !t.completed), state.activeFilter),
  removeTodo: (todo, state) => getNewState(state.list.filter(t => todo !== t), state.activeFilter),
  toggleAll: (isComplete, state) => getNewState(toggleCompleted(isComplete, state.list), state.activeFilter),
  updateTodo: (payload, state) => getNewState(updateTodo(payload.todo, payload.value, state.list), state.activeFilter)
};
