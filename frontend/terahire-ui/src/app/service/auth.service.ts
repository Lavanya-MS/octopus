import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { auth } from '../models/auth.model';
import { SharedService } from './shared.service';
import { UserService } from './user.service';
import { user } from '../models/user.model';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  constructor(private httpClient:HttpClient,private userService:UserService,private router:Router,private sharedService:SharedService) { 
    
  }


  userType:boolean[]=[];

  private baseURL= this.sharedService.getServerLink()+ "/api/auth/login";



  authUser(email:string,pass:string):Observable<any>{
    return this.httpClient.post(`${this.baseURL}`,{"username":email,"password":pass});
  }

  public currentUserValue():any {
    return localStorage.getItem("currentUser");
}


public  getUserId():string{
 
  let data = JSON.parse(localStorage.getItem("currentUser")!);
  return data.username;
 
}

// getUserDetails(){
//   let data:any = localStorage.getItem("currentUser");
//   let user = this.userService.getUserByEmail(data.username);

// }
isLoggedIn():boolean{

  
  if(this.currentUserValue() != null){
    return true;
  }else{
    return false;
  }
}

getServerStatus(){
  this.httpClient.get(this.sharedService.getServerLink()+"/api/auth/status").subscribe(data=>{
    
  },error=>{
    this.logout()
  })
}

getRoles(){
  let user = JSON.parse(localStorage.getItem('currentUser')!).authorities[0].authority
  return user;
}

getUserTypes(){
  let user = JSON.parse(localStorage.getItem('currentUser')!).authorities[0].authority
    this.userType[0] = true;
    if(user == "ROLE_ADMIN"){
      this.userType[1] = true;
      this.userType[2] = true;
      this.userType[3] = true;
      this.userType[4] = true;
      this.userType[5] = true;
    }else if(user == "ROLE_HR"){
      this.userType[1] = true;
      this.userType[2] = false;
      this.userType[4] = true;
      this.userType[5] = true;
    }else if(user == "ROLE_HM"){
      this.userType[1] = true;
      this.userType[2] = false;
      this.userType[4] = true;
      this.userType[5] = true;
    }else if(user == "ROLE_IN"){
      this.userType[4] = true;
      this.userType[2] = false;
      this.userType[1] = true;
      this.userType[5] = true;
    }else{
      this.userType[0] = true;
    }

    return this.userType;
}

logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  this.router.navigate(['']);
  
}
}