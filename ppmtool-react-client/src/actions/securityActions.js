import axios from "axios"
import {GET_ERRORS, SET_CURRENT_USER} from "./types";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";
export const createNewUser = (newUser, history) => async dispatch =>{
    try{
        await axios.post("/api/users/register", newUser);
        history.push("/login");
        dispatch({
            type:GET_ERRORS,
            //clear all errors
            payload:{}
        })
    }catch (err) {
        dispatch({
            type:GET_ERRORS,
            payload: err.response.data
        })
    }

};

//json object of LoginRequest pass to the server
export const login = LoginRequest => async  dispatch =>{
//    hit the end point first
//    post => Login Request
    try{
        const res = await axios.post("api/users/login", LoginRequest);
        //extract token token from res.data
        const {token} = res.data;
        // store the token in the localStorage
        localStorage.setItem("jwtToken", token);
        //    set our token in header *** very important secure route
        setJWTToken(token);
        //    decode
        const decoded = jwt_decode(token);
//    token provider, claims, long string to store important information in springn backend
//    need to decode the token on React
//    dispatch to our security reducer
        dispatch({
            type:SET_CURRENT_USER,
            payload:decoded,
        })


    }
    catch (err) {
        dispatch({
            type:GET_ERRORS,
            payload:err.response.data,
        })

    }


};

export const logout = () => dispatch =>{
    localStorage.removeItem("jwtToken");
    setJWTToken(false);
    dispatch({
        type:SET_CURRENT_USER,
        payload:{},
    })

};
