import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-report-detail',
  templateUrl: './order-report-detail.component.html',
  styleUrls: ['./order-report-detail.component.scss']
})
export class OrderReportDetailComponent implements OnInit {

  constructor(
    private router: Router,

  ) { }

  ngOnInit() {
  }
  goBack() {
    this.router.navigate(['/monitor']);
  }
}
