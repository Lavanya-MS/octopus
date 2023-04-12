import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  notificationUpdate = new Subject();

  getServerLink():string{

    return "http://localhost:8080";
  }
  updateChanges(){
    return 
  }

  updateNotification(){
    this.notificationUpdate.next(true);
  }
}
