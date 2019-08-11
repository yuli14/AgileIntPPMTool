import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from "./componenents/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "./componenents/Layout/Header";
import AddProject from "./componenents/Project/AddProject";
import { Provider } from "react-redux"
import store from"./store"
import UpdateProject from "./componenents/Project/UpdateProject";
import ProjectBoard from "./componenents/ProjectBoard/ProjectBoard";
import AddProjectTask from"./componenents/ProjectBoard/ProjectTasks/AddProjectTask"
import UpdateProjectTask from "./componenents/ProjectBoard/ProjectTasks/UpdateProjectTask";
import Landing from "./componenents/Layout/Landing";
import Register from "./componenents/userManagement/Register";
import Login from "./componenents/userManagement/Login";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken"
import {SET_CURRENT_USER} from "./actions/types";
import {logout} from "./actions/securityActions";
import SecureRoute from "./securityUtils/SecureRoute"

//we need to check whether local storage has token, and keep it as long as it;s valid, if not in state, we still have it in localstorage
const jwtToken = localStorage.jwtToken;
if(jwtToken){
    //why need to set again? because every time we refresh, the state goes away, we need to load back
    setJWTToken(jwtToken);
    const decoded_jwtToken = jwt_decode(jwtToken);
    store.dispatch({
        type:SET_CURRENT_USER,
        payload:decoded_jwtToken,
    });

    const currentTime = Date.now()/1000;
    if(decoded_jwtToken.exp < currentTime){
        // handle logout when token is not expired and user want to log out
        store.dispatch(logout());
        window.location.href="/";
    }
}

class App extends Component{
    render(){
        return(
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Header />
                        {
                            //public Routes
                        }
                        <Route exact path={"/"} component={Landing} />
                        <Route exact path={"/register"} component={Register} />
                        <Route exact path={"/login"} component={Login} />

                        {/*<Route exact path={"/login"} component={}>*/}
                        {
                            //private Routes

                        }
                        <Switch>
                        <SecureRoute exact path="/dashboard" component={Dashboard} />
                        <SecureRoute exact path="/addProject" component={AddProject} />
                        <SecureRoute exact path="/updateProject/:id" component={UpdateProject} />
                        <SecureRoute exact path="/projectBoard/:id" component={ProjectBoard} />
                        <SecureRoute exact path="/addProjectTask/:id" component={AddProjectTask} />
                        <SecureRoute exact path="/updateProjectTask/:backlog_id/:pt_id" component={UpdateProjectTask} />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        )
    }
}
// function App() {
//   return (
//
//   );
// }

export default App;
