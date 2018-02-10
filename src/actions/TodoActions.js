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