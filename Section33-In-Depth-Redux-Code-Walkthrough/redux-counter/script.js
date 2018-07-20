const initialState = {
  count: 0
};

const rootReducer = (state=initialState,action)=>{
  switch(action.type){
    case "INCREMENT": {
      let newState = {...state};
      newState.count++
      return newState;
    }
    case "DECREMENT": {
      let newState = {...state};
      newState.count--
      return newState;
    }
    default: return state;
  }
};

const store = Redux.createStore(rootReducer);

const increment = ()=>({type: "INCREMENT"});

const decrement = ()=>({type: "DECREMENT"});

const setDisplay = ()=> $("#counter").text(store.getState().count);

$(document).ready(()=>{
  $("#increment").on("click",()=>{
    store.dispatch(increment());
    setDisplay();
  });
  
  $("#decrement").on("click",()=>{
    store.dispatch(decrement());
    setDisplay();
  });
  setDisplay();
});

