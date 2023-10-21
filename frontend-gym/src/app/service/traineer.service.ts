import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('jwt_token'));
    return this.http.post(baseUrl+"trainer/add",data,{headers});
  }

  getAll(): Observable<TrainerModel[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('jwt_token'));
    return this.http.get<TrainerModel[]>(baseUrl+"trainer",{headers});
  }

  delete(nic: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('jwt_token'));
    return this.http.delete(baseUrl+"trainer/delete", { body: nic });
  }

}
