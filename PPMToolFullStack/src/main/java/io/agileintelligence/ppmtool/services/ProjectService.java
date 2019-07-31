package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.Backlog;
import io.agileintelligence.ppmtool.domain.Project;
import io.agileintelligence.ppmtool.exceptions.ProjectIdException;
import io.agileintelligence.ppmtool.repositories.BacklogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import io.agileintelligence.ppmtool.repositories.ProjectRepository;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private BacklogRepository backlogRepository;
    public Project saveOrUpdateProject(Project project){
        try {
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
        //Logic here


    }

    public Project findProjectByIdentifier(String projectId){


        Project project =  projectRepository.findByProjectIdentifier(projectId.toUpperCase());

        if(project == null){
            //might be null pointer exception
            //project.getProjectIdentifier().toUpperCase()
            throw new ProjectIdException("Project Id '" + projectId + "' not exist");

        }

        return project;
    }

    public Iterable<Project> findAllProjects(){
        return projectRepository.findAll();
    }

    public void deleteProjectByIdentifier(String projectId){

        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());

        if(project == null){
            throw new ProjectIdException("cannot Project with ID '" + projectId.toUpperCase() + "'. This project not exist");
        }

        projectRepository.delete(project);
    }

}
