import { PasswordService } from './../service/password.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm:any = FormGroup;
  validEmail!:boolean;

  constructor(private formBuilder:FormBuilder, private _passwordService: PasswordService,
    public dialogRef:MatDialogRef<ForgotPasswordComponent>,
    
    private _snackBar:MatSnackBar
    ) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email:['',[Validators.required, Validators.email]],
    })
  }
  handleSubmit(){
    
    var formData = this.forgotPasswordForm.value;
   // console.log(formData.email);
    this._passwordService.forgotPassword(formData.email).subscribe((value)=>{
      console.log(value)
      if(value.status == 'Generated Token'){
        this.validEmail = true;
        this._snackBar.open("Submitted successfully, Check your mailbox",'',{duration:3000})
      }else{
        this.validEmail = false;
        this._snackBar.open("Email not found.",'',{duration:3000})
      }
      
    },(err)=>{
      // console.log(err.status);
     
        this.validEmail=false;
        this._snackBar.open("Email not found.",'',{duration:3000})
     

    });
  }


}
