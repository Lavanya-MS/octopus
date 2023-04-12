export class Job {
    title!:string;
    owner!:string;
    stage!:number;
    status!:string;
    activeCandidates!:number;
    droppedCandidates!:number;
    summary!:string;
    teamID!:string;
    endDate!:string;
    createdDate:string|any;
    modifiedDate:string|any;
    id!: number;
    vacancy!: number;
    notifiction?:Notification;
}