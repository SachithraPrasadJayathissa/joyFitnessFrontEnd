import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MemberModel} from "../../../model/member.model";
import {MemberService} from "../../../service/member.service";
import Swal from 'sweetalert2';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  // members: any = {};
  public schedule_ex: any;
  data?: MemberModel[];
  modelRef: any;
  member: MemberModel = {
    nic: ''
  };

  members: MemberModel = {
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
  isScheduleButtonDisabled = false;
  @ViewChild('updateMemberPopup') updateMemberPopup!: ElementRef;

  constructor(private memberService: MemberService, private modal: NgbModal) {
  }

  ngOnInit(): void {
    this.retrieveMembers();
  }

  retrieveMembers(): void {
    this.memberService.getAll()
      .subscribe({
        next: (data) => {
          this.data = data;
        },
        error: (e) => console.error(e)
      });
  }

  deleteMember(val: any): void {
    const details = {
      nic: val,
    };

    this.memberService.delete(details)
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
              text: 'Member NIC Not in the System',
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

  updatePopup(value: any): void {
    this.modelRef = this.modal.open(this.updateMemberPopup, {centered: true});

    const id = value;
    this.memberService.getMember(id).subscribe({
      next: (obj) => {
        console.log(obj);
        this.members = obj;
        console.log(this.members)
      },
    });

  }

  UpdateMember(): void {
    const dataUpdate: any = {
      phone: this.members.phone,
      nic: this.members.nic,
      age: this.members.age,
      gender: this.members.gender,
      height: this.members.height,
      weight: this.members.weight,
      bmi: this.members.bmi,
      workout_time: this.members.workout_time,
      workout_experience: this.members.workout_experience,
      fitness_goal: this.members.fitness_goal,
      schedule: this.members.schedule
    };


    console.log(dataUpdate.nic);
    this.memberService.updateMember(dataUpdate)
      .subscribe({
        next: (res) => {
          const successMessage = res['message_status'];
          if (successMessage === 'Success') {
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

  showLoadingAlert() {
    Swal.fire({
      title: 'Loading...',
      html: '<div class="spinner-border" role="status"><span class="sr-only">GENERATING A SCHEDULE...</span></div>',
      showConfirmButton: false,
      allowOutsideClick: false
    });
  }

  closeAlert() {
    Swal.close();
  }

  closePopup() {
    this.modelRef.close();
  }

  UpdateScheduleAI(): void {
    this.showLoadingAlert();
    const needData = {
      age: this.members.age,
      gender: this.members.gender,
      height: this.members.height,
      weight: this.members.weight,
      bmi: this.members.bmi,
      workout_time: this.members.workout_time,
      workout_experience: this.members.workout_experience,
      fitness_goal: this.members.fitness_goal,
    };
    this.memberService.getSchedule(needData)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.schedule_ex = res.scheduleValue;
          this.closeAlert();
          this.isScheduleButtonDisabled = true;
        },
        error: (err) => {
          console.error(err);
          this.closeAlert();
        }
      });

  }

  calculateBMI(): void {
    if (this.members.height && this.members.weight) {
      let heightInMeters = this.members.height / 100;
      this.members.bmi = (this.members.weight / (heightInMeters ** 2)).toFixed(1);
    }
  }
}
