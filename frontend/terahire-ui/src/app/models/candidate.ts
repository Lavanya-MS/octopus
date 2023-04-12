import { Job } from "./job";

export class Candidate {
    id!:number;
    fullName!: string;
    email!: string;
    phoneNumber!: string;
    gender!:string;
    address!:string;
    country!:string;
    city!:string;
    zipcode!:number;
    nationality!:string;
    yearOfExperience!:number;
    currentCompany!:string;
    currentPosition!:string;
    currentCTC!:string;
    expectedCTC!:string;
    skills!:string;
    sociaLink!:string;
    status!:string
    dob!:Date;
    designation!:Job[];
    score!:string;



}
