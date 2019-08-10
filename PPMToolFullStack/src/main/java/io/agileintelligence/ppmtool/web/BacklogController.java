package io.agileintelligence.ppmtool.web;

import io.agileintelligence.ppmtool.domain.ProjectTask;
import io.agileintelligence.ppmtool.services.MapValidationErrorService;
import io.agileintelligence.ppmtool.services.ProjectTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/backlog")
//Login deal
@CrossOrigin
public class BacklogController {

    @Autowired
    private ProjectTaskService projectTaskService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

//    actions
    @PostMapping("/{backlog_id}")
//    a valid projectTask
    public ResponseEntity<?> addPTtoBacklog(@Valid @RequestBody ProjectTask projectTask,
                                            BindingResult result, @PathVariable String backlog_id, Principal principal){
//        a validation goes here
//        can be changed to one line code
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null){
            return errorMap;
        }

        ProjectTask projectTask1 = projectTaskService.addProjectTask(backlog_id, projectTask, principal.getName());

        return new ResponseEntity<ProjectTask>(projectTask1, HttpStatus.CREATED);
    }



    @GetMapping("/{backlog_id}")
//    must be the same
    public Iterable<ProjectTask> getProjectBacklog(@PathVariable String backlog_id, Principal principal){
        return projectTaskService.findBacklogById(backlog_id, principal.getName());
    }

    @GetMapping("/{backlog_id}/{pt_id}")

    public ResponseEntity<?>getProjectTask(@PathVariable String backlog_id, @PathVariable String pt_id, Principal principal){

        ProjectTask projectTask = projectTaskService.findPTByProjectSequence(backlog_id, pt_id, principal.getName());
        return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
    }

    @PatchMapping("/{backlog_id}/{pt_id}")

    public ResponseEntity<?>updateProjectTask(@Valid @RequestBody ProjectTask projectTask, BindingResult result,
                                              @PathVariable String backlog_id, @PathVariable String pt_id, Principal principal){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null){
            return errorMap;
        }
        ProjectTask updatedTask = projectTaskService.updatebyProjectSequence(projectTask, backlog_id, pt_id, principal.getName());

        return new ResponseEntity<ProjectTask>(updatedTask, HttpStatus.OK);

    }

    @DeleteMapping("/{backlog_id}/{pt_id}")

    public ResponseEntity<?>deleteProjectTask(@PathVariable String backlog_id, @PathVariable String pt_id, Principal principal){
        projectTaskService.deletePTByProjectSequence(backlog_id, pt_id, principal.getName());

        return new ResponseEntity<String>("Project Task with id " + pt_id + " was deleted" ,HttpStatus.OK);
    }
//    project backlog exist but the pt sequence not exist, or vice versa, or both
}
