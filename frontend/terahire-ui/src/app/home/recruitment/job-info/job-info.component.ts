import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Job } from 'src/app/models/job';
import { JobService } from 'src/app/service/job.service';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from '../../dialog-delete/dialog-delete.component';
import { Element } from '@angular/compiler';

@Component({
  selector: 'app-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.scss']
})
export class JobInfoComponent implements OnInit {

  jobInfo!: Job[];
  isLoaded:boolean =false;
  color: ThemePalette = 'accent';
  @ViewChild('dropdown') eldrop!: ElementRef
  selected!: string;
  constructor(private jobService: JobService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getJobInfo();
  }

  //getJob List
  getJobInfo() {
    this.jobService.getJobList().subscribe(data => {
      this.jobInfo = data;
     
      this.isLoaded = true;
    })
  }

  //get job title
  // getJobTitle(jobInfo:Job[],condition:string){
  //   return jobInfo.filter(c=>c.title==condition)
  // }

  getProgress(a: number, v: number) {
    return (a / v) * 100;
  }

  openDialog(id: number, name: string): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: { id: id, message: "Are you sure want to delete ", username: name, funId: 1 },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);


    });
  }

  calculateDiff(dateSent){
     let currentDate = new Date(); 
     dateSent = new Date(dateSent);
     //console.log(Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24)))
    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
   }
//getting candidate status list
getStatus(jobInfo:Job[],condition:string){
  return jobInfo.filter(c=>c.status==condition)

}

//date difference calculateDiff(dateSent){ let currentDate = new Date(); dateSent = new Date(dateSent); return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24)); }

  // openBox(i: number) {
  //   this.eldrop.nativeElement.style = "block"
  // }
}
