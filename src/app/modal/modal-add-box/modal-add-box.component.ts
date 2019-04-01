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
  keyDataQty: any;
  dataTeam: any;
  chkProduck: boolean = false
  trackno: any;
  dataLabel: any;
  useProduct: Array<any> = [];
  dataTeamOrder: any;
  protoData: any;
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
      // this.protoData = res.data;
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
  async keyQty(e, i) {
    let value = parseInt(e)
    let res: any = await this.monitorService.getLabel(this.data.order_id);
    this.protoData = res.data;
    console.log(this.protoData);
    if (!this.protoData.productall[i].qtyAll) {
      if (value > this.protoData.productall[i].qty) {
        this.dataLabel.productall[i].qty = this.protoData.productall[i].qty
        // this.keyDataQty = this.protoData.productall[i].qty
      } else {
        this.dataLabel.productall[i].qty = parseInt(e)
      }
    }
    if (this.protoData.productall[i].qtyAll) {
      if (value > this.protoData.productall[i].qtyAll) {
        this.dataLabel.productall[i] = this.protoData.productall[i]
        // this.keyDataQty = this.protoData.productall[i].qtyAll
      } else {
        this.dataLabel.productall[i].qtyAll = parseInt(e)
      }
    }
  }

  selectProduct(e, item, i) {
    item.qty = parseInt(item.qty);
    console.log(item);
    this.chkProduck = e.checked
    if (this.chkProduck === true) {
      this.useProduct.push({
        name: item.name,
        qty: item.qtyAll ? item.qtyAll : item.qty
      })
      this.dataLabel.productall[i].active = true
      console.log(this.useProduct);
    } else {
      let j = this.useProduct.findIndex(function (data) { return data.name === item.name })
      this.useProduct.splice(j, 1);
      this.dataLabel.productall[i].active = false
      console.log(this.useProduct);
    }
  }

  async confirmLabel() {
    let order_id = this.data.order_id
    this.dataTeamOrder = this.dataTeam
    try {
      let res = this.dataTeamOrder.orders.findIndex(function (order) {
        return order._id === order_id
      })
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
      let resp = await this.monitorService.saveLabel(this.data.monitor_id, this.dataTeamOrder);
      // console.log(resp);
      this.thisDialogRef.close('clse');
    } catch (error) {
      console.log(error);
    }
  }
}
