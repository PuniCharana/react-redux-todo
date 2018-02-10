import C from '../constants'

const initialState = [
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

export default function (previousState=initialState, action) {
    switch (action.type) {
        case C.ADD_TODO:
            return previousState.concat({
                id: Date.now(),
                task: action.payload.text,
                completed: false
            })
        case C.DELETE_TODO:
            return previousState.filter((item)=>{ return item.id !== action.payload.id });
        default:
            return previousState;
    }
}