import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {getBacklogs} from "../../actions/backlogActions";
import PropTypes from "prop-types";
import {connect} from "react-redux"

import Backlog from "./Backlog";
class ProjectBoard extends Component {
    // need constructor to handle errors

    constructor(){
        super();
        this.state = {
            errors:{}
        }
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getBacklogs(id);
    }

    componentWillReceiveProps(nextProps, nextContext) {

        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors,
            })
        }
    }


    render() {


        const {id} = this.props.match.params;
        const {project_tasks} = this.props.backlog;
        const {errors} = this.state;

        let BoardContent;

        const boardAlgorithm = (errors, project_tasks)=>{
            if(project_tasks.length < 1){
                //project Not found
                if(errors.projectNotFound){
                    return (
                        <div className="alert alert-danger text-center" role = "alert"> {errors.projectNotFound}</div>
                    );
                }
                else if(errors.projectIdentifier){
                    return (
                        <div className="alert alert-danger text-center" role = "alert"> {errors.projectIdentifier}</div>
                    );
                }
                else {
                    return(
                        <div className="alert alert-danger text-center" role = "alert">
                            No Project Tasks on this board
                        </div>
                    );
                }
            }
            else{
                return <Backlog project_tasks_prop = {project_tasks}/>;
            }
        };

        BoardContent = boardAlgorithm(errors, project_tasks);
        return (

            <div className="container">
                <Link to={`/addProjectTask/${id}`} href="#" className ="btn btn-primary mb-3">
                    <i className="fas fa-plus-circle"> Create Project Task</i>
                </Link>



                <br/>
                <hr/>
                {BoardContent}{

            }
                    {/*must be the same project_tasks_prop*/}

            </div>


        );
    }
}
ProjectBoard.propTypes = {
    getBacklogs: PropTypes.func.isRequired,
    backlog: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,

};

const mapStateToProps = state =>({
    //so we have project right now
    backlog:state.backlog,
    errors:state.errors
});

export default connect(mapStateToProps, {getBacklogs}) (ProjectBoard);