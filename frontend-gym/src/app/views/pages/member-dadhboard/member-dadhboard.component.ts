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
  modelRef: any;
  workout: WorkoutsModels = {
    scheduleName: '',
    workouts:'',

  };
  constructor(private MemberDashBoardService: MemberDashboardService, private modal: NgbModal) {

  }

  ngOnInit(): void {
   this.getWorkouts("amal")
  }

  getWorkouts(value: any): void {
    this.MemberDashBoardService.getSchedule(value).subscribe({
      next: (res) => {
        console.log(res);
      },
    });

  }

}
