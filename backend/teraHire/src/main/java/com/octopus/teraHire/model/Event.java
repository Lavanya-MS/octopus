package com.octopus.teraHire.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "event_table")
@SecondaryTables({@SecondaryTable(name = "candidate_table"),@SecondaryTable(name = "user_table"),
@SecondaryTable(name = "job_table")})
/*@Setter
@Getter*/
/*@AllArgsConstructor
@NoArgsConstructor*/
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "start_date")
    String start;
    @Column(name = "end_date")
    String end;
    @Column(name = "created_date")
    LocalDateTime created;
    @Column(name = "modified_date")
    LocalDateTime modified;
    @Column(name = "type")
    private String type;
    @Column(name="creator")
    private long organizer_id;
    @OneToOne(cascade = CascadeType.MERGE,targetEntity = Job.class)
    @JoinColumn(name="fk_job_id",referencedColumnName = "id")
    private Job job;

    @ManyToMany(cascade = { CascadeType.MERGE},targetEntity = User.class)
    @JoinColumn(name = "fk_team_id",referencedColumnName = "id")
    private List<User> team_members = new ArrayList<>();


    @ManyToMany(targetEntity = Candidate.class,cascade = CascadeType.MERGE)
    @JoinColumn(name="fk_candidate_id",referencedColumnName = "id")
    private List<Candidate> candidates;



    public Event(){}


    public Event(long id, String start, String end, LocalDateTime created, LocalDateTime modified, String type, long organizer_id, Job job, List<User> team_members, List<Candidate> candidates) {

        this.id = id;
        this.start = start;
        this.end = end;
        this.created = created;
        this.modified = modified;
        this.type = type;
        this.organizer_id = organizer_id;
        this.job = job;

        this.team_members = team_members;
        this.candidates = candidates;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getEnd() {
        return end;
    }

    public void setEnd(String end) {
        this.end = end;
    }

    public LocalDateTime getCreated() {
        return created;
    }


    public List<Candidate> getCandidates() {
        return candidates;
    }

    public void setCandidates(List<Candidate> candidates) {
        this.candidates = candidates;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }

    public LocalDateTime getModified() {
        return modified;
    }

    public void setModified(LocalDateTime modified) {
        this.modified = modified;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public long getOrganizer_id() {
        return organizer_id;
    }

    public void setOrganizer_id(long organizer_id) {
        this.organizer_id = organizer_id;
    }

    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job= job;
    }

    public List<Candidate> getCandidate() {
        return candidates;
    }

    public void setCandidate(List<Candidate> candidate) {
        this.candidates = candidate;
    }

    public List<User> getTeam_members() {
        return team_members;
    }

    public void setTeam_members(List<User> team_members) {
        this.team_members = team_members;
    }
}
