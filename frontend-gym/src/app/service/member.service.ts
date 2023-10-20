import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MemberModel} from "../model/member.model";
import Swal from "sweetalert2";


const baseUrl = 'http://localhost:8080/';
@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }

  create(data : any): Observable<any>{
    return this.http.post(baseUrl+"member/add",data);
  }

  getAll(): Observable<MemberModel[]> {
    return this.http.get<MemberModel[]>(baseUrl+"member");
  }

  delete(nic: any): Observable<any> {
    console.log(baseUrl+"member/delete", { body: nic });
    return this.http.delete(baseUrl+"member/delete", { body: nic });
  }

  getSchedule(data:any):Observable<any>{
    console.log(data);
    return this.http.post(baseUrl+"workout/getWorkOutSchedule",data);
  }

  getMember(data:any):Observable<any>{
    console.log(data);
    return this.http.get <MemberModel>(baseUrl+"member/getMember", { params: {id:data} });
  }



}
