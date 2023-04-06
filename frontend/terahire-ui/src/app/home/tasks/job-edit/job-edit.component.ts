import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Job } from 'src/app/models/job';
import {MatIconModule} from '@angular/material/icon';
import { JobService } from 'src/app/service/job.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.scss']
})
export class JobEditComponent implements OnInit {
  
  EditJobData:Job;

  constructor(@Inject(MAT_DIALOG_DATA) public data:Job, private jobService:JobService,private snackBar:MatSnackBar) 
    { 
    this.EditJobData=data;
  }

  UpdatedJobTitle!:string;
  UpdatedJobOwner!:string;
  UpdatedJobStage!:number;
  UpdatedJobStatus!:string;
  UpdatedJobActiveCandidates!:number;
  UpdatedJobDroppedCandidates!:number;
  UpdatedJobSummary!:string;
  UpdatedJobTeamID!:string;
  UpdatedJobScoreCard!:number;
  UpdatedJobVacancy!:number;
  
  ngOnInit(){
    this.UpdatedJobTitle=this.EditJobData.title;
    this.UpdatedJobOwner=this.EditJobData.owner;
    this.UpdatedJobStage=this.EditJobData.stage;
    this.UpdatedJobStatus=this.EditJobData.status;
    this.UpdatedJobActiveCandidates=this.EditJobData.activeCandidates;
    this.UpdatedJobDroppedCandidates=this.EditJobData.droppedCandidates;
    this.UpdatedJobSummary=this.EditJobData.summary;
    this.UpdatedJobTeamID=this.EditJobData.teamID;
    this.UpdatedJobScoreCard=this.EditJobData.scoreCard;
    this.UpdatedJobVacancy=this.EditJobData.vacancy;
  }
  /**
   * This function updates job details if the number of active candidates is greater than or equal to
   * the number of dropped candidates.
   */
  UpdateJobDetails(){
    if(this.UpdatedJobActiveCandidates>=this.UpdatedJobDroppedCandidates){
    let UpdatedJobData: Job ={ 
      title:this.UpdatedJobTitle,
      owner:this.UpdatedJobOwner,
      stage:this.UpdatedJobStage,
      status:this.UpdatedJobStatus,
      activeCandidates:this.UpdatedJobActiveCandidates,
      droppedCandidates:this.UpdatedJobDroppedCandidates,
      summary:this.UpdatedJobSummary,
      teamID:this.UpdatedJobTeamID,
      scoreCard:this.UpdatedJobScoreCard,
      id:this.EditJobData.id,
      createdDate:null,
      modifiedDate:null,
      vacancy:this.UpdatedJobVacancy
    }
    this.jobService.updateJob(UpdatedJobData).subscribe(data=>{
      this.snackBar.open("Successfully Updated!!",'',{duration:3000})
      console.log(data)
      
    });
    
  }
  else{
    alert('Invalid Entry');
  }
  }
}