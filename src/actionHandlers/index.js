'use strict';

import actions from '../actions';

const ENTER_KEY = 13;

actions.todoInput.subscribe(e => {
  if (e.which === ENTER_KEY) {
    const value = e.target.value && e.target.value.trim();
    if (!value) {
      return;
    }
    actions.addTodo({ title: value, completed: false, editing: false });
  }
});

actions.doneEdit.subscribe(payload => {
  if (!payload.todo.editing) {
    return;
  }
  if (payload.title) {
    actions.updateTodo({ todo: payload.todo, value: { editing: false, title: payload.title } });
  } else {
    actions.removeTodo(payload.todo);
  }
});
