import React, {Component} from 'react';
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {createProject} from "../../actions/projectActions"
import classnames from "classnames"
class AddProject extends Component {
    constructor(){
        //props?
        super();
    //    give a initial state
    //    state is immutatable, need a onchange function
        this.state={
            projectName:"",
            projectIdentifier:"",
            description:"",
            start_date:"",
            end_date:"",
            errors:{},
        };
        //to replace onChange={this.onChange.bind(this)} in html div
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    //life cycle hooks
    componentWillReceiveProps(nextProps, nextContext) {
        //step 3
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }

    onChange(e){
        //to replace this.setState({
        // projectName: value
        // ...
        // })
        this.setState({ [e.target.name]: e.target.value });
        console.log(e.target)
    }
    onSubmit(e){
        e.preventDefault();
        const newProject={
            projectName:this.state.projectName,
            projectIdentifier:this.state.projectIdentifier,
            description:this.state.description,
            start_date:this.state.start_date,
            end_date:this.state.start_date,
        };
        // console.log(newProject);
        this.props.createProject(newProject, this.props.history)
    }
    render() {
        const {errors} = this.state;
        return (

            <div className="project">
                {/*        //Objects are not valid as a React child (found: object with keys {}). If you meant to render a collection of children, use an array instead.
*/}
                {/*need to be errors.projectName not errors*/}

                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Create / Edit Project form</h5>
                            <hr/>
                            <form onSubmit= {this.onSubmit}>
                                <div className="form-group">
                                    {/*conditional render*/}
                                    <input type="text" className={classnames("form-control form-control-lg", {
                                        "is-invalid":errors.projectName
                                    })}
                                           placeholder="Project Name" name="projectName" value={this.state.projectName}
                                    onChange={this.onChange}/>
                                    {errors.projectName && (
                                        <div className= "invalid-feedback">{errors.projectName}

                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input type="text" className={classnames("form-control form-control-lg", {
                                        "is-invalid":errors.projectIdentifier
                                    })}
                                           placeholder="Unique Project ID"
                                           name="projectIdentifier"
                                           value={this.state.projectIdentifier}
                                           onChange={this.onChange}/>
                                    {errors.projectIdentifier && (
                                        <div className= "invalid-feedback">{errors.projectIdentifier}

                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <textarea className={classnames("form-control form-control-lg",{
                                    "is-invalid": errors.description
                                    })}
                                      placeholder="Project Description"
                                      name="description"
                                      value={this.state.description}
                                      onChange={this.onChange}/>
                                    {/*  it's a if else */}
                                    {errors.description && (
                                        <div className= "invalid-feedback">{errors.description}

                                        </div>
                                    )}
                                </div>
                                <h6>Start Date</h6>
                                <div className="form-group">
                                    <input type="date"
                                           className={classnames("form-control form-control-lg", {
                                               "is-invalid": errors.start_date
                                           })}
                                           name="start_date"
                                           value={this.state.start_date}
                                           onChange={this.onChange}/>
                                    {errors.start_date && (
                                        <div className= "invalid-feedback">{errors.start_date}

                                        </div>
                                    )}
                                </div>
                                <p>{errors.start_date}</p>
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

                                {/*    onChange={this.onChange.bind(this)}*/}
                                </div>
                                <p>{errors.end_date}</p>

                                <input type="submit" className="btn btn-primary btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
AddProject.propTypes = {
    createProject: PropTypes.func.isRequired,
    //step2, next to receive state from
    //use life cycle hooks didmount
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state =>({
   // step 1 for error show up in form, prevent insert by backend
   errors: state.errors,
});
//STEP 4
//IF IT'S NULL, THEM {/*Failed prop type: The prop `errors` is marked as required in `AddProject`, but its value is `undefined`.*/}
export default connect(mapStateToProps, {createProject})(AddProject);