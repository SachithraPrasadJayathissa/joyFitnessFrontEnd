import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MemberModel} from "../model/member.model";
import {TrainerModel} from "../model/trainer.model";


const baseUrl = 'http://localhost:8080/';
@Injectable({
  providedIn: 'root'
})
export class TraineerService {

  constructor(private http: HttpClient) { }

  createTrainer(data : any): Observable<any>{
    console.log(baseUrl+"trainer/add",data)
    return this.http.post(baseUrl+"trainer/add",data);
  }

  getAll(): Observable<TrainerModel[]> {
    return this.http.get<TrainerModel[]>(baseUrl+"trainer");
  }

  delete(nic: any): Observable<any> {
    return this.http.delete(baseUrl+"trainer/delete", { body: nic });
  }
}
