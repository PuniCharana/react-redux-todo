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