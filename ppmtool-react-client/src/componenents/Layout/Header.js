import React, { Component } from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logout} from "../../actions/securityActions";

class Header extends Component {
    //display sth when login, otherwise display other thing when logout

    logout(){
        this.props.logout();
        window.location.href = "/";
    }
    render() {
        const {validToken, user} = this.props.security;
        const userIsNotAuthenticated = (
            <div className="collapse navbar-collapse" id="mobile-nav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">
                            sign up
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">
                            login
                        </Link>
                    </li>
                </ul>
            </div>



        );


        const userIsAuthenticated = (
            <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">
                        Dashboard
                    </Link>
                </li>
            </ul>

            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to="/dashboard" className = "nav-link">
                        <i className="fas fa-user-circle mr-1" />{user.fullName}
                    </Link>

                </li>
                <li className="nav-item">
                    <Link to="/logout" className = "nav-link" onClick={this.logout.bind(this)}>
                        logout

                    </Link>
                </li>
            </ul>
        </div>
        );
        let headerLinks;
        if(validToken && user){
            headerLinks = userIsAuthenticated;
        }
        else{
            headerLinks = userIsNotAuthenticated;
        }
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        Personal Project Management Tool
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#mobile-nav"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    {headerLinks}


                </div>
            </nav>
        );
    }
}
Header.propTypes = {
    logout: PropTypes.func.isRequired,
    //we don;t want to see login screen if we already logged in
    security: PropTypes.object.isRequired,
    // errors: PropTypes.object.isRequired
};
const mapStateToProps = state =>({
    // step 1 for error show up in form, prevent insert by backend

    security:state.security,

});

export default connect(mapStateToProps, {logout})(Header);