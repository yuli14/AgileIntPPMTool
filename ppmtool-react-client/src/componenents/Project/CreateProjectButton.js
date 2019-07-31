
import { Link } from "react-router-dom";

import React, {Component} from 'react';
import PropTypes from 'prop-types';

class CreateProjectButton extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/addProject" className="btn btn-lg btn-info">
                    Create a Project
                </Link>
            </React.Fragment>
        );
    }
}

CreateProjectButton.propTypes = {};

export default CreateProjectButton;