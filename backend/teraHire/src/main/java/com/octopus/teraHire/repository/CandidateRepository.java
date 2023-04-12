package com.octopus.teraHire.repository;

import com.octopus.teraHire.model.Candidate;
import com.octopus.teraHire.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {
    List<Candidate> findByDesignation_TitleAndStatus(String title, String status);
    List<Candidate> findByDesignationAndStatus(Job designation, String status);
    @Query("select c from Candidate c where c.status like ?1")
    List<Candidate> findByStatusLike(String status);
    boolean existsByEmail(String email);
    /*List<Candidate> findCandidatesByEventId(long eventId);*/

}
