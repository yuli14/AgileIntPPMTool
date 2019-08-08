import axios from "axios"
import {GET_ERRORS, GET_PROJECT, GET_PROJECTS, UPDATE_PROJECT, DELETE_PROJECT} from "./types";
// import
//es6 syntax
//push to dashboard
//promise to wait
//must be (project, history) not {project, history}
export const createProject = (project, history) => async dispatch =>{
  try{
      // const res =
      await axios.post("/api/project", project);
      history.push("/dashboard");
      dispatch({
          type:GET_ERRORS,
          payload:{},
      })
  } catch (err) {
      //what if update errors?
      dispatch({
          type:GET_ERRORS,
          payload:err.response.data,
      })
  }
};
//register in Dashboard
export const getProjects = () => async dispatch =>{
    const res = await  axios.get("/api/project/all");
    dispatch({
        type:GET_PROJECTS,
        payload:res.data,
    })
    // try{
    //
    // }
};
export const getProject = (id, history) => async dispatch =>{
    try{
        const res = await axios.get(`/api/project/${id}`);
        dispatch({
            type:GET_PROJECT,
            payload:res.data,
        })
    }
    catch (e) {
        history.push("/dashboard")
    }

    // try{
    //
    // }
};
export const deleteProject = id => async dispatch =>{
    if(window.confirm("Are you sure to delete this project?")){
        await axios.delete(`/api/project/${id}`);
        dispatch({
            type:DELETE_PROJECT,
            //why as a payload to reducer?
            payload:id,
        })
    }

};

// export const updateProject = (projectID) => async dispatch =>{
//     const res = await  axios.get("http://localhost:8080/api/project/" + {projectID});
//     dispatch({
//         type:UPDATE_PROJECT,
//         payload:res.data,
//     })
// };