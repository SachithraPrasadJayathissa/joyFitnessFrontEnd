import {Component, OnInit} from '@angular/core';
import {MemberService} from "../../../service/member.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MemberDashboardService} from "../../../service/member-dashboard.service";
import Swal from "sweetalert2";
import {TrainerModel} from "../../../model/trainer.model";
import {WorkoutsModels} from "../../../model/workouts.models";

@Component({
  selector: 'app-member-dadhboard',
  templateUrl: './member-dadhboard.component.html',
  styleUrls: ['./member-dadhboard.component.css']
})
export class MemberDadhboardComponent implements OnInit{
  data?: WorkoutsModels[];
    workout: WorkoutsModels = {
    scheduleName: '',
    workouts:'',
  };
  workouts: any[] = [];
  constructor(private MemberDashBoardService: MemberDashboardService) {

  }

  ngOnInit(): void {
    this.getWorkouts(sessionStorage.getItem('username'));
  }
  getWorkouts(value: any): void {
    const username=value;
    this.MemberDashBoardService.getSchedule(username).subscribe({
      next: (res) => {
        console.log(res);
        this.workouts =res.data
        console.log(this.workouts)
      },
    });

  }
  objectKeys(obj: Object) {
    return Object.keys(obj);
  }

}
