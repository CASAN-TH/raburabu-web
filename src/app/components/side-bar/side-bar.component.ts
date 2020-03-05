import { ModalProfileComponent } from './../../modal/modal-profile/modal-profile.component';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'ng6-md-auth';
import { Router } from '@angular/router';
import { SideBarService } from './side-bar.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material';
import { TeameServiceService } from 'src/app/services/teams-service/teame-service.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  userAuth: any;
  userData: any;


  constructor(
    private userAuthSrv: AuthService,
    private router: Router,
    public sidenavService: SideBarService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    public teameService: TeameServiceService,
  ) {
    this.userAuthSrv.isLoggedIn.subscribe(value => {
      this.userAuth = this.userAuthSrv.user;
    });
    this.userAuth = this.userAuthSrv.user;
  }

  async ngOnInit() {
    const token = window.localStorage.getItem(`token@${environment.appName}-${environment.environment}`);
    if (token) {
      let res: any = await this.teameService.me();
      console.log(res);
      if (res) {
        this.userAuth = res.data
        console.log(this.userAuth);
      }
    }

  }

  onManageMember() {
    this.router.navigate(["/manage-member"]);
  }

  onLogout() {
    this.userAuthSrv.logout();
    this.router.navigate(["/login"]);
    window.localStorage.clear();
  }

  onOrderList() {
    this.router.navigate(["/order-list"]);
  }

  onImport() {
    this.router.navigate(["/import-orders"]);
  }

  onMonitoring() {
    this.router.navigate(["/order-list"]);
  }

  onManageTeam() {
    this.router.navigate(["/admin-manage-team"]);
  }

  onManageProduct() {
    this.router.navigate(["/admin-manage-product"]);
  }

  onMonitor() {
    this.router.navigate(["/monitor"]);
  }
  onGraph() {
    this.router.navigate(["/graph-all"]);

  }
  onGetProfile() {
    const dialogRef = this.dialog.open(ModalProfileComponent, {
      width: '800px',
      // height: '500px',
      // data: this.address,
      disableClose: false
    });
    // dialogRef.componentInstance.dataCutomer.subscribe(data => {
    // console.log(data);
    // this.address = data;
    // });
  }

}
