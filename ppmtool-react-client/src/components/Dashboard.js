import React, {Component} from 'react';
import ProjectItem from "./Project/ProjectItem";
import CreateProjectButton from "./Project/CreateProjectButton";
import {connect} from "react-redux";
import {getProjects} from "../actions/projectActions";
import PropTypes from "prop-types";

class Dashboard extends Component {
    componentDidMount() {
        this.props.getProjects();
    }


    render() {
        //get projectlists from states
        const {projects} = this.props.project;
        return (
            <div className="projects">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Projects</h1>
                            <br/>
                            <CreateProjectButton/>
                            <br/>
                            <hr/>
                            {projects.map(project =>(
                                <ProjectItem key = {project.id} project = {project}/>
                            ))
                            }
                            {/*map function */}
                            {/*<ProjectItem project = {projectObject}/>*/}

                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

Dashboard.propTypes = {
    project: PropTypes.object.isRequired,
    getProjects: PropTypes.func.isRequired
};

const mapStateToProps = state =>({
    project:state.project

});
//mapStateToProps rather than mapStateToProps()
export default connect(mapStateToProps, {getProjects})(Dashboard);