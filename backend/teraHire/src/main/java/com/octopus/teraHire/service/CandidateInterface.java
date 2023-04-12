package com.octopus.teraHire.service;

import com.octopus.teraHire.model.Candidate;
import com.octopus.teraHire.model.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CandidateInterface {
    ResponseEntity<Candidate> addCandidate(Candidate candidate);
    ResponseEntity<Candidate> updateCandidate(long id, Candidate candidateDetails);
    List<Candidate> getCandidateList();
    ResponseEntity deleteCandidateById(long id);

    ResponseEntity getCandidatesByJobAndStatus(String jobTitle,String status);




}
