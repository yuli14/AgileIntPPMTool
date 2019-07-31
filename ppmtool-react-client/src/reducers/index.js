import {combineReducers} from "redux"
import errorReducer from "./errorReducer";
import projectReducer from "./projectReducer"
export default combineReducers({
    //must not be errors: errorReducer()
    errors: errorReducer,
    projects: projectReducer
})