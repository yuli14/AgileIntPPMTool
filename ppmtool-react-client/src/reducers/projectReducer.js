import {DELETE_PROJECT, GET_PROJECT, GET_PROJECTS} from "../actions/types";

const initialState={
    //can add pagination??dont know yet
    projects:[],
    project:{},
};

//need to register in index.js under reducers folder
//and need to add a GET from actions/projectAction
export default function(state = initialState, action){
    switch (action.type) {
        case GET_PROJECTS:
            return {
            //    ... means we can have others
            ...state,
            //    different from lecture, I use proejcts, he use project
            projects:action.payload
            };
        case GET_PROJECT:
            return{
                ...state,
                project:action.payload
            };
        case DELETE_PROJECT:
            return {
                ...state,
            //    refresh a list of project without refreshing page
                projects:state.projects.filter(project=>project.projectIdentifier !== action.payload)
            };
        default:
            return state;

    }
}