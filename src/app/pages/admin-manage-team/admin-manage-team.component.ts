import { ModalConfirmsComponent } from './../../modal/modal-confirms/modal-confirms.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { TeameServiceService } from 'src/app/services/teams-service/teame-service.service';
import { MatDialog } from '@angular/material';
import { ModalRemarkComponent } from 'src/app/modal/modal-remark/modal-remark.component';

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
    // this.ngXspinner.hide()
    this.ngXspinner.show();
    this.getTeam();
  }

  async getTeam() {
    try {
      let res: any = await this.teameService.getTeam();
      // console.log(res);
      if (res.data.length > 0) {
        this.dataTeam = res.data;
        this.dataTeam.forEach(data => {
          if (data.status === 'waitapprove') {
            this.waitApprove.push(data);
          } else if (data.status === 'approve') {
            this.approve.push(data);
          }
          this.ngXspinner.hide();
        });
      } else {
        this.ngXspinner.hide();
      }
    } catch (error) {
      this.ngXspinner.hide();
      console.log(error);
    }
  }

  async onApprove(item) {
    try {
      const dialogRef = this.dialog.open(ModalConfirmsComponent, {
        width: '400px',
        data: {
          title: "อนุมัติการสร้างทีม",
          message: "ต้องการอนุมัติการสร้างทีมใช่หรือไม่?"
        },
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result) {
          let body = {
            status: 'approve'
          }
          let res: any = await this.teameService.adminManageTeam(item._id, body);
          this.waitApprove = [];
          this.approve = [];
          this.getTeam();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async onReject(item) {
    try {
      const dialogRef = this.dialog.open(ModalRemarkComponent, {
        width: '400px',
        data: {
          title: "ปฏิเสธการสร้างทีม",
          message: "ต้องการปฏิเสธการสร้างทีมใช่หรือไม่?"
        },
        disableClose: true
      });
      dialogRef.componentInstance.outPutRemark.subscribe(async result => {
        // console.log(result)
        if (result) {
          let body = {
            status: 'reject',
            remark: result
          }
          // console.log(body);
          let res: any = await this.teameService.adminManageTeam(item._id, body);
          // console.log(res);
          this.waitApprove = [];
          this.approve = [];
          this.getTeam();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

}
