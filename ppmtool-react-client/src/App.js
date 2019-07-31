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

class App extends Component{
    render(){
        return(
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Header />
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path="/addProject" component={AddProject} />
                        <Route exact path="/updateProject/:id" component={UpdateProject} />

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
