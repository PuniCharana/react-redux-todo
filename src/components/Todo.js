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