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
  dataCheckOpt: any;
  onCheck: boolean = false
  selectData: Array<any> = [];
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
      order_id: '', monitor_id: '', label_id: '', box: null
    },
    private monitorService: MonitorService
  ) { }

  ngOnInit() {
    console.log(this.data.order_id);
    this.getDataLabel();
    this.getMonitorByid();

  }

  async getDataLabel() {
    try {
      let res: any = await this.monitorService.getMonitorAll()
      console.log(res);
      res.data.forEach(data => {
        if (data.status === 'waitpack') {
          data.orders.forEach(order => {
            if (order) {
              order.labels.forEach(labels => {
                if (labels._id === this.data.label_id) {
                  this.dataLabel = labels
                }
              });
            }
          });
        }
      });
      // this.protoData = res.data;
      // this.dataLabel = res.data;
      console.log(this.dataLabel)
    } catch (error) {

    }
  }

  async getMonitorByid() {
    try {
      let respTeam: any = await this.monitorService.getMonitor(this.data.monitor_id);
      this.dataTeam = respTeam.data;
      // console.log(this.dataTeam)
    } catch (error) {
      console.log(error);
    }
  }

  async keyQty(e, i, j, k) {
    let value = parseInt(e)
    let res: any = await this.monitorService.getLabel(this.data.order_id);
    this.protoData = res.data;
    if (!this.protoData.productall[i].qtyAll) {
      if (value > this.protoData.productall[i].qty) {
        this.dataLabel.productall[i].qty = this.protoData.productall[i].qty
      } else if (value == 0) {
        this.dataLabel.productall[i].qty = 1
      } else {
        let number = Number.isNaN(value);
        if (!number) {
          this.dataLabel.productall[i].qty = parseInt(e)
        }
      }
    }
    if (this.protoData.productall[i].qtyAll) {
      if (value > this.protoData.productall[i].qtyAll) {
        this.dataLabel.productall[i] = this.protoData.productall[i]
      } else if (value == 0) {
        let data = {
          name: this.dataLabel.productall[i].name,
          qty: this.dataLabel.productall[i].qty,
          qtyAll: 1
        }
        this.dataLabel.productall[i] = data
      } else {
        let number = Number.isNaN(value);
        if (!number) {
          this.dataLabel.productall[i].qtyAll = parseInt(e)
        }
      }
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
      // console.log(this.dataTeamOrder);
    } catch (error) {
      console.log(error);
    }
  }
  selectAll() {
    console.log('all');
    this.dataLabel.productlist.forEach(product => {
      product.active = this.onCheck
      product.option.forEach(option => {
        // option.active = this.onCheck
        option.value.forEach(value => {
          value.active = this.onCheck
        });
      });
      if (this.onCheck) {
        this.selectData.push(product)
      } else {
        this.selectData.forEach(res => {
          let l = this.selectData.findIndex((data) => { return data.name === product.name })
          this.selectData.splice(l, 1)

        })
      }

    });
    console.log(this.selectData)
  }
  selectProduct(e, item, i, j, k) {
    console.log(item)
    item.qty = parseInt(item.qty);
    this.chkProduck = false;
    if (e.checked === true) {
      this.useProduct.push({
        name: item.name,
        qty: item.qty
      })
      this.dataLabel.productlist[i].option[j].value[k].active = true
      this.selectData.push(item)
    } else {
      let u = this.useProduct.findIndex(function (data) { return data.name === item.name })
      this.useProduct.splice(u, 1);
      this.dataLabel.productlist[i].option[j].value[k].active = false
      this.selectData.forEach(res => {
        if (res.name === item.name) {
          let l = this.selectData.findIndex((data) => { return data.name === item.name })
          this.selectData.splice(l, 1)
        }
        console.log(res)
      })
    }
    this.dataLabel.productlist.forEach(data => {
      data.option.forEach(dataOpt => {
        dataOpt.value.forEach(dataVal => {
          if (dataVal.active === true) {
            this.chkProduck = true
          }
        });
      });
    });
    console.log(this.dataLabel)
    console.log(this.selectData)
    this.checkValue()
  }
  selectProductlist(item) {
    console.log(item)
    this.dataCheckOpt = item
    item.option.forEach(option => {
      if (item.active === true) {
        option.active = true
      } else {
        option.active = false
      }
      option.value.forEach(value => {
        if (item.active === true) {
          value.active = true
        } else {
          value.active = false
        }
      });
      if (option.active === true) {
        this.selectData.push(option)
      } else {
        this.selectData.forEach(res => {
          let l = this.selectData.findIndex((data) => { return data.name === option.name })
          this.selectData.splice(l, 1)
        })
      }
      console.log(this.selectData);
    });
    this.checkSelectAll();
  }
  checkSelectAll() {
    let opt = []
    console.log(this.dataCheckOpt)
    this.dataLabel.productlist.forEach(pro => {
      opt.push(pro)
      console.log(pro)
    });
    if (this.selectData.length >= opt.length) {
      this.onCheck = true
    } else {
      this.onCheck = false
    }
  }
  checkValue() {
    console.log(this.selectData);
    // if () {

    // }
  }
}
