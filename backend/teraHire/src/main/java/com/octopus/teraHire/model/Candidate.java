package com.octopus.teraHire.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "candidate_table")
public class Candidate {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "email")
    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "gender")
    private String gender;

    @Column(name = "score")
    private String score;

    @Column(name = "dob")
    private String dob;

    @Column(name = "address")
    private String address;

    @Column(name = "country")
    private String country;

    @Column(name = "city")
    private String city;

    @Column(name = "zipcode")
    private int zipcode;

    @Column(name = "nationality")
    private String nationality;

    @Column(name = "year_of_experience")
    private int yearOfExperience;

    @Column(name = "current_company")
    private String currentCompany;

    @Column(name = "current_position")
    private String currentPosition;

    @Column(name = "current_ctc")
    private String currentCTC;

    @Column(name = "expected_ctc")
    private String expectedCTC;

    @ElementCollection
    @Column(name = "skills")
    private List<String> skills;

    @Column(name = "social_link")
    private String sociaLink;

    @Column(name = "status")
    private String status;



    @ManyToMany(cascade = CascadeType.MERGE,targetEntity = Job.class)
    @JoinColumn(name="fk_job_id",referencedColumnName = "id")
    private List<Job> designation;


    protected Candidate(){}



    public Candidate(long id, String fullName, String email, String phoneNumber, String gender, String score, String dob, String address, String country, String city, int zipcode, String nationality, int yearOfExperience, String currentCompany, String currentPosition, String currentCTC, String expectedCTC, List<String> skills, String sociaLink, String status, List<Job> designation) {
        id = id;
        this.fullName = fullName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.gender = gender;
        this.score = score;
        this.dob = dob;
        this.address = address;
        this.country = country;
        this.city = city;
        this.zipcode = zipcode;
        this.nationality = nationality;
        this.yearOfExperience = yearOfExperience;
        this.currentCompany = currentCompany;
        this.currentPosition = currentPosition;
        this.currentCTC = currentCTC;
        this.expectedCTC = expectedCTC;
        this.skills = skills;
        this.sociaLink = sociaLink;
        this.status = status;
        this.designation = designation;
    }

    public String getScore() {
        return score;
    }

    public void setScore(String score) {
        this.score = score;
    }

    public List<Job> getDesignation() {
        return designation;
    }

    public void setDesignation(List<Job> designation) {
        this.designation = designation;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public int getZipcode() {
        return zipcode;
    }

    public void setZipcode(int zipcode) {
        this.zipcode = zipcode;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public int getYearOfExperience() {
        return yearOfExperience;
    }

    public void setYearOfExperience(int yearOfExperience) {
        this.yearOfExperience = yearOfExperience;
    }

    public String getCurrentCompany() {
        return currentCompany;
    }

    public void setCurrentCompany(String currentCompany) {
        this.currentCompany = currentCompany;
    }

    public String getCurrentPosition() {
        return currentPosition;
    }

    public void setCurrentPosition(String currentPosition) {
        this.currentPosition = currentPosition;
    }

    public String getCurrentCTC() {
        return currentCTC;
    }

    public void setCurrentCTC(String currentCTC) {
        this.currentCTC = currentCTC;
    }

    public String getExpectedCTC() {
        return expectedCTC;
    }

    public void setExpectedCTC(String expectedCTC) {
        this.expectedCTC = expectedCTC;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    public String getSociaLink() {
        return sociaLink;
    }

    public void setSociaLink(String sociaLink) {
        this.sociaLink = sociaLink;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
