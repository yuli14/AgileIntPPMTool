import {SET_CURRENT_USER} from "../actions/types";


const initialState = {
    user:{},
    validToken : false
};

const booleanActionPayload = (payload) =>{
    return !!payload;
};

export default function(state = initialState, action){
    switch (action.type) {
        //we want to make sure we actually have sth
        case SET_CURRENT_USER:
            return {
                ...state,
                validToken: booleanActionPayload(action.payload),
                user:action.payload,
            };

        default:
            return state;

    }

}