import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modal-create-team',
  templateUrl: './modal-create-team.component.html',
  styleUrls: ['./modal-create-team.component.scss']
})
export class ModalCreateTeamComponent implements OnInit {
  codeteam: any;
  nameteam: any;
  detailteam: any;
  codeteamUpper: any;
  constructor(public dialogRef: MatDialogRef<ModalCreateTeamComponent>) { }

  ngOnInit() {
  }
  save() {
    console.log(this.codeteamUpper, this.nameteam, this.detailteam);
  }
  uppercase(e) {
    let uppercase: String = e.toUpperCase();
    console.log(uppercase)
    this.codeteamUpper = uppercase;
    // uppercase = uppercase.length >= 4 ? uppercase.substring(0, 4) : uppercase;
    // this.prefixUppercase = uppercase;
  }
  cancel() {
    this.dialogRef.close();
  }
}
