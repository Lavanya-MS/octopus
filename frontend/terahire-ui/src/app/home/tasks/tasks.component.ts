import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Candidate } from 'src/app/models/candidate';
import { Job } from 'src/app/models/job';
import { AuthService } from 'src/app/service/auth.service';
import { CandidateService } from 'src/app/service/candidate.service';
import { JobService } from 'src/app/service/job.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor(private authService:AuthService,private jobService:JobService,private candidateService:CandidateService) { }

  userType!:string;
  
  @Output() jobEvent:EventEmitter<boolean> = new EventEmitter();
  jobList = new MatTableDataSource<Job>()
  candidateList = new MatTableDataSource<Candidate>;

  jobs!:Job[];
  
  ngOnInit(): void {
    this.authService.getServerStatus();
    this.userType = this.authService.getRoles();
    this.updateChange();
  }
  
  updateChange(){
    this.getAllJobs();
    this.getAllCandidates();

    this.jobEvent.emit(true);

  }

  getAllCandidates() {
    this.candidateService.getCandidateList().subscribe(data => {

      this.candidateList.data = data;
    },error=>{
      
    })

  }
  private getAllJobs(){ 

    this.jobs = this.jobService.getActiveJobs();
    this.jobService.getJobList().subscribe((data: Job[])=>{
     this.jobList.data = data;
    
   },error=>{
    
   });
 }


}
