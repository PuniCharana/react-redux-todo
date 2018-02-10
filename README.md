## React Redux Todo (Redux)
___

## Introduction
A simple todo app build using [React](https://reactjs.org/).


<img src="https://raw.githubusercontent.com/PuniCharana/react-redux-todo/master/public/assets/react-redux-todo.PNG" alt="alt text" width="300px">

## Features

* Add New Todo
* Delete Todo

___
package.json
```json
{
  "name": "react-redux-todo",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "flux": "^3.1.3",
    "react": "^16.2.0",
    "react-dom": "^16.2.0",
    "react-redux": "^5.0.6",
    "react-scripts": "1.1.1",
    "redux": "^3.7.2"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}

```

___
index.css
```css
* {
  margin: 0;
  padding: 0;
  font-family: Neucha,sans-serif;
  box-sizing: border-box;
}

.Todos {
  border: 1px solid #000;
  width: 300px;
  height: auto;;
  margin: 0 auto;
  padding: 10px;
  margin-top: 50px;
}

.Todos .input-container {
  display: inline-block;
}

.Todos .input-container input {
  width: 228px;
  height: 30px;
  padding: 5px;
}

.Todos .input-container button {
  width: 50px;
  height: 30px;
}

.Todos .todo {
  padding: 5px;
  border-bottom: 1px solid #f2f2f2;
}

.Todos .todo button {
  clear: both;
  padding: 0px 5px;
  float: right;
}
```

___

index.js
```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Todos from './components/Todos';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux'; 
import allReducer from './reducers/';
import { Provider } from 'react-redux'

const store = createStore(allReducer);

ReactDOM.render(
    <Provider store={store}>
        <Todos/>
    </Provider>,
document.getElementById('root'));
registerServiceWorker();

```
___
constants.js
```js
const constants = {
  ADD_TODO: "ADD_TODO",
  DELETE_TODO: "DELETE_TODO"
}

export default constants
```

___
reducers/index.js
```js
import { combineReducers } from 'redux'
import TodoReducer from './todo-reducer'

const allReducer = combineReducers({
    todos: TodoReducer
});

export default allReducer;
```

___
reducers/todo-reducer.js
```js
import C from '../constants'

const initialState = [
    {
        id: Date.now(),
        task: "Wake up",
        completed: false
    },
    {
        id: Date.now()+1,
        task: "Browse Reddit",
        completed: false
    },
    {
        id: Date.now()+2,
        task: "Eat Lunch",
        completed: false
    },
    {
        id: Date.now()+3,
        task: "Browse Reddit Again",
        completed: false
    }
];

export default function (previousState=initialState, action) {
    switch (action.type) {
        case C.ADD_TODO:
            return previousState.concat({
                id: Date.now(),
                task: action.payload.text,
                completed: false
            })
        case C.DELETE_TODO:
            return previousState.filter((item)=>{ return item.id !== action.payload.id });
        default:
            return previousState;
    }
}
```
___
components/Todo.js
```js
import React from 'react';
import { connect } from 'react-redux';
import C from '../constants'

const Todo = (props) => {
    
    function deleteTodo () {
        props.dispatch({
            type: C.DELETE_TODO,
            payload: {
                id: props.id
            }
        })
    }
    
    return(
        <div className="todo">
            <span>{props.task}</span>
            <button onClick={deleteTodo}>X</button>
        </div>
    )
}

const mapStateToProps =(state)=> ({
    todos: state.todos
})

export default connect(mapStateToProps)(Todo);
```

___
components/Todos.js
```js
import React, { Component } from 'react';
import Todo from './Todo'
import { connect } from 'react-redux';
import C from '../constants'

class Todos extends Component {
    constructor() {
        super();

        this.state = {
            todoInput: ""
        }
    }

    handleChange = (e) => {
        this.setState({todoInput: e.target.value});
    }

    addTodo = () => {

        if (!this.state.todoInput) return alert("Todo cannot be empty");
        
        this.props.dispatch({
            type: C.ADD_TODO,
            payload: {
                text: this.state.todoInput
            }
        })

        this.setState({todoInput: ""});
    }

    render() {
        const todoLists = this.props.todos.map((todo)=><Todo key={todo.id} {...todo}/>)
        return (
            <div className="Todos">
                <div className="input-container">
                    <input value={this.state.todoInput} type="text" onChange={this.handleChange} placeholder="Add new todo"/>
                    <button onClick={this.addTodo}>ADD</button>
                </div>
                <br/>
                <br/>
                {todoLists}
            </div>
        );
    }
}

const mapStateToProps =(state)=> ({
    todos: state.todos
})

export default connect(mapStateToProps)(Todos);
```