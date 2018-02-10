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
        const todoLists = todos.map((todo, index) => <Todo onClick={this.deleteTodo} key={index} {...todo}/>);
        return (
            <div className="Todos">
                <div className="input-container">
                    <input type="text" ref="todoInputVal" placeholder="Add new todo"/>
                    <button onClick={this.addTodo}>ADD</button>
                </div>
                <br/>
                <br/>
                {todoLists}
            </div>
        );
    }
}

export default Todos;