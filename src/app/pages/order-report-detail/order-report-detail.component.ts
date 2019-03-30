import { NgxSpinnerService } from 'ngx-spinner';
import { MonitorService } from './../../services/monitor/monitor.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-report-detail',
  templateUrl: './order-report-detail.component.html',
  styleUrls: ['./order-report-detail.component.scss']
})
export class OrderReportDetailComponent implements OnInit {
  moniter_id: any;
  dataReport: any;

  constructor(
    private router: Router,
    private monitorService: MonitorService,
    private route: ActivatedRoute,
    public ngxSpinner: NgxSpinnerService



  ) { }

  ngOnInit() {
    let id: any = this.route.snapshot.paramMap.get('id');
    this.moniter_id = id;
    console.log(this.moniter_id);
    this.getDataReport();

  }
  goBack() {
    this.router.navigate(['/monitor']);
  }
  async getDataReport() {
    this.ngxSpinner.show();
    try {
      let res: any = await this.monitorService.getReportMonitorById(this.moniter_id);
      this.dataReport = res.data;
      console.log(res);
      this.ngxSpinner.hide();
    } catch (error) {
      this.ngxSpinner.hide();
    }
  }
}
