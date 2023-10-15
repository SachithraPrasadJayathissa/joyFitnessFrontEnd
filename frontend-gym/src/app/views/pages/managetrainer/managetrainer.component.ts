import { Component } from '@angular/core';
import {MemberModel} from "../../../model/member.model";
import {MemberService} from "../../../service/member.service";
import {TrainerModel} from "../../../model/trainer.model";
import {TraineerService} from "../../../service/traineer.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-managetrainer',
  templateUrl: './managetrainer.component.html',
  styleUrls: ['./managetrainer.component.css']
})
export class ManagetrainerComponent {

  data?: TrainerModel[];

  trainer: TrainerModel = {
    nic: ''
  };

  constructor(private trainerService: TraineerService) {
  }

  ngOnInit(): void {
    this.retrieveTrainer();
  }

  retrieveTrainer(): void {
    this.trainerService.getAll()
      .subscribe({
        next: (data) => {
          this.data = data;
        },
        error: (e) => console.error(e)
      });
  }

  deleteTrainer(val:any): void {
    const details = {
      nic: val,
    };

    this.trainerService.delete(details)
      .subscribe({
        next: (res) => {
          console.log(res);
          const successMessage = res['message_status'];
          if (successMessage === 'Success') {
            Swal.fire({
              title: 'Good Job',
              text: 'Success Deleted',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then((result) => {
              if (result.isConfirmed) {
                location.reload();
              }
            });
          } else {
            console.error('Not Deleted');
            Swal.fire({
              title: 'Error',
              text: 'Trainer NIC Not in the System',
              icon: 'error',
              confirmButtonText: 'OK'
            }).then((result) => {
              if (result.isConfirmed) {
                location.reload();
              }
            });
          }
        },
        error: (e) => {
          console.error(e);
          Swal.fire({
            title: 'Error',
            text: 'An error occurred. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
        }
      });
  }

}
