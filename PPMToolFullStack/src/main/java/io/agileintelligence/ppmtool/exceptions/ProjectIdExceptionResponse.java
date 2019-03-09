package io.agileintelligence.ppmtool.exceptions;

public class ProjectIdExceptionResponse {

    private String projectIdentifier;

    public ProjectIdExceptionResponse(String projectIdentifier){
        this.projectIdentifier = projectIdentifier;
    }

    public String getProjectIdentifier(){
        return this.projectIdentifier;
    }

    public void setProjectIdentifier(String ProjectIdentifier){
        this.projectIdentifier = ProjectIdentifier;
    }

}
