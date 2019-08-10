package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.Backlog;
import io.agileintelligence.ppmtool.domain.Project;
import io.agileintelligence.ppmtool.domain.User;
import io.agileintelligence.ppmtool.exceptions.ProjectIdException;
import io.agileintelligence.ppmtool.exceptions.ProjectNotFoundException;
import io.agileintelligence.ppmtool.repositories.BacklogRepository;
import io.agileintelligence.ppmtool.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import io.agileintelligence.ppmtool.repositories.ProjectRepository;

import java.security.Principal;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private UserRepository userRepository;
    public Project saveOrUpdateProject(Project project,  String username){
//
// to avoid update the project by other users login with knowledge of projectID
        if(project.getId() != null){

            Project existingProject = projectRepository.findByProjectIdentifier(project.getProjectIdentifier());//?...

            if(existingProject != null &&(!existingProject.getProjectLeader().equals(username))){
//                not the owner of it
                throw new ProjectNotFoundException("Project not found in your account");
            }
            else if(existingProject == null){
//
                throw new ProjectNotFoundException("Project with ID " + project.getProjectIdentifier() + " can not be updated because it doesn't exits");
            }
        }

        try {
// can not user findProjectByIdentifier because it will be null if it's creating a new project
//            project.getID == null
//            find by db id? null
            User user = userRepository.findByUsername(username);
            project.setUser(user);
            project.setProjectLeader(user.getUsername());
            String projectIdentifier = project.getProjectIdentifier().toUpperCase();
            project.setProjectIdentifier(projectIdentifier);

//            do not instantiate here Backlog backlog = new Backlog(); because the project Id CAN BE NULL when first created
            if(project.getId() == null){
                Backlog backlog = new Backlog();
                project.setBacklog(backlog);
                backlog.setProject(project);
                backlog.setProjectIdentifier(projectIdentifier);

            }
            if(project.getId() != null){

//                get backlog by id
                project.setBacklog(backlogRepository.findByProjectIdentifier(projectIdentifier));
            }
            return projectRepository.save(project);
        }
        catch (Exception e){
            throw new ProjectIdException("Project Id '" + project.getProjectIdentifier().toUpperCase() + "' already exist");
        }


    }

    public Project findProjectByIdentifier(String projectId, String username){


        Project project =  projectRepository.findByProjectIdentifier(projectId.toUpperCase());

        if(project == null){
            //might be null pointer exception
            //project.getProjectIdentifier().toUpperCase()
            throw new ProjectIdException("Project Id '" + projectId + "' not exist");

        }
//        why not principal.getuser here?
        if(!project.getProjectLeader().equals(username)){
            throw new ProjectNotFoundException("Project not found in your account");
        }

        return project;
    }

    public Iterable<Project> findAllProjects(String username){
        return projectRepository.findAllByProjectLeader(username);
    }

    public void deleteProjectByIdentifier(String projectId, String username){

        projectRepository.delete(findProjectByIdentifier(projectId, username));
    }

//    right id eg: 4 not 64444, can not pass it



}
