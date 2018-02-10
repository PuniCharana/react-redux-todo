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