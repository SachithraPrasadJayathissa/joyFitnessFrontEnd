import {Component, OnInit} from '@angular/core';
import {MemberService} from "../../../service/member.service";
import {LoginService} from "../../../service/login.service";
import {DashboardService} from "../../../service/dashboard.service";
import {LogoutService} from "../../../service/logout.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  countMember: any;
  countTrainer:any;
  constructor(private dashboardService: DashboardService,private logoutService:LogoutService) {
    console.log(sessionStorage.getItem('jwt_token'));
  }

  ngOnInit() {
    this.dashboardService.countUsers()
      .subscribe((count) => {
      this.countMember = count;
    }),

    this.dashboardService.countTrainer()
      .subscribe((count) => {
        this.countTrainer = count;
      });
  }
  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.logoutService.logout();
      }
    })
  }
}
