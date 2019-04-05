import { SideBarService } from './components/side-bar/side-bar.service';
import { Component, ViewChild, ElementRef, ChangeDetectorRef } from "@angular/core";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  @ViewChild('appDrawer') appDrawer: ElementRef;
  mode = 'over';
  opened = false;
  currentPage: any;

  constructor(
    public sidenavService: SideBarService,
    private changeDetectorRef: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        // console.log(e.url);
        this.currentPage = e.url;
        console.log(this.currentPage);
      }
    });
  }

  ngAfterViewInit() {
    this.sidenavService.appDrawer = this.appDrawer;
  }
}
