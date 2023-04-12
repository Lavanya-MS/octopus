package com.octopus.teraHire.repository;

import com.octopus.teraHire.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface JobRepository extends JpaRepository <Job, Long>{
    boolean existsById(Long id);



}