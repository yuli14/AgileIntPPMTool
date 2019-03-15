import {GET_PROJECTS, GET_PROJECT, DELETE_PROJECT} from "../actions/types";

const initialState = {
    //array of projects
    projects: [],
    project: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            };
        case GET_PROJECT:
            return {
                ...state,
                project: action.payload
            };
        case DELETE_PROJECT:
            return {
                ...state,
                //when we delete project, we need to refresh the list without refreshing page
                //first version
                //without waiting for server response
                projects: state.projects.filter(project => project.projectIdentifier !== action.payload)
            };

        default:
            return state;

    }
}