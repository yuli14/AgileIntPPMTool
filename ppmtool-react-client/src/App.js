import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from "./componenents/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Route} from "react-router-dom";
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
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path="/addProject" component={AddProject} />
                        <Route exact path="/updateProject/:id" component={UpdateProject} />
                        <Route exact path="/projectBoard/:id" component={ProjectBoard} />
                        <Route exact path="/addProjectTask/:id" component={AddProjectTask} />
                        <Route exact path="/updateProjectTask/:backlog_id/:pt_id" component={UpdateProjectTask} />

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
