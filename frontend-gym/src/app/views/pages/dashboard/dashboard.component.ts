import {Component, OnInit} from '@angular/core';
import {MemberService} from "../../../service/member.service";
import {LoginService} from "../../../service/login.service";
import {DashboardService} from "../../../service/dashboard.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  countMember: any;
  countTrainer:any;
  constructor(private dashboardService: DashboardService) {
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
}
