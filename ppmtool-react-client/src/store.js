import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk"
import rootReducer from "./reducers"


//set initial state
const initialState={};
const middleware = [thunk];

let store;

//config to work with browser
if (window.navigator.userAgent.includes("Chrome")){
    //include root reducer, middleware, initial state. enhancer
    store = createStore(rootReducer, initialState, compose(
        applyMiddleware(...middleware),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
}
else{
    store = createStore(rootReducer, initialState, compose(
        applyMiddleware(...middleware)));
}

export default store;