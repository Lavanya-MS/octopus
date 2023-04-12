import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../../../models/candidate';
import { Job } from '../../../../models/job';
import { user } from '../../../../models/user.model';
import { Event } from '../../../../models/event.model';
import { CandidateService } from 'src/app/service/candidate.service';
import {UserService } from 'src/app/service/user.service';
import { JobService } from '../../../../service/job.service';
import { EventService } from '../../../../service/event.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-event-generator',
  templateUrl: './event-generator.component.html',
  styleUrls: ['./event-generator.component.scss']
})
export class EventGeneratorComponent implements OnInit {
  startDate!:Date;
  endDate!:Date;
  createdDate!:Date;
  modifiedDate!:Date;
  type!:string;
  organizerID!:number;
  teamMembers!:user[];
  candidates!: Candidate[];
  job!:Job;
  candidatesList:Candidate[]=[];
  teamList!:user[];
  jobList!:Job[];

 
  constructor(private snackBar:MatSnackBar, private _candidateService: CandidateService,private _userService: UserService,private _jobService: JobService,private _eventService:EventService ) { 
    // this.teamList=[];
    // this.teamMembers=[];
  }
  ngOnInit(): void {
    this.getAllMembers();
   // this.getAllCandidates();
    this.getAllJobs();
    this.organizerID=107;
    // Login-User's ID passed here
  }
  private getAllMembers(){
    this._userService.getAllUsers().subscribe(data=>{
      this.teamList=data;
    })
  }

  listCandidate($event){
    this._candidateService.getCandidatesByStatus($event).subscribe(data=>{
      this.candidatesList = data;
    })
  }
  
  private getAllJobs(){
    this.jobList = this._jobService.getActiveJobs();
  }

 
  saveEventClick(){
    if(this.endDate>=this.startDate){
    let newEvent:Event= {
      id:0,
      start:this.startDate,
      end:this.endDate,
      created:null,
      modified: null,
      type:this.type,
      organizer_id:this.organizerID,
      job:this.job,
      team_members:this.teamMembers,
      candidate:this.candidates
    }
    //console.log(newEvent);
    this._eventService.createEvent(newEvent).subscribe(response=>{
      this.snackBar.open("Successfully created!!",'',{duration:3000})
    })
    

  }
  else{
    this.snackBar.open('Invalid Entry: Start date must come before End date','',{duration:4000})
  }
}


}
