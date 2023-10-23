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
    return this.http.get<number>(baseUrl+'member/countMembers');
  }

  countTrainer(): Observable<number> {
    return this.http.get<number>(baseUrl+"trainer/countTrainer");
  }

}
