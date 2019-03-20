import { ModalConfirmsComponent } from './../../modal/modal-confirms/modal-confirms.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { TeameServiceService } from 'src/app/services/teams-service/teame-service.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-admin-manage-team',
  templateUrl: './admin-manage-team.component.html',
  styleUrls: ['./admin-manage-team.component.scss']
})
export class AdminManageTeamComponent implements OnInit {
  waitApprove: Array<any> = [];
  approve: Array<any> = [];
  dataTeam: any;

  constructor(
    public teameService: TeameServiceService,
    public ngXspinner: NgxSpinnerService,
    public dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.getTeam();
  }

  async getTeam() {
    this.ngXspinner.show();
    try {
      let res: any = await this.teameService.getTeam();
      this.dataTeam = res.data;
      this.dataTeam.forEach(data => {
        // console.log(waitApprove)
        if (data.status === 'waitapprove') {
          this.waitApprove.push(data);
          console.log(this.waitApprove);

        } else if (data.status === 'approve') {
          this.approve.push(data);
          console.log(this.approve);
        }
        this.ngXspinner.hide();
      });
      console.log(res);
    } catch (error) {
      this.ngXspinner.hide();

    }
  }

  async onApprove(item) {
    // this.ngXspinner.show();

    try {
      const dialogRef = this.dialog.open(ModalConfirmsComponent, {
        width: '400px',
        data: { message: "ต้องการอนุมัติทีมใช่หรือไม่?" },
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result) {
          let body = {
            status: 'approve'
          }
          // console.log(item);
          let res: any = await this.teameService.adminManageTeam(item._id, body);
          console.log(res);
          this.waitApprove = [];
          this.approve = [];
          this.getTeam();
        }
      });

    } catch (error) {

    }

  }

  async onReject(item) {
    try {
      const dialogRef = this.dialog.open(ModalConfirmsComponent, {
        width: '400px',
        data: { message: "ต้องการอนุมัติทีมใช่หรือไม่?" },
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result) {
          let body = {
            status: 'reject'
          }
          // console.log(item);
          let res: any = await this.teameService.adminManageTeam(item._id, body);
          console.log(res);
          this.waitApprove = [];
          this.approve = [];
          this.getTeam();
        }
      });
    } catch (error) {

    }

  }

}
