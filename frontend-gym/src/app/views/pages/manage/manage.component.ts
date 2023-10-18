import {Component} from '@angular/core';
import {MemberService} from "../../../service/member.service";
import {MemberModel} from "../../../model/member.model";
import Swal from 'sweetalert2';

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.css']
})
export class ManageComponent {
public schedule_ex: any;
    member: MemberModel = {
        name: '',
        username: '',
        password: '',
        phone: '',
        nic: '',
        age: '',
        gender: '',
        height: '',
        weight: '',
        bmi: '',
        workout_time: '',
        workout_experience: '',
        fitness_goal: '',
        schedule: ''
    };

    submitted = false;

    constructor(private memberService: MemberService) {
    }

    ngOnInit() {

    }

    saveMember(): void {
        const data = {
            name: this.member.name,
            username: this.member.username,
            password: this.member.password,
            nic: this.member.nic,
            phone: this.member.phone,
            age: this.member.age,
            gender: this.member.gender,
            height: this.member.height,
            weight: this.member.weight,
            bmi: this.member.bmi,
            workoutTime: this.member.workout_time,
            workoutExperiance: this.member.workout_experience,
            fitnessGoal: this.member.fitness_goal,
            schedule: this.schedule_ex
        };

        this.memberService.create(data)
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
                Swal.fire({
                  title: 'Error',
                  text: 'User Already Existing',
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
    getScheduleAI(): void {
      const needData = {
        age: this.member.age,
        gender: this.member.gender,
        height: this.member.height,
        weight: this.member.weight,
        bmi: this.member.bmi,
        workout_time: this.member.workout_time,
        workout_experience: this.member.workout_experience,
        fitness_goal: this.member.fitness_goal,
      };
      console.log(needData)
      this.memberService.getSchedule(needData)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.schedule_ex = res.scheduleValue;
          },
          error: (err) => {
            console.error(err);
          }
        });

     }
}
