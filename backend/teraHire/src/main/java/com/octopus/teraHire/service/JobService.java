package com.octopus.teraHire.service;

import com.octopus.teraHire.exception.ResourceNotFoundException;
import com.octopus.teraHire.exception.UserExistsException;
import com.octopus.teraHire.model.Job;
import com.octopus.teraHire.repository.JobRepository;
import com.octopus.teraHire.repository.UserRepository;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.Date;
import java.util.List;


@Service
public class JobService implements JobInterface{
    private JobRepository jobRepository;

    public boolean isJobValid(Long id){
        return jobRepository.existsById(id);
    }
    public JobService(JobRepository jobRepository,
                      UserRepository userRepository) {
        this.jobRepository = jobRepository;
    }

    public LocalDateTime getDate(){
        //DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        return now;
    }
    public LocalDate getDateOnly(){
        LocalDate now = LocalDate.now();
        return now;
    }

    @Override
    public List<Job> getJobList(){
        jobRepository.findAll().stream()
                .forEach(job -> {
                    //SimpleDateFormat formattter = new SimpleDateFormat("yyyy-mm-dd");
                    LocalDate date = LocalDate.parse(job.getEndDate());
                    boolean isExpired = !(Period.between(date,getDateOnly()).isNegative());
                    if(isExpired && !job.getStatus().equals("Expired")){
                        job.setModifiedDate(getDate());
                        job.setStatus("Expired");
                        jobRepository.save(job);
                    }
                    else if(!job.getStatus().equals("Active") && !isExpired){
                        job.setModifiedDate(getDate());
                        job.setStatus("Active");
                        jobRepository.save(job);
                    }else{

                    }
                });
        return jobRepository.findAll();
    }


    @Override
    @Transactional
    public ResponseEntity addNewJob(Job job){
        job.setCreatedDate(getDate());
        job.setModifiedDate(getDate());
        job.getNotification().setCreatedDate(getDate());
        job.getNotification().setModifiedDate(getDate());
        return new ResponseEntity<Job>(jobRepository.save(job), HttpStatus.OK);
    }
    @Override
    public ResponseEntity deleteJobById(Long id){
        if(jobRepository.existsById(id)){
            jobRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(new ResourceNotFoundException("Job not found with id:"+id).getMessage(),HttpStatus.NOT_FOUND);
        }
    }
    @Override
    public ResponseEntity updateJob(Long id, Job job){
        Job updatedJobDetails = jobRepository.getReferenceById(id);
        if(jobRepository.existsById(id)){
            updatedJobDetails.setTitle((job.getTitle()));
            updatedJobDetails.setOwner((job.getOwner()));
            updatedJobDetails.setStage((job.getStage()));
            updatedJobDetails.setStatus((job.getStatus()));
            updatedJobDetails.setActiveCandidates((job.getActiveCandidates()));
            updatedJobDetails.setDroppedCandidates((job.getDroppedCandidates()));
            updatedJobDetails.setVacancy((job.getVacancy()));
            updatedJobDetails.setSummary((job.getSummary()));
            updatedJobDetails.setTeamID((job.getTeamID()));
            updatedJobDetails.setEndDate(job.getEndDate());
            return new ResponseEntity<>(jobRepository.save(updatedJobDetails),HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(new ResourceNotFoundException("Job does not exist with id:"+id).getMessage(),HttpStatus.NOT_FOUND);
        }
    }



}