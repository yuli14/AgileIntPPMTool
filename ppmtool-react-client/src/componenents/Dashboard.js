import React, {Component} from 'react';

import ProjectItem from "./Project/ProjectItem";
import CreateProjectButton from "./Project/CreateProjectButton";
import {connect} from"react-redux";
import {getProjects} from "../actions/projectActions";
import PropTypes from "prop-types"
class Dashboard extends Component {
    //life cycle hook to get projects
    //mount conponent
    componentDidMount() {
        //update props by getting it from database
        this.props.getProjects();
    }


    render() {
        //test pass props to projectItem
        // const projectObject = {
        //   projectName:"testProjectname props",
        //   projectIdentifier:"tep",
        //   description:"testDescription props",
        // };
        //need to get projects list
        const projectList = this.props.project.projects;
        return (
        //   link to
            <div className="projects">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Projects</h1>
                            <br />
                            <CreateProjectButton />
                            <br />
                            <hr />
                            {/*child componenet, we can pass props from parent componenet*/}
                            {/*go to projectItem and extract this item*/}
                            {/*need to traverse projects*/}
                            {/*use a map function */}
                            {projectList.map(project =>(
                                <ProjectItem key={project.id} project={project}/>
                            ))
                            }

                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
Dashboard.propTypes = {
    //if we comment it, the state will be none in browser react connect state empty object
    project: PropTypes.object.isRequired,
    getProjects: PropTypes.func.isRequired
};

//connect componenet to store
const mapStateToProps = state =>({
    //so we have project right now
    project:state.projects
});

export default connect(mapStateToProps, {getProjects}) (Dashboard);