import { MonitorService } from './../../services/monitor/monitor.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modal-max-box',
  templateUrl: './modal-max-box.component.html',
  styleUrls: ['./modal-max-box.component.scss']
})
export class ModalMaxBoxComponent implements OnInit {
  order_id: any;
  dataProductInbox: any;
  dataTeam: any;
  constructor(
    private monitorService: MonitorService,
    private thisDialogRef: MatDialogRef<ModalMaxBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data = {
      order_id: '', monitor_id: ''
    },
  ) { }

  ngOnInit() {
    console.log(this.data.order_id)
    this.getMonitorByid();
  }
  async getMonitorByid() {
    try {
      let respTeam: any = await this.monitorService.getMonitor(this.data.monitor_id);
      this.dataTeam = respTeam.data;
      this.dataTeam.orders.forEach(order => {
        if (this.data.order_id === order._id) {
          this.dataProductInbox = order.labels
        }
      });
      console.log(this.dataProductInbox)

    } catch (error) {

    }

  }
}
