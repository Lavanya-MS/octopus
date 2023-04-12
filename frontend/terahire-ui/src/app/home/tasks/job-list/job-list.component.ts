import { Component,Input,OnInit, ViewChild } from '@angular/core';
import { Job } from 'src/app/models/job';
import { JobService } from 'src/app/service/job.service';
import{MatDialog} from '@angular/material/dialog'
import { JobEditComponent } from '../job-edit/job-edit.component';

import { MatPaginator } from '@angular/material/paginator';
import { DialogDeleteComponent } from '../../dialog-delete/dialog-delete.component';

import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';




@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  
 
  @Input()JobData!:Job
  showJobEditComponent:boolean[]=[false];
  constructor(private authService:AuthService, private jobService:JobService, private router:Router,private dialog: MatDialog) { }
  displayedColumns: string[] = ['title','owner','status','vacancy','activeCandidates','droppedCandidates','summary','teamID','endDate','actions']
  @Input() dataSource = new MatTableDataSource<Job>();

  userType!:string;
  isloaded:boolean = false;

  ngOnInit(): void {
    this.userType = this.authService.getRoles();
    this.getAllJobs();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private getAllJobs(){ 
     this.jobService.getJobList().subscribe((data: Job[])=>{
      this.dataSource.data=data;
      this.isloaded = true
    },error=>{
      this.isloaded = true;
    });
  }

  /* `openDialog(id:number,name:string): void` is a method that opens a confirmation dialog when the
  delete button is clicked on a job in the job list. It takes two parameters, `id` and `name`, which
  are used to display the job's information in the dialog. The `dialog.open()` method opens the
  `DialogDeleteComponent` component and passes the job's information as data. The
  `dialogRef.afterClosed()` method subscribes to the dialog's close event and calls the
  `getAllJobs()` method to refresh the job list after the dialog is closed. */
  openDialog(id:number,name:string): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: {id: id, message: "Are you sure want to delete ",username:name,funId:3},
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      console.log('The dialog was closed'+result);

     this.getAllJobs();
    });
  }

  /* `onDeleteClicked(id:number)` is a method that is called when the delete button is clicked on a job
  in the job list. It opens a confirmation dialog asking the user if they are sure they want to
  delete the job. If the user confirms, the `getAllJobs()` method is called to refresh the job list. */
  onDeleteClicked(id:number){
    if(confirm("Are you sure you want to delete ?")){
   
  }
   // location.reload();
  }
  onUpdateClicked(job:Job){
    this.dialog.open(JobEditComponent,{ 
      data:  job ,
      width: '40%',
      height: '70%',
    }).afterClosed().subscribe((result: any)=>{
      this.getAllJobs();
    })
  }

  //Search box
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }
}
