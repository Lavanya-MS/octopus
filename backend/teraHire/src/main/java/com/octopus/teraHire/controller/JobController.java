package com.octopus.teraHire.controller;

import com.octopus.teraHire.model.Job;
import com.octopus.teraHire.service.JobService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/api/job")
@CrossOrigin(origins = {"*"})
@SecurityRequirement(name = "user-authenticate")
public class JobController {
    private JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }
    @GetMapping("/list")
    @CrossOrigin(origins = "http://localhost:4200")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_IN','ROLE_USER','ROLE_HM','ROLE_HR')")
    public List<Job> getallJobs(){
        return jobService.getJobList();
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_HM')")
    @PostMapping("/new")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity addNewJob(@RequestBody @Valid Job job){
        return jobService.addNewJob(job);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_IN','ROLE_HM','ROLE_HR')")
    @PutMapping("/update/{id}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<Job> updateJob(@PathVariable Long id, @RequestBody Job job){
        return jobService.updateJob(id,job);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_HM')")
    @DeleteMapping(value = "delete/{id}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity deleteJob(@PathVariable Long id){
        return jobService.deleteJobById(id);
    }

}