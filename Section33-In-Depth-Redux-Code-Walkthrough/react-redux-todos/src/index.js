import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./rootReducer";
import { Provider } from "react-redux";
import { BrowserRouter} from "react-router-dom";
import thunk from "redux-thunk";

const store = createStore(rootReducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    );

ReactDOM.render(
<Provider store={store}>
    <BrowserRouter>
        <App />    
    </BrowserRouter>
</Provider>, 
document.getElementById('root'));
registerServiceWorker();
