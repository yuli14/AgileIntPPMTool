import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
//why we import here? rather than
import {connect} from "react-redux";
import {deleteProject} from "../../actions/projectActions";

class ProjectItem extends Component{

    onDeleteClick = id =>{
        //function is a prop!!!
        this.props.deleteProject(id);
    };
    render() {
        //get from parent componenet
        const {project} = this.props;

        return (
            <div className="container">
                <div className="card card-body bg-light mb-3">
                    <div className="row">
                        <div className="col-2">
                            <span className="mx-auto">{project.projectIdentifier}</span>
                        </div>
                        <div className="col-lg-6 col-md-4 col-8">
                            <h3>{project.projectName}</h3>
                            <p>{project.description}</p>
                        </div>
                        <div className="col-md-4 d-none d-lg-block">
                            <ul className="list-group">
                                <Link to={`/projectBoard/${project.projectIdentifier}`}>
                                    <li className="list-group-item board">
                                        <i className="fa fa-flag-checkered pr-1"> Project Board </i>
                                    </li>
                                </Link>
                                {/*`` $*/}
                                <Link to={`/updateProject/${project.projectIdentifier}`}>
                                    <li className="list-group-item update">
                                        <i className="fa fa-edit pr-1"> Update Project Info</i>
                                    </li>
                                </Link>

                                    {/*just need a function to delete*/}
                                    <li className="list-group-item delete" onClick={this.onDeleteClick.bind(this, project.projectIdentifier)}>
                                        <i className="fa fa-minus-circle pr-1"> Delete Project</i>
                                    </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
ProjectItem.propTypes = {
    deleteProject: PropTypes.func.isRequired,
    //step2, next to receive state from
    //use life cycle hooks didmount

};

// const mapStateToProps = state =>({
//     // step 1 for error show up in form, prevent insert by backend
//     errors: state.errors,
// });
export default connect(null, {deleteProject}) (ProjectItem);