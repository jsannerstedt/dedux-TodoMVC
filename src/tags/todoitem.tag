<todoitem>
  <div class="view">
    <input class="toggle" type="checkbox" checked="{ opts.todo.completed }" onclick="{ toggleTodo }">
    <label ondblclick="{ editTodo }">{ opts.todo.title }</label>
    <button class="destroy" onclick="{ removeTodo }"></button>
  </div>
  <input name="todoedit" class="edit" type="text" onblur="{ doneEdit }" onkeyup="{ editKeyUp }">
  <script type="text/babel">
    'use strict';

    import actions from '../actions';

    const ENTER_KEY = 13;
    const ESC_KEY = 27;
    const todo = this.opts.todo;

    this.removeTodo = () => actions.removeTodo(todo);
    this.toggleTodo = () => actions.updateTodo({ todo, value: { completed: !todo.completed } });
    this.doneEdit = () => actions.doneEdit({ todo, title: this.todoedit.value && this.todoedit.value.trim() });
    this.editTodo = () => {
      actions.updateTodo({ todo, value: { editing: true } });
      this.todoedit.value = todo.title;
      this.todoedit.focus();
    };
    this.editKeyUp = e => {
      if (e.which === ENTER_KEY || e.which === ESC_KEY) this.doneEdit();
    };
  </script>
</todoitem>
