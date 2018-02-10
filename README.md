## React Redux Todo (Method-1)
___

## Introduction
A simple todo app build using [React](https://reactjs.org/). This project is build to demonstrate different ways to use redux in react app.


* The [master](https://github.com/PuniCharana/react-redux-todo/tree/master) branch contains (Method-1) one way of implementing redux to react app.

* The [method-2](https://github.com/PuniCharana/react-redux-todo/tree/method-2) branch contains (Method-2) one way of implementing redux to react app.

**Note**: Both **master** (Method-1) and **method-2** (Method-2) branch do the exact same thing. The only difference is how redux is implemented.


<img src="https://raw.githubusercontent.com/PuniCharana/react-redux-todo/master/public/assets/react-redux-todo.PNG" alt="alt text" width="300px">

## Features

* Add New Todo
* Delete Todo


## Contribution

Please feel free to add new methods/ways of redux implementation. You can also add/sgare your way of implementing redux to your app. Any correction is very much appreciated.

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

ReactDOM.render(<Todos/>, document.getElementById('root'));
registerServiceWorker();

```

___
dispatcher.js
```js
import { Dispatcher } from 'flux';
const dispatcher = new Dispatcher();
export default dispatcher;
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
stores/TodoStore.js
```js
import { EventEmitter } from 'events';
import dispatcher from '../dispatcher'
import C from '../constants'

class TodoStore extends EventEmitter {
    constructor() {
        super();

        this.todos = [
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
    }

    addTodo(text) {
        this.todos.push({
            id: Date.now(),
            task: text,
            completed: false
        });
        
        this.emit("change")
    }

    deleteTodo(id) {
        var removeIndex = this.todos.map(function(item) { return item.id; }).indexOf(id);
        this.todos.splice(removeIndex, 1);

        this.emit("change")
    }

    getAllTodos() {
        return this.todos;
    }

    handleActions(action) {
        console.log("TodoStore receive an action: ", action);

        switch (action.type) {
            case C.ADD_TODO: {
                this.addTodo(action.task)
                break;
            }
            case C.DELETE_TODO: {
                this.deleteTodo(action.id)
                break;
            }
        }
    }
}

const todoStore = new TodoStore();
dispatcher.register(todoStore.handleActions.bind(todoStore));
export default todoStore;
```

___
actions/TodoActions.js
```js
import dispatcher from '../dispatcher'
import C from '../constants'

export function createTodo(text) {
    dispatcher.dispatch({
        type: C.ADD_TODO,
        task: text
    })
}

export function deleteTodo(id) {
    dispatcher.dispatch({
        type: C.DELETE_TODO,
        id
    })
}
```

___
components/Todo.js
```js
import React from 'react';
import * as TodosAction from '../actions/TodoActions'

const Todo = (props) => {
    
    function deleteTodo () {
        TodosAction.deleteTodo(props.id)
    }
    
    return(
        <div className="todo">
            <span>{props.task}</span>
            <button onClick={deleteTodo}>X</button>
        </div>
    )
}

export default Todo;
```

___
components/Todos.js
```js
import React, { Component } from 'react';
import Todo from './Todo'
import TodoStore from '../stores/TodoStore';
import * as TodosAction from '../actions/TodoActions'

class Todos extends Component {
    constructor() {
        super();

        this.getTodos = this.getTodos.bind(this)
        this.state = {
              todos: TodoStore.getAllTodos(),
              todoInput: ""
        }
    }

    componentWillMount() {
        TodoStore.on('change', this.getTodos)
    }

    getTodos() {
        this.setState({
            todos: TodoStore.getAllTodos()
        });
    }

    componentWillUnmount() {
        TodoStore.removeListener('change', this.getTodos)
    }

    handleChange = (e) => {
        this.setState({todoInput: e.target.value});
    }

    addTodo = () => {

        if (!this.state.todoInput) return alert("Todo cannot be empty");
        TodosAction.createTodo(this.state.todoInput)

        this.setState({todoInput: ""});
    }

    render() {
        const { todos } = this.state
        const TodosComponents = todos.map((todo, index) => <Todo key={index} {...todo}/>);
        return (
            <div className="Todos">
                <div className="input-container">
                    <input value={this.state.todoInput} type="text" onChange={this.handleChange} placeholder="Add new todo"/>
                    <button onClick={this.addTodo}>ADD</button>
                </div>
                <br/>
                <br/>
                {TodosComponents}
            </div>
        );
    }
}

export default Todos;
```