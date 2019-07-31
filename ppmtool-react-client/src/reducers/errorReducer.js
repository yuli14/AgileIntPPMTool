import {GET_ERRORS} from "../actions/types";
//
const initialState = {};
//action or actions
export default function(state = initialState, action){
    switch (action.type) {
        case GET_ERRORS:
            //get errors from server, dispatch from server to store, how to hook up? in index.js in reducers
            return action.payload;
        default:
            return state;

    }
}