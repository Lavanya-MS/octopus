package com.octopus.teraHire.model;

import org.aspectj.weaver.ast.Not;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;


@Entity
@Table(name = "job_table")
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long Id;
    @Column(name="title")
    private String title;
    @Column(name="owner")
    private String owner;
    @ElementCollection
    @Column(name="stage")
    private List<String> stage;
    @Column(name="status")
    private String status;
    @Column(name="active_candidates")
    private int activeCandidates;
    @Column(name="dropped_candidates")
    private int droppedCandidates;
    @Column(name="vacancy")
    private int vacancy;
    @Column(name="summary")
    private String summary;
    @Column(name="team_id")
    private String teamID;
    @Column(name="end_date")
    private String endDate;
    @Column(name = "created_date")
    private LocalDateTime createdDate;
    @Column(name = "modified_date")
    private LocalDateTime modifiedDate;



    @OneToOne(targetEntity = Notification.class,cascade = CascadeType.ALL)
    @JoinColumn(name = "notification_fk_id",referencedColumnName = "id")
    private Notification notification;
    /*@ManyToOne*/
    /*private Candidate candidate;*/

    public Job() {
    }

    public Job(long id, String title, String owner,List<String> stage, String status, int activeCandidates, int droppedCandidates, int vacancy, String summary, String teamID, String endDate, LocalDateTime createdDate, LocalDateTime modifiedDate, Notification notification) {

        Id = id;
        this.title = title;
        this.owner = owner;
        this.stage = stage;
        this.status = status;
        this.activeCandidates = activeCandidates;
        this.droppedCandidates = droppedCandidates;
        this.vacancy = vacancy;
        this.summary = summary;
        this.teamID = teamID;
        this.endDate = endDate;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.notification = notification;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDateTime getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(LocalDateTime modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public Notification getNotification() {
        return notification;
    }


    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public void setNotification(Notification notification) {
        this.notification = notification;
    }

    public long getId() {
        return Id;
    }

    public void setId(long id) {
        this.Id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public List<String> getStage() {
        return stage;
    }

    public void setStage(List<String> stage) {
        this.stage = stage;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getActiveCandidates() {
        return activeCandidates;
    }

    public void setActiveCandidates(int activeCandidates) {
        this.activeCandidates = activeCandidates;
    }

    public int getDroppedCandidates() {
        return droppedCandidates;
    }

    public void setDroppedCandidates(int droppedCandidates) {
        this.droppedCandidates = droppedCandidates;
    }

    public int getVacancy() {
        return vacancy;
    }

    public void setVacancy(int totalNoOfCandidates) {
        vacancy = totalNoOfCandidates;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getTeamID() {
        return teamID;
    }

    public void setTeamID(String teamID) {
        this.teamID = teamID;
    }


}