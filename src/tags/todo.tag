<todo>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo" name="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?" onkeyup="{ todoInput }">
    </header>
    <section class="main" show="{ opts.state.todos.list.length}">
      <input class="toggle-all" type="checkbox" checked="{ opts.state.todos.allDone }" onclick="{ toggleAll }">
      <ul class="todo-list">
        <todoitem class="todo { completed: completed, editing: editing }"
            each="{ todo in opts.state.todos.filteredTodos }" todo="{ todo }"></todoitem>
      </ul>
    </section>
    <footer class="footer" show={ opts.state.todos.list.length }>
			<span class="todo-count">
				<strong>{ opts.state.todos.remaining }</strong> { opts.state.todos.remaining === 1 ? 'item' : 'items' } left
			</span>
      <ul class="filters">
        <li each="{ filters }"><a class="{ selected: parent.opts.state.todos.activeFilter === filter }" href="#/{ filter }">{ label }</a></li>
      </ul>
      <button class="clear-completed" onclick="{ removeCompleted }" show="{ opts.state.todos.list.length > opts.state.todos.remaining }">
        Clear completed
      </button>
    </footer>
  </section>
  <footer class="info">
    <p>Double-click to edit a todo</p>
    <p>Written by <a href="http://github.com/jsannerstedt">Joel Sannerstedt</a></p>
    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
  </footer>
  <script type="text/babel">
    import actions from '../actions';

    this.filters = [
      { filter: 'all', label: 'All'},
      { filter: 'active', label: 'Active'},
      { filter: 'completed', label: 'Completed'}
    ];

    actions.addTodo.subscribe(() => this['new-todo'].value = '');
    this.todoInput = e => actions.todoInput(e);
    this.removeCompleted = () => actions.removeCompleted();
    this.toggleAll = e => actions.toggleAll(e.target.checked);
  </script>
</todo>
