import rootReducer from "./reducers";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

export function configureStore(){
    const store =   createStore(rootReducer,
        compose(applyMiddleware(thunk),
        window.devToolsExtension? window.devToolsExtension():f=>f
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );
    return store;
}
