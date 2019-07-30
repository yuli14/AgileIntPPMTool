package io.agileintelligence.ppmtool.exceptions;

public class ProjectNotFoundResponse {

    private String ProjectNotFound;

    public String getProjectNotFound() {
        return ProjectNotFound;
    }

    public ProjectNotFoundResponse(String projectNotFound) {
        ProjectNotFound = projectNotFound;
    }

    public void setProjectNotFound(String projectNotFound) {
        ProjectNotFound = projectNotFound;
    }
}
