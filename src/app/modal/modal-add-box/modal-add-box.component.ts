import { MonitorService } from './../../services/monitor/monitor.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalConfirmsComponent } from '../modal-confirms/modal-confirms.component';

@Component({
  selector: 'app-modal-add-box',
  templateUrl: './modal-add-box.component.html',
  styleUrls: ['./modal-add-box.component.scss']
})
export class ModalAddBoxComponent implements OnInit {
  dataTeam: any;
  chkProduck: boolean = false
  trackno: any;
  dataLabel: any;
  useProduct: Array<any> = [];
  dataTeamOrder: any;
  constructor(
    private thisDialogRef: MatDialogRef<ModalConfirmsComponent>,
    @Inject(MAT_DIALOG_DATA) public data = {
      order_id: '', monitor_id: ''
    },
    private monitorService: MonitorService
  ) { }

  ngOnInit() {
    // console.log(this.data);
    this.getDataLabel();
    this.getMonitorByid();
  }
  async getDataLabel() {
    try {
      let res: any = await this.monitorService.getLabel(this.data.order_id);
      this.dataLabel = res.data;
      console.log(this.dataLabel)
    } catch (error) {

    }
  }
  async getMonitorByid() {
    try {
      let respTeam: any = await this.monitorService.getMonitor(this.data.monitor_id);
      this.dataTeam = respTeam.data;
      console.log(this.dataTeam)
    } catch (error) {

    }

  }

  selectProduct(e, item, i) {
    this.chkProduck = e.checked
    console.log(this.chkProduck);
    console.log(this.useProduct);
    if (this.chkProduck === true) {
      this.useProduct.push(item)
      this.dataLabel.productall[i].active = true
    } else {
      let j = this.useProduct.findIndex(function (data) { return data.name === item.name })
      console.log(j)
      this.useProduct.splice(j, 1);
      this.dataLabel.productall[i].active = false
    }
  }
  async confirmLabel() {
    console.log(this.dataTeam);
    let order_id = this.data.order_id
    console.log(order_id);
    this.dataTeamOrder = this.dataTeam
    try {
      let res = this.dataTeamOrder.orders.findIndex(function (order) {
        console.log(order._id)
        return order._id === order_id
      })
      console.log(res);
      let data = {
        trackno: this.trackno,
        customer: {
          firstname: this.dataLabel.customer.firstname,
          lastname: this.dataLabel.customer.lastname
        },
        address: {
          houseno: this.dataLabel.customer.address.houseno,
          village: this.dataLabel.customer.address.village,
          street: this.dataLabel.customer.address.street,
          subdistrict: this.dataLabel.customer.address.subdistrict,
          district: this.dataLabel.customer.address.district,
          province: this.dataLabel.customer.address.province,
          zipcode: this.dataLabel.customer.address.zipcode
        },
        productlist: this.useProduct
      }
      this.dataTeamOrder.orders[res].labels.push(data)
      console.log(this.dataTeamOrder);
      let resp = await this.monitorService.saveLabel(this.data.monitor_id, this.dataTeamOrder);
      this.thisDialogRef.close('clse');

      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  }
}
