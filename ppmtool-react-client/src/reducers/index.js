import {combineReducers} from "redux"
import errorReducer from "./errorReducer";
import projectReducer from "./projectReducer"
import backlogReducer from "./backlogReducer"
export default combineReducers({
    //must not be errors: errorReducer()
    errors: errorReducer,
    projects: projectReducer,
    backlog: backlogReducer
})