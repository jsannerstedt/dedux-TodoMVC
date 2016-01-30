import { createActions } from 'dedux';
import modifiers from './modifiers/index';

export default createActions(Object.keys(modifiers).concat(['todoInput', 'doneEdit']));
