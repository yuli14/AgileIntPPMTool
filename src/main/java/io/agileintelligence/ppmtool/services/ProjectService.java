package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.Project;
import io.agileintelligence.ppmtool.exceptions.ProjectIdException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import io.agileintelligence.ppmtool.repositories.ProjectRepository;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    public Project saveOrUpdateProject(Project project){
        try {

            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
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

}
