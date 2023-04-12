package com.octopus.teraHire.controller;

import com.octopus.teraHire.model.Candidate;
import com.octopus.teraHire.model.User;
import com.octopus.teraHire.service.CandidateService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/api/candidate")
@SecurityRequirement(name = "user-authenticate")
public class CandidateController {
    private CandidateService candidateService;
    public CandidateController(CandidateService candidateService){
        this.candidateService=candidateService;
    }

    //AddCandidate
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_HR')")
    @PostMapping("/new")
    public ResponseEntity<Candidate> addCandidate(@RequestBody @Valid Candidate candidate){
        return candidateService.addCandidate(candidate);
    }
    //UpdateCandidate
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_IN','ROLE_HR')")
    @PutMapping("/update/{id}")
    public ResponseEntity<Candidate> updateCandidate(@PathVariable long id,@RequestBody Candidate candidateDetails){
        return candidateService.updateCandidate(id,candidateDetails);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_HM','ROLE_IN','ROLE_HR')")
    @GetMapping(value = "/list")
    public List<Candidate> getCandidateList(){
        return candidateService.getCandidateList();
    }


    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_HM','ROLE_IN','ROLE_HR')")
    @GetMapping(value = "/{status}")
    public ResponseEntity<List<Candidate>> getCandidateByStatus(@PathVariable("status") String status){
        return candidateService.getCandidatesByStatus(status);
    }



    @DeleteMapping (value="delete/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_HR')")
    public ResponseEntity<User> deleteCandidate(@PathVariable long id){
        return candidateService.deleteCandidateById(id);

    }

}

