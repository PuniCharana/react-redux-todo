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