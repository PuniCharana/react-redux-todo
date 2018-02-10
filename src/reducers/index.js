import { combineReducers } from 'redux'
import TodoReducer from './todo-reducer'

const allReducer = combineReducers({
    todos: TodoReducer
});

export default allReducer;