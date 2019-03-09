import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import DashBoard from "./components/DashBoard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap-grid.min.css"
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <DashBoard />
      </div>
    );
  }
}

export default App;
