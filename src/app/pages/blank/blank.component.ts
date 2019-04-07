import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.scss']
})
export class BlankComponent implements OnInit {

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    let res: any = JSON.parse(window.localStorage.getItem(environment.apiUrl + '@user'));
    // console.log(res);
    if (res && res.data) {
      if (res.data.roles[0] === 'user') {
        if (res.data.ref1) {
          if (res.data.ref1 === '') {
            this.router.navigate(["/home"]);
          } else {
            this.router.navigate(["/manage-member"]);
          }
        } else {
          this.router.navigate(["/home"]);
        }
      }
      if (res.data.roles[0] === 'stockstaff') {
        this.router.navigate(["/monitor"]);
      }
      if (res.data.roles[0] === 'packstaff') {
        this.router.navigate(["/monitor"]);
      }
      if (res.data.roles[0] === 'admin') {
        this.router.navigate(["/admin-manage-team"]);
      }
      if (res.data.roles[0] === 'owner') {
        this.router.navigate(["/manage-member"]);
      }
      if (res.data.roles[0] === 'staff') {
        this.router.navigate(["/order-list"]);
      }
    } else {
      this.router.navigate(["/login"]);
    }
  }

}
