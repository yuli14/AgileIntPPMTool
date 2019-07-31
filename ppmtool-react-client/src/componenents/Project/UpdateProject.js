import React, {Component} from 'react';
import {createProject, getProject} from "../../actions/projectActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classnames from "classnames";

class UpdateProject extends Component {
    //need to get state at first place. fetch the project
    //need to write onchange function
    //need to add onSubmit
    constructor(){
        super();

        this.state = {
            id: "",
            projectName:"",
            projectIdentifier:"",
            description:"",
            start_date:"",
            end_date:"",
            errors:{},
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps, nextContext) {
    //    receive from next props
        if(nextProps.errors){
            this.setState({
                errors:nextProps.errors
            })
        }
        const {
            id,
            projectName,
            projectIdentifier,
            description,
            start_date,
            end_date,
        }=nextProps.project;
        this.setState({
            id,
            projectName,
            projectIdentifier,
            description,
            start_date,
            end_date,
        })
    }

    componentDidMount() {
        //how do I get the id?
        const {id} = this.props.match.params;
        //why not this.props.match.params.id
        this.props.getProject(id, this.props.history);
    }

    onChange(e){
        //to replace this.setState({
        // projectName: value
        // ...
        // })
        this.setState({ [e.target.name]: e.target.value });
        // console.log(e.target)
    }
    onSubmit(e){
        e.preventDefault();
        const updateProject={
            id: this.state.id,
            projectName:this.state.projectName,
            projectIdentifier:this.state.projectIdentifier,
            description:this.state.description,
            start_date:this.state.start_date,
            end_date:this.state.start_date,
        };
        // console.log(newProject);
        this.props.createProject(updateProject, this.props.history)
    }

    render() {
        const {errors} = this.state;
        return (
            <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Create / Edit Project form</h5>
                            <hr/>
                            <form onSubmit= {this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" className={classnames("form-control form-control-lg",
                                        {
                                            "is-invalid":errors.projectName
                                        })}
                                           placeholder="Project Name"
                                    name="projectName"
                                    value={this.state.projectName}
                                    onChange={this.onChange}/>
                                    {errors.projectName && (
                                        <div className="is-invalid">{errors.projectName}
                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <input type="text" className={classnames("form-control form-control-lg",
                                        {
                                            "is-invalid":errors.projectIdentifier
                                        })}
                                           placeholder="Unique Project ID"
                                           name="projectIdentifier"
                                           value={this.state.projectIdentifier}
                                           onChange={this.onChange}
                                           disabled/>
                                    {errors.projectIdentifier && (
                                        <div className="is-invalid">{errors.projectIdentifier}
                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <textarea className={classnames("form-control form-control-lg",
                                        {
                                            "is-invalid":errors.description
                                        })}
                                              placeholder="Project Description"
                                              name="description"
                                              value={this.state.description}
                                              onChange={this.onChange}
                                    />
                                    {errors.description && (
                                        <div className="is-invalid">{errors.description}
                                        </div>
                                    )}
                                </div>

                                <h6>Start Date</h6>
                                <div className="form-group">
                                    <input type="date" className={classnames("form-control form-control-lg",
                                        {
                                            "is-invalid":errors.start_date
                                        })}  name="start_date"
                                    value={this.state.start_date}
                                   onChange={this.onChange}/>
                                    {errors.start_date && (
                                        <div className="is-invalid">{errors.start_date}
                                        </div>
                                    )}
                                </div>

                                <h6>Estimated End Date</h6>
                                <div className="form-group">
                                    <input type="date"
                                           className={classnames("form-control form-control-lg",
                                        {
                                            "is-invalid":errors.end_date
                                        })}
                                           name="end_date"
                                    value={this.state.end_date}
                                   onChange={this.onChange}/>
                                    {errors.end_date && (
                                        <div className="is-invalid">{errors.end_date}
                                        </div>
                                    )}
                                </div>

                                <input type="submit" className="btn btn-primary btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
UpdateProject.propTypes = {
    getProject: PropTypes.func.isRequired,
    //must be here
    createProject:PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
};
const mapStateToProps = state =>({
    // step 1 for error show up in form, prevent insert by backend
    project: state.projects.project,
    errors:state.errors
});
export default connect(mapStateToProps, {createProject, getProject})(UpdateProject);