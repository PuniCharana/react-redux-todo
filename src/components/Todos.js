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