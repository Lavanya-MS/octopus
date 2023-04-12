import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { Job } from '../models/job';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private activeJobs:Job[]=[];
  private baseURL= this.sharedService.getServerLink()+"/api/job";
  
  constructor(private httpClient: HttpClient,private sharedService:SharedService) {}


  
  getJobList():Observable<any>{
    
    return this.httpClient.get(this.baseURL+'/list');
  }

  getActiveJobs():Job[]{
   this.activeJobs = [];
    this.getJobList().subscribe((data:Job[])=>{
      data.forEach((v,i)=>{
        if( v.status == "Active"){
         this.activeJobs.push(v);
        }else{
          
        }
      })
    })
    return this.activeJobs;
  }

  calculateDiff(dateSent){
    let currentDate = new Date(); 
    dateSent = new Date(dateSent);
    //console.log(Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24)))
   return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
  }
  createJob(job:Job):Observable<any>{
    
    return this.httpClient.post(this.baseURL+'/new',job,{observe:'response'});
  }
  updateJob(job:Job):Observable<any>{

    
    return this.httpClient.put<any>(`${this.baseURL}/update/${job.id}`,job);
  }
  deleteJob(id:number){
    console.log("Deleting with ID:"+id);
    return this.httpClient.delete(this.baseURL+'/delete/'+id,{reportProgress:true})
  }
}
