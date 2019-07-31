import axios from "axios";
import {GET_ERRORS, GET_PROJECT, GET_PROJECTS, DELETE_PROJECT} from "./types";
//import actions we are going to dispatch
export const createProject = (project, history) => async dispatch =>{
    try {
        const res = await axios.post("http://localhost:8080/api/project/", project);
        history.push("/dashboard");

        dispatch({
            type: GET_ERRORS,
            //wipe out all errors from state so that when we update other project, the errors not show up
            payload:{}
        });
    }catch (err) {
        dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        })

    }
};


export const getProjects = () =>async dispatch =>{
    const res = await axios.get("http://localhost:8080/api/project/all");
    dispatch ({
        type: GET_PROJECTS,
        payload: res.data
    })
};

export const getProject = (id, history) =>async  dispatch =>{
    try{
        const res = await  axios.get(`http://localhost:8080/api/project/${id}`);
        //dispatch to store
        dispatch ({
            type: GET_PROJECT,
            payload: res.data

        })
    }catch (error) {
        history.push("/dashboard")

    }

};

export const deleteProject = (id, history) =>async dispatch =>{

    await  axios.delete(`http://localhost:8080/api/project/${id}`);
    dispatch({
        type: DELETE_PROJECT,
        //why as a payload
        payload: id
    })

};