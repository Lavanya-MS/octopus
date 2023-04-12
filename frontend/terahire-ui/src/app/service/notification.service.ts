
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



import { Observable } from 'rxjs';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  constructor(private httpClient:HttpClient,private sharedService:SharedService) { }

  private baseURL=  this.sharedService.getServerLink()+ "/api/notification";




  getNotifications(): Observable<any> {
    // return this.httpClient.get(this.baseURL+'/list',{headers:this.header})
    return this.httpClient.get(this.baseURL + '/list', {  });
  }
  updateNotificationStatus(id,userId): Observable<any>{
    return this.httpClient.put(this.baseURL + '/update/'+ id+"/"+userId, {  });

  }
}
