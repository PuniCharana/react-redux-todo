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