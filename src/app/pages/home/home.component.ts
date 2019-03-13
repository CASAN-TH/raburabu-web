import { Router } from '@angular/router';
import { ModalCreateTeamComponent } from './../../modal/modal-create-team/modal-create-team.component';
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ModalCreateMemberComponent } from 'src/app/modal/modal-create-member/modal-create-member.component';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit() { }
  openDialog(): void {
    const dialogRef = this.dialog.open(ModalCreateTeamComponent, {
      width: '800px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result)
      if (result) {
        this.router.navigate(['manage-member']);
      }
    });
  }

  createmember() {
    const dialogRef = this.dialog.open(ModalCreateMemberComponent, {
      width: '800px',
      height: '270px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.router.navigate(['manage-member']);
      }
    });
  }
}
