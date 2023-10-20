import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MemberModel} from "../model/member.model";
const baseUrl = 'http://localhost:8080/';
@Injectable({
  providedIn: 'root'
})
export class MemberDashboardService {

  constructor(private http: HttpClient) { }

  getSchedule(data:any):Observable<any>{
    console.log(baseUrl+"member/getSchedule",data);
    return this.http.get <MemberModel>(baseUrl+"member/getSchedule", { params: {username:data} });
  }
}
