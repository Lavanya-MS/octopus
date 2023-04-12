
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { FloatLabelType } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';




// import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { Candidate } from 'src/app/models/candidate';
import { Job } from 'src/app/models/job';
import { user } from 'src/app/models/user.model';
import { AuthService } from 'src/app/service/auth.service';
import { CandidateService } from 'src/app/service/candidate.service';
import { CountryService } from 'src/app/service/country.service';
import { JobService } from 'src/app/service/job.service';
import { SkillsetService } from 'src/app/service/skillset.service';




@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {
  @ViewChild(NgxMatIntlTelInputComponent, { static: true })
  phoneNumber?: NgxMatIntlTelInputComponent;
  candidate: Candidate = new Candidate();
  candidateForm!: FormGroup;
  submitted = false;
  message!: string;
  isAlert = false;
  countries: any[] = [];
  @Input() newJobs!:Job[];

  skill: any[] = [];
  
  @Output() candidateChange = new EventEmitter();
  


  //phone number country code
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this.formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });


  constructor(private authService:AuthService, private countryService: CountryService, private jobService: JobService, private SkillsetService: SkillsetService, private formBuilder: FormBuilder, private candidateService: CandidateService, private router: Router, private snackBar: MatSnackBar, private fb: FormBuilder) {
   
  }
  
  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  ngOnInit() {    
   
    this.getCountries();
   
    this.getSkills();
    this.candidateForm = new FormGroup({

      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dob: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      // phoneNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      city: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      nationality: new FormControl('', [Validators.required]),
      currentCompany: new FormControl('', [Validators.required]),
      currentPosition: new FormControl('', [Validators.required]),
      currentCTC: new FormControl('', [Validators.required]),
      expectedCTC: new FormControl('', [Validators.required]),
      yearOfExperience: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      skills: new FormControl('', [Validators.required]),
      sociaLink: new FormControl('', [Validators.required]),
      gender: new FormControl(['female']),
      designation: new FormControl('', [Validators.required]),
      score: new FormControl()      
      
    });

  
  
  

    // function validateDateOfBirth(control: FormControl): { [key: string]: any } | null {
    //   const dateOfBirth = control.value;
    //   const age = calculateAge(dateOfBirth);
    
    //   // check if date is valid and person is at least 18 years old
    //   if (isNaN(dateOfBirth.getTime()) || age < 18) {
    //     return { 'invalidDateOfBirth': true };
    //   }
    
    //   return null;
    // }
    
    //  function calculateAge(dob: Date) {
    //   const ageDifMs = Date.now() - dob.getTime();
    //   const ageDate = new Date(ageDifMs);
    //   return Math.abs(ageDate.getUTCFullYear() - 1970);
    //  }



    //console.log(this.candidateForm)
    this.candidateForm.get('country')?.valueChanges.subscribe((x: any) => {
     // console.log(x)
    })


  


    // for disabling input fields
    var options = {
      onlySelf: true,
      emitEvent: false,
    }
    this.candidateForm.get('yearOfExperience')!.valueChanges.subscribe((x: string) => {

      if (x == '0') {
        this.candidateForm.get('currentCompany')!.disable(options);
        this.candidateForm.get('currentPosition')!.disable(options);
        this.candidateForm.get('currentCTC')!.disable(options);
        this.candidateForm.get('expectedCTC')!.disable(options);
      }
      else {
        this.candidateForm.get('currentCompany')!.enable(options);
        this.candidateForm.get('currentPosition')!.enable(options);
        this.candidateForm.get('currentCTC')!.enable(options);
        this.candidateForm.get('expectedCTC')!.enable(options);
      }
    })



  }

  //date of birth validation
  age(e){
    let year = new Date(e.target.value).getFullYear();
    let today = new Date().getFullYear();

    // console.log("Selected year"+year);
    // console.log("Current year"+today)
    // console.log(e.target.value)
    if(!(year >= today) && today - year >= 18){
      console.log("greater than 18")
    }else {
     console.log("less than")
     this.candidateForm.get('dob')?.setErrors({ageNotValid:"Age must be greater than 18."})

    }
   
   
  }
  



  OnClick() {
    console.log("testing");
    console.log(this.candidateForm);
  }

  get f() { return this.candidateForm.controls; }

  //saving created candidates
  saveCandidate() {
    //checking for frontend validation
    console.log(this.candidateForm.get('phoneNumber')!.errors);
    if (!this.candidateForm.valid) {
      console.log("Invalid form.")
    } else {
      this.candidateService.createCandidate(this.candidate).subscribe({
        next: (data: any) => {
          
          this.snackBar.open("Successfully created.", '', {
            duration: 3000
          })
          this.candidateChange.emit();
          // this.goToCandidateList();
        },
        error: (e: any) => console.error(e)
      });
    }


  }

  onSubmit() {
    this.submitted = true;
    this.candidate = this.candidateForm.value;

    if (this.candidateForm.invalid) {


      return;
    }

    if (this.candidateForm.valid) {
      // this.isAlert=true
      this.saveCandidate()

    }



    // stop here if form is invalid

    // alert('SUCCESS');
    // if(this.candidateForm.valid && this.submitted){
    //   window.location.reload();
    // }
    //this.candidateForm.clearValidators();



    Object.keys(this.candidateForm.controls).forEach(key => {
      const control = this.candidateForm.controls[key];
      control.markAsUntouched();
    });
    this.candidateForm.reset();
    this.phoneNumber?.reset();
    this.candidateForm.get('phoneNumber')?.clearValidators();
    this.submitted = false;

  }
  resetForm() {
    this.candidateForm.reset();
  }
  getCountries() {
    this.countryService.getCountry().subscribe((data: any[]) => {

      this.countries = data;
      this.countries.sort((a, b) => a.name.common > b.name.common ? 1 : -1)
      //console.log("countries", data)
      //console.log(this.countries[100].name.common)
    })
  }


  getSkills() {
    this.SkillsetService.getSkillSet().subscribe((data: any[]) => {
      this.skill = data;
      //console.log(data);
    })
  }


}
