import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http: HttpClient, private router: Router) {
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
