import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordService } from '../service/password.service';




@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  resetForm!: FormGroup;
  submitted = false;
  error:boolean = false;
  errMessage!:string;
  token!:string;
  id!:number;
  hasToken!:boolean
  fieldTextType!: boolean;

  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _passwordService: PasswordService,
    private _snackBar:MatSnackBar,
    private router: Router) 
    /* This code is creating a `FormGroup` using the `FormBuilder` service. The `FormGroup` is named
    `resetForm` and has two form controls: `newPassword` and `confirmPassword`. Both form controls
    are initialized with an empty string as their initial value. The `Validators` array passed as
    the second argument to each form control specifies that both fields are required and must match
    a specific pattern. The pattern specified in this case requires that the password contains at
    least one lowercase letter, one uppercase letter, one number, one special character, and is at
    least 8 characters long. */
    {
      this.resetForm = this.formBuilder.group({
        newPassword: ['', [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
        confirmPassword: ['', [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
    });
  
    }
    
   /**
    * This function checks for a token and ID in the query parameters and uses them to check for
    * authentication before navigating to a new page.
    */
    allowAccess(){
      this.activatedRoute.queryParams.subscribe((params)=>{
        this.token = params['token']
        this.id= params['id']
        if(this.token && this.id){
          this.hasToken=true;
          this._passwordService.tokenChecker(this.id,this.token).subscribe((response:any)=>{
            console.log(response);},err=>{
             if(err.status==404 || err.status==401){
              this.router.navigate(['**'])
             }
             else{
             }
            });
        }else{
          this.hasToken=false;
          this.router.navigate(['']);
        }
       });
 
    }

  ngOnInit() {
    this.allowAccess()
    console.log(this.token,this.id,this.hasToken);
      
  }

  get f() { return this.resetForm.controls; }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  /**
   * The onSubmit function checks if the resetForm is valid and if the new password matches the confirm
   * password, then resets the password and navigates to the home page, otherwise displays an error
   * message.
   * @returns If the condition `this.resetForm.valid && this.resetForm.get('newPassword')?.value
   * ==this.resetForm.get('confirmPassword')?.value` is not met, the function will return without any
   * value. If the condition is met, the function will execute some code and then navigate to a
   * different page using `this.router.navigate([''])`. No value is explicitly returned in this case.
   */
  onSubmit() {
      this.submitted = true;
      if(this.resetForm.valid && this.resetForm.get('newPassword')?.value ==this.resetForm.get('confirmPassword')?.value){
      
        //console.log(this.resetForm.value);
        this.error=false;
        this._snackBar.open("Password was reset successfully",'',{
          duration:5000
         })
         this._passwordService.resetPassword(this.id,this.token,this.resetForm.get('newPassword')?.value).subscribe((response: any) => {
          console.log(response);
        },err=>{
          console.log(err)
        });
         this.router.navigate([''])
      }
      else if(this.resetForm.get('newPassword')?.value=="" && this.resetForm.get('confirmPassword')?.value == ""){
        console.log("blank")
      }
      else{
        this._snackBar.open("Password does not match",'',{
          duration:5000
         })
         console.log(this.resetForm.value);
        return;
      }
  }
}
