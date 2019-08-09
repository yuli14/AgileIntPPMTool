import React, {Component} from 'react';
import ProjectTask from "./ProjectTasks/ProjectTask";


class Backlog extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         projectTasks:[],
    //     }
    // }
    render() {

        const { project_tasks_prop } = this.props;
        //organize by status
        const tasks = project_tasks_prop.map(project_task => (
            <ProjectTask key={project_task.id} project_task={project_task} />
        ));

        let inProgressItems = [];
        let todoItem = [];
        let doneItem = [];
        for(let i = 0; i< tasks.length; i++){
            // console.log(tasks[i].props.project_task)
            if(tasks[i].props.project_task.status === "TO_DO"){
                todoItem.push(tasks[i])
            }
            else if(tasks[i].props.project_task.status === "IN_PROGRESS"){
                inProgressItems.push(tasks[i])
            }
            else if(tasks[i].props.project_task.status === "DONE"){
                doneItem.push(tasks[i])
            }

        }
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card text-center mb-2">
                                <div className="card-header bg-secondary text-white">
                                    <h3>TO DO</h3>
                                </div>
                            </div>

                            {todoItem}{

                            }


                    </div>
                        <div className="col-md-4">
                            <div className="card text-center mb-2">
                                <div className="card-header bg-primary text-white">
                                    <h3>In Progress</h3>
                                </div>
                            </div>
                            {inProgressItems}{

                        }


                        </div>
                        <div className="col-md-4">
                            <div className="card text-center mb-2">
                                <div className="card-header bg-success text-white">
                                    <h3>Done</h3>
                                </div>
                            </div>
                            {doneItem}{



                                //    javascript expression sample project task starts here, sample ends here
                            }
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

// Backlog.propTypes = {
//     getProjectTasks: PropTypes.func.isRequired,
//     projectTasks: PropTypes.object.isRequired,
//
// };
//
// const mapStateToProps = state =>({
//     //so we have project right now
//     projectTasks:state.projectTasks
// });
export default Backlog;