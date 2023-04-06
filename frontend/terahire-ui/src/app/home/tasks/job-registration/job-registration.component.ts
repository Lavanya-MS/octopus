import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobService } from 'src/app/service/job.service';

@Component({
  selector: 'app-job',
  templateUrl: './job-registration.component.html',
  styleUrls: ['./job-registration.component.scss']
})
export class JobComponent implements OnInit {

  
  
  jobRegisterForm!: FormGroup;
  submitted:boolean = false;
  @Output() jobEvent:EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private formBuilder: FormBuilder,private jobService: JobService,private _snackBar:MatSnackBar) { }

  

  updateChange(){
    this.jobEvent.emit(true);
  }
  ngOnInit(): void {

   
    this.jobRegisterForm = this.formBuilder.group({   
      title: ['',[Validators.required]],
      owner:['',[Validators.required]],   
      stage:['',[Validators.required]],    
      status: ['',[Validators.required]],
      vacancy:['',Validators.required],
      activeCandidates:['',Validators.required],
      droppedCandidates:['',Validators.required],
      summary:['',Validators.required],
      teamID:['',Validators.required],
      scoreCard:['',Validators.required],
      notification: ['']
  });
   
   // console.log(this.jobRegisterForm)
  }

  openSnackBar(message:string){
    this._snackBar.open(message,'',{
      duration:3000
    })
   
  }

  get f() { return this.jobRegisterForm.controls; }


/* The `onSubmit()` function is a method that is called when the user submits the job registration
form. It first sets the value of the `notification` field in the form to an object containing
information about the job registration. Then, it sets the `submitted` flag to true and checks if the
form is valid. If the form is valid, it calls the `createJob()` method of the `jobService` to create
a new job with the form data. If the job is created successfully, it displays a success message
using the `openSnackBar()` method and resets the form. If there is an error, it does nothing. */
    onSubmit() {
      //   title:"Job Registration",
      //   body: "New job "+this.f.title.value+" was created by "+this.f.owner.value+".",
      //   notificationType: 0,
      //   notificationStatus:102,
      //   createdDate:"",
      //   modifiedDate:"",
      //   id:0,
    
      // }

      this.f.notification.setValue({
        title:"Job Registration",
        body: "New job "+this.f.title.value+" was created by "+this.f.owner.value+".",
        notificationType: 0,
        notificationStatus:102,
        createdDate:"",
        modifiedDate:"",
        id:0,
    
      })
        this.submitted = true;
       // this.jobRegisterForm.get('notification')?.setValue(this.notification)
       // console.log(this.jobRegisterForm.value)
        // stop here if form is invalid
        if (this.jobRegisterForm.invalid) {
          console.log("Error");
            return;
        }else{
          
          this.jobService.createJob(this.jobRegisterForm.value).subscribe(response=>{
            console.log(response);
            this.openSnackBar("Successfully created.")
            this.jobRegisterForm.reset();
            this.submitted = false;
          },error=>{

          })
     //window.location.reload()
       
    }
  }
}
