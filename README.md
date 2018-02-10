## React Todo
___

## Introduction
A simple todo app build using [React](https://reactjs.org/).


<img src="https://raw.githubusercontent.com/PuniCharana/react-redux-todo/master/public/assets/react-redux-todo.PNG" alt="alt text" width="300px">

## Features

* Add New Todo
* Delete Todo

___
```json
{
  "name": "react-redux-todo",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^16.2.0",
    "react-dom": "^16.2.0",
    "react-scripts": "1.1.1"
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

ReactDOM.render(<Todos/>, document.getElementById('root'));
registerServiceWorker();

```

___
components/Todo.js
```js
import React from 'react';

const Todo = (props) => {
    
    function deleteTodo () {
        props.onClick(props.id)
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

class Todos extends Component {
    constructor() {
        super();

        this.state = {
              todos: [
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
              ]
        }
    }

    addTodo = () => {

        if (!this.refs.todoInputVal.value) return alert("Todo cannot be empty");
        var todos = this.state.todos;
        todos.push({
                    id: Date.now(),
                    task: this.refs.todoInputVal.value,
                    completed: false
                })

        this.setState(todos);
        this.refs.todoInputVal.value = ""
    }

    deleteTodo =(id)=> {
        var todos = this.state.todos;
        var removeIndex = todos.map(function(item) { return item.id; }).indexOf(id);
        todos.splice(removeIndex, 1);
        this.setState(todos);
    }

    render() {
        const { todos } = this.state
        const TodosComponents = todos.map((todo, index) => <Todo onClick={this.deleteTodo} key={index} {...todo}/>);
        return (
            <div className="Todos">
                <div className="input-container">
                    <input type="text" ref="todoInputVal" placeholder="Add new todo"/>
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