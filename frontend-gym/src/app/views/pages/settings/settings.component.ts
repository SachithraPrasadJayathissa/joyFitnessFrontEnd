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

  data?: MemberModel[];
  modelRef: any;
    member: MemberModel = {
        nic: ''
    };

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

  deleteMember(val:any): void {
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
        this.modelRef = this.modal.open(this.updateMemberPopup, { centered: true });

      const id=value;
      this.memberService.getMember(id).subscribe({
        next: (res) => {
          console.log(res);
        },
      });

    }

  closePopup(){
    this.modelRef.close();
  }
}
