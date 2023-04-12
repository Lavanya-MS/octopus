import { Component, OnInit } from '@angular/core';
import { Candidate } from 'src/app/models/candidate';
import { Job } from 'src/app/models/job';
import { user } from 'src/app/models/user.model';
import { AuthService } from 'src/app/service/auth.service';
import { CandidateService } from 'src/app/service/candidate.service';
import { JobService } from 'src/app/service/job.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private jobService:JobService,private candidateService:CandidateService,private authService:AuthService,private userService:UserService) { }
  jobList!:Job[];
  candidateList!:Candidate[];

  currentUser!:user;

  ngOnInit(): void {
    this.getCurrentUser();
    this.getJobs();
    this.getCandidates();
    this.authService.getServerStatus();
    
  }

  getFlooredValue(v){
    return Math.floor(v)
  }
  getCurrentUser(){
    
    const authUser = JSON.parse(this.authService.currentUserValue())
    this.userService.getUserByEmail(authUser.username).subscribe(data=>{
      this.currentUser =  data;
    })

  }
  getJobs(){
    this.jobService.getJobList().subscribe(data=>{
      //console.log(data)
      this.jobList = data;
      this.jobList.slice(4)
    })
  }

  getCandidates(){
    this.candidateService.getCandidateList().subscribe(data=>{
      this.candidateList = data.reverse();
    })
  }

  ngOnDestroy(){
    
  }
  
}