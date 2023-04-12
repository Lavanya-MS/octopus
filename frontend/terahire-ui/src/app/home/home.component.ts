import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { NotificationService } from '../service/notification.service';
import{ notification} from '../models/notification.model'
import { UserService } from '../service/user.service';

import { SharedService } from '../service/shared.service';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor(private router:Router,private notificationService:NotificationService,private authService:AuthService,private userService:UserService,private sharedService:SharedService) { }

  
  activeTab:string = "dahboard";

  userType:boolean[]=[];
  nList!:notification[];
  userId!:number;
  notificationCount:any[]=[];
  notificationCounts:number=0;

 
  

  ngOnInit(): void {
    //console.log( this.router.url.split('/')[2])
    this.getUserId();
    this.activeTab =  this.router.url.split('/')[2]
    this.authService.getServerStatus();
    this.userType = this.authService.getUserTypes();

    this.sharedService.notificationUpdate.subscribe(val=>{
      if(val){
        this.getNotifications();
      }
    })

    
   // console.log(this.userType)

  }

  getUserId(){
    this.userService.getUserByEmail(this.authService.getUserId()).subscribe(data=>{
     
      this.userId = data.id;
      this.getNotifications();
    })
  }


  getNotifications(){
    this.notificationCount =[]
    this.notificationCounts =0;
    this.nList = [];
    this.notificationService.getNotifications().subscribe(data => {
      this.nList = data;
      
      data.forEach((obj,i)=>{
       
        obj.notificationStatus.forEach((v:number)=>{
        // console.log(v+" "+this.userId)
          if(v == this.userId){
            // console.log(v)
            this.notificationCount.push(true);
            
          }
        })
      })
      this.notificationCounts = this.nList.length - this.notificationCount.length;

    })
 
  }
  logOut(){
    this.authService.logout();

  }
  Logout(){

    this.authService.logout();
    this.router.navigate([""])

  }
 
  ngOnDestroy(){
    this.sharedService.notificationUpdate.unsubscribe()
  }
}
