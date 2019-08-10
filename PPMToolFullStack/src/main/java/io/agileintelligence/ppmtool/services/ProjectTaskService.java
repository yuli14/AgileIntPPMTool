package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.Backlog;
import io.agileintelligence.ppmtool.domain.Project;
import io.agileintelligence.ppmtool.domain.ProjectTask;
import io.agileintelligence.ppmtool.exceptions.ProjectNotFoundException;
import io.agileintelligence.ppmtool.repositories.BacklogRepository;
import io.agileintelligence.ppmtool.repositories.ProjectRepository;
import io.agileintelligence.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectTaskService {

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private ProjectService projectService;

//    create a method returns project task
    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask, String username){

//        PTs to be added to a specific project != null, which means backlog exists
//        set the backlog to the project task
//        project sequence = project identifier-1 project identifier-2 project identifier-3 ... project identifier-100
//        update the backlog sequence

//        need to handle npe by try catch if there is not a projectIdentifier
//        need errors to be like
//        {
//        "project not found": project not found
//
//
//        }

//        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
        Backlog backlog = projectService.findProjectByIdentifier(projectIdentifier, username).getBacklog();
        projectTask.setBacklog(backlog);
//        take care of project sequence
        Integer BacklogSequence = backlog.getPTSequence();
        BacklogSequence++;
        backlog.setPTSequence(BacklogSequence);
//        Add sequence to project task
        projectTask.setProjectSequence(projectIdentifier + "-" + BacklogSequence);
        projectTask.setProjectIdentifier(projectIdentifier);
        //        INITIAL PRIORITY, LOW, MID, HIGH WHEN PRIORITY IS NULL 3 2 1
        if(projectTask.getPriority() == null || projectTask.getPriority() == 0){
//            need to refactor here
            projectTask.setPriority(3);
        }

//        INITIAL STATUS, in progress, done... when status is null
        if(projectTask.getStatus() == null || projectTask.getStatus().equals("")){
            projectTask.setStatus("TO_DO");

        }
        return projectTaskRepository.save(projectTask);


    }
    public ProjectTask findPTByProjectSequence(String backlog_id,  String pt_id, String username){
//        task exist and is part of the project
//                Backlog backlog = projectService.findProjectByIdentifier(projectIdentifier, username).getBacklog();
        projectService.findProjectByIdentifier(backlog_id, username);
//        Backlog backlog = backlogRepository.findByProjectIdentifier(backlog_id);
//        if (backlog == null){
//            throw new ProjectNotFoundException("Project with ID " + backlog_id + " Not exist");
//        }
        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(pt_id);
        if(projectTask == null){
            throw new ProjectNotFoundException("Project task wit ID " + pt_id + " Not found");
        }

        if(!projectTask.getProjectIdentifier().equals(backlog_id)){
            throw new ProjectNotFoundException("Project Task " + pt_id + "does not exist in project: " + backlog_id);
        }
        return projectTask;
    }

    public Iterable<ProjectTask> findBacklogById(String backlog_id, String username){
        projectService.findProjectByIdentifier(backlog_id, username);

//        Project project = projectRepository.findByProjectIdentifier(backlog_id);
//        if(project == null){
//            throw new ProjectNotFoundException("Project with ID " + backlog_id + " Not exist");
//        }
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(backlog_id);
    }
//    update project task

    public ProjectTask updatebyProjectSequence(ProjectTask updateTask, String backlog_id, String pt_id, String usernanme){
        ProjectTask projectTask = findPTByProjectSequence(backlog_id, pt_id, usernanme);

//        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(updateTask.getProjectSequence());

        projectTask = updateTask;
        return projectTaskRepository.save(projectTask);


    }

    public void deletePTByProjectSequence(String backlog_id, String pt_id, String username){
        ProjectTask projectTask = findPTByProjectSequence(backlog_id, pt_id, username);
//        Backlog backlog = projectTask.getBacklog();
////        JPA relationship
////        what if the list is too long !!!
////        (1) At the project task level
//        List<ProjectTask> pts = backlog.getProjectTaskList();
//        pts.remove(projectTask);
//        backlogRepository.save(backlog);
        projectTaskRepository.delete(projectTask);
    }
//user 1 can not add projecttask 2 to user 2's project
}
