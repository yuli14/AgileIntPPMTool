import axios from "axios";
//get backlog means all tasks
import {GET_ERRORS, GET_PROJECT_TASK, GET_BACKLOG, DELETE_PROJECT_TASK} from "./types";

export const addProjectTask = (backlog_id, project_task, history) => async dispatch =>{
  try{
    await axios.post(`/api/backlog/${backlog_id}`, project_task);
    history.push(`/projectBoard/${backlog_id}`);
    dispatch({
      type: GET_ERRORS,
      payload:{}
    })
  }
  catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload:err.response.data
    })

  }

};

export const getBacklogs = (backlog_id) => async dispatch =>{
  try{
    const res = await  axios.get(`/api/backlog/${backlog_id}`);
    dispatch({
      type:GET_BACKLOG,
      payload:res.data,
    })
  }
  catch (err) {
    dispatch({
      type:GET_ERRORS,
      payload:err.response.data,
    })
  }

};

export const deleteProjectTask = (backlog_id, project_task_id) => async dispatch =>{
  if(window.confirm(`You are deleting project task of ${project_task_id}, this action can not be undone`))

    await  axios.delete(`/api/backlog/${backlog_id}/${project_task_id}`);
    // history.push(`/projectBoard/${backlog_id}`)
    dispatch({
      type:DELETE_PROJECT_TASK,
      payload:project_task_id,
    })

};

export const getProjectTask = (backlog_id, project_task_id, history) => async dispatch=>{
  try{
    const res = await axios.get(`/api/backlog/${backlog_id}/${project_task_id}`);
    dispatch({
      type:GET_PROJECT_TASK,
      payload:res.data,
    })
  }
  catch (err) {
    // dispatch({
    //   type:GET_ERRORS,
    //   payload:err.response.data,
    // })
    history.push("/dashboard");
  }
};
//patch mapping
export const  updateProjectTask = (backlog_id, project_task_id, project_task, history) =>async dispatch=>{
  try{
    await axios.patch(`/api/backlog/${backlog_id}/${project_task_id}`, project_task);
    history.push(`/projectBoard/${backlog_id}`);
    dispatch({
      type:GET_ERRORS,
      payload:{},
    })
  }
  catch (err) {
    dispatch({
      type:GET_ERRORS,
      payload:err.response.data,
    });
    // history.push(`/projectBoard/${backlog_id}`);
  }
};


