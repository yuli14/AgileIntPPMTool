import {GET_BACKLOG, DELETE_PROJECT_TASK, GET_PROJECT_TASK} from "../actions/types";

const initialstate = {
    project_tasks : [],
    project_task:{},

};


export default function(state = initialstate, action){

    switch (action.type) {

        default:
            return state;

        case GET_PROJECT_TASK:
            return {
                ...state,
                project_task:action.payload
            };
        case GET_BACKLOG:

            return {
                ...state,
                project_tasks:action.payload
            };
        case DELETE_PROJECT_TASK:
            return {
            //    filtering out the project we delete
                ...state,
                project_tasks:state.project_tasks.filter(project_task =>
                    project_task.projectSequence !== action.payload)


            }


    }
}