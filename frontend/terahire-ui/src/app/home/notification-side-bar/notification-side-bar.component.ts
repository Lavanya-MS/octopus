import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import { notification } from 'src/app/models/notification.model';
import { user } from 'src/app/models/user.model';
import { AuthService } from 'src/app/service/auth.service';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-notification-side-bar',
  templateUrl: './notification-side-bar.component.html',
  styleUrls: ['./notification-side-bar.component.scss']
})
export class NotificationSideBarComponent implements OnInit {

  constructor(private userService:UserService, private notificationService:NotificationService,private route:Router,private authService:AuthService) { }

  @Input() nList:notification[]=[];


  userId!:number;
  @Output() changeEvent = new EventEmitter();

  dayList = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  
  ngOnInit(): void {

    this.getUserId();
    
  }

  getUserId(){
    this.userService.getUserByEmail(this.authService.getUserId()).subscribe(data=>{
     
      this.userId = data.id;
     
    })
  }

  isSeen(index):boolean{
   let data:notification  = this.nList[index];
   let Seen = false;
   data.notificationStatus.filter(v=>{
    if(v == this.userId){
      Seen =true;
    }


   })

   if(Seen){
    return true;
   }else{
    return false;
   }
  }
  updateChange(){
    this.getNotifications();
  }

  getNotifications(){
    this.notificationService.getNotifications().subscribe(data=>{
      this.nList = data;
     // console.log(data)
    })
    
  }


  

  // updating notificationStatustype to 1 by update API
  updateNotification(id:number,userId){
    this.route.navigate(['home/tasks'])
    this.notificationService.updateNotificationStatus(id,userId).subscribe((result:any)=>{
      //console.log(result);
      this.getNotifications()
      this.changeEvent.emit();
      
      //window.location.reload();
    })
  }
  getDay(date){
    return this.dayList[new Date(date).getDay()]
  }
}
