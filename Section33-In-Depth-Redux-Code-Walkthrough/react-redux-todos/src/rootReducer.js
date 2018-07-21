import {ADD_TODO, REMOVE_TODO,EDIT_TODO,GET_TODOS} from "./actionCreators"; 

const initialState = {
    todos: [],
};

const rootReducer = (state=initialState,action) => {
    switch(action.type){
        case GET_TODOS: {
            return {...state, todos: action.data}
        }
        case ADD_TODO: {
            return {...state,todos:[...state.todos,action.task]};
        }
        case REMOVE_TODO: {
            let todos = [...state.todos].filter(todo => todo._id !== action.id);
            return ({...state,todos});
        }
        case EDIT_TODO: {
            let todos = [...state.todos].map(todo =>{
                if(todo._id === action.id){
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