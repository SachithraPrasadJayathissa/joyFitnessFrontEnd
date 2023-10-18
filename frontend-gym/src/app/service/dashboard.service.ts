import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const baseUrl = 'http://localhost:8080/';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  countUsers(): Observable<number> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('jwt_token'));
    return this.http.get<number>(baseUrl+'member/countMembers', {headers});
  }

  countTrainer(): Observable<number> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('jwt_token'));
    return this.http.get<number>(baseUrl+"trainer/countTrainer");
  }

}
