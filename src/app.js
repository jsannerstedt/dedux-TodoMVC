import { createStore } from 'dedux';
import actions from './actions';
import modifiers from './modifiers';
import riot from 'riot';

import './tags/todo.tag';
import './tags/todoitem.tag';
import './actionHandlers';

const STORAGE_KEY = 'todo-state';
const initialState = localStorage.getItem(STORAGE_KEY);

const store = createStore(modifiers, actions, JSON.parse(initialState || '{}'));

if (window.location.hash) {
  actions.activateFilter(window.location.hash.slice(2));
}

const todoApp = riot.mount('todo', { state: store.getState() })[0];

store.subscribe(state => {
  todoApp.opts.state = state;
  todoApp.update();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
});

window.onhashchange = () => {
  actions.activateFilter(window.location.hash.slice(2));
};
