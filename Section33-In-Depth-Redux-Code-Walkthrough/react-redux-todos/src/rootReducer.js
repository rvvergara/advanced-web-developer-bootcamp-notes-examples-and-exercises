import {ADD_TODO, REMOVE_TODO,EDIT_TODO} from "./actionCreators"; 

const initialState = {
    todos: [],
    id: 0
};

const rootReducer = (state=initialState,action) => {
    switch(action.type){
        case ADD_TODO: {
            let newState = {...state};
            newState.id++;
            let todo = {
                task: action.task,
                id: newState.id
            }
            return {...newState,todos:[...state.todos,todo]};
        }
        case REMOVE_TODO: {
            let todos = [...state.todos].filter(todo => +todo.id !== +action.id);
            return ({...state,todos});
        }
        case EDIT_TODO: {
            let todos = [...state.todos].map(todo =>{
                if(+todo.id === +action.id){
                    todo.task = action.task
                }
                return todo;
            });
            return ({...state,todos});
        }
        default: return state;
    }
};

export default rootReducer;