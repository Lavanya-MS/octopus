import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/service/auth.service';
import { JobService } from 'src/app/service/job.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-job',
  templateUrl: './job-registration.component.html',
  styleUrls: ['./job-registration.component.scss']
})
export class JobComponent implements OnInit {

  
  
  jobRegisterForm!: FormGroup;
  submitted:boolean = false;
  @Output() jobEvent:EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private authService: AuthService,private sharedService:SharedService,private formBuilder: FormBuilder,private jobService: JobService,private _snackBar:MatSnackBar) { }


  

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
      endDate:['',Validators.required],
      notification: ['']
  });
  
   
  console.log(this.authService.currentUserValue())
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
        notificationStatus:[101,102],
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
          console.log(this.jobRegisterForm.value)
          this.jobService.createJob(this.jobRegisterForm.value).subscribe(response=>{
           // console.log(response);
            this.openSnackBar("Successfully created.");
            
            this.jobRegisterForm.reset();
            this.submitted = false;
            this.updateChange();

            this.sharedService.updateNotification()

          },error=>{
            this.openSnackBar("Something went wrong!! Try again.")
          })
     //window.location.reload()
       
    }
  }

  calculateDiff(dateSent){
    let currentDate = new Date(); 
    dateSent = new Date(dateSent);
    //console.log(Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24)))
   return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
  }
  age(e){
    if(this.calculateDiff(e.target.value) < 0){
      
    }else {
     console.log("less than")
     this.jobRegisterForm.get('endDate')?.setErrors({endDateUnderflow:"Must have atleast one day validity."})

    }
  }
}
