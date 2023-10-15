import { Component } from '@angular/core';
import {LoginService} from "../../../service/login.service";
import {LoginModel} from "../../../model/login.models";
import {Router} from "@angular/router";

const baseUrl = "http://localhost:4200/dashboard";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login: LoginModel = {
    name: '',
    password: ''
  };



  constructor(private router: Router,private loginService: LoginService) {
  }

  Login(){
    const data = {
      username: this.login.name,
      password: this.login.password

    };
    this.loginService.Login(data)
      .subscribe({
        next: (res) => {
          if(res.token !== ''){
            sessionStorage.setItem('jwt_token' , res.token);
            sessionStorage.setItem('user_role' , res.role);
          }
          console.log(res.role)
          if(res.role === 'ROLE_TRAINER'){
            this.router.navigate(['/dashboard']);
          }else if(res.role === 'ROLE_MEMBER'){
            this.router.navigate(['/']);
          }


        },
        error: (e) => console.error(e)
      });
  }
}
