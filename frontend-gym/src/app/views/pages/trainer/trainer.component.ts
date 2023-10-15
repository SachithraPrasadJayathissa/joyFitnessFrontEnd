import {Component} from '@angular/core';
import {TrainerModel} from "../../../model/trainer.model";
import {TraineerService} from "../../../service/traineer.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent {

  trainer: TrainerModel = {
    name: '',
    username: '',
    password: '',
    phone: '',
    nic: '',
    age: ''
  };


  submitted = false;


  constructor(private trainerService: TraineerService) {
  }

  saveTrainer(): void {
    const details = {
      name: this.trainer.name,
      username: this.trainer.username,
      password: this.trainer.password,
      nic: this.trainer.nic,
      phone: this.trainer.phone,
      age: this.trainer.age
    };

    this.trainerService.createTrainer(details)
      .subscribe({
        next: (res) => {
          const successMessage = res['message_status'];
          if (successMessage === 'Success') {
            this.submitted = true;
            Swal.fire({
              title: 'Good Job',
              text: 'Success Added',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then((result) => {
              if (result.isConfirmed) {
                location.reload();
              }
            });
          } else {
            console.error('Not saved');
            Swal.fire({
              title: 'Error',
              text: 'Trainer Already Existing',
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
