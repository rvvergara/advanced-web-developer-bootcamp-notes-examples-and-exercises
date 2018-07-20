const initialState = {
  todos: [],
  id: 0
}

const rootReducer = (state=initialState,action) => {
  switch(action.type){
    case "ADD_TODO": {
      let newState = {...state};
      newState.id++;
      let todo = {
        task: action.task,
        id: newState.id
      }
      return {...newState,todos:[...state.todos,todo]};
    }
    case "DELETE_TODO": {
       let todos = [...state.todos].filter(todo => +todo.id !== +action.id);
       return ({...state,todos}); 
    }
    default: return state;
  }
}

const store = Redux.createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const addTodo = newTask => ({type:"ADD_TODO",task:newTask});

const deleteTodo = id => ({type:"DELETE_TODO",id:id});

const $todosList = $("#todos");
const input = $("#task");

$(document).ready(()=>{

  $("form").on("submit",(e)=>{
    e.preventDefault();
    let newTask = input.val();
    store.dispatch(addTodo(newTask));
    let newTodoId = store.getState().id
    let $newLi = $("<li>",{text: newTask});
    let $deleteButton = $("<button>",{text:"X",id:newTodoId});
    $newLi.append($deleteButton);
    $todosList.append($newLi);
    input.val("");
  });

  $todosList.on("click","button",(e)=>{
    store.dispatch(deleteTodo(e.target.id));
    $(e.target).parent().remove();
  });
});
