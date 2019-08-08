import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {getBacklogs} from "../../actions/backlogActions";
import PropTypes from "prop-types";
import {connect} from "react-redux"

import Backlog from "./Backlog";
class ProjectBoard extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         backlog:[],
    //
    //     }
    //
    // }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getBacklogs(id);
    }


    render() {
        const {id} = this.props.match.params;
        const {project_tasks} = this.props.backlog;
        console.log(project_tasks);
        return (

            <div className="container">
                <Link to={`/addProjectTask/${id}`} href="#" className ="btn btn-primary mb-3">
                    <i className="fas fa-plus-circle"> Create Project Task</i>
                </Link>
                <br/>
                <hr/>
                    {/*must be the same project_tasks_prop*/}
                    <Backlog project_tasks_prop = {project_tasks}/>
            </div>


        );
    }
}
ProjectBoard.propTypes = {
    getBacklogs: PropTypes.func.isRequired,
    backlog: PropTypes.object.isRequired,

};

const mapStateToProps = state =>({
    //so we have project right now
    backlog:state.backlog
});

export default connect(mapStateToProps, {getBacklogs}) (ProjectBoard);