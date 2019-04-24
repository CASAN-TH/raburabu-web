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
  dataValue: Array<any> = [];
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
  chkSelect: Array<any> = [];
  valueOption: Array<any> = [];
  prodData: Array<any> = [];
  constructor(
    private thisDialogRef: MatDialogRef<ModalConfirmsComponent>,
    @Inject(MAT_DIALOG_DATA) public data = {
      order_id: '', monitor_id: '', label_id: '', box: null
    },
    private monitorService: MonitorService
  ) { }

  ngOnInit() {
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
      console.log(this.dataLabel);
    } catch (error) {

    }
  }

  async getMonitorByid() {
    try {
      let respTeam: any = await this.monitorService.getMonitor(this.data.monitor_id);
      this.dataTeam = respTeam.data;
    } catch (error) {
      console.log(error);
    }
  }

  async keyQty(e, i, j, k) {
    // let value = parseInt(e)
    // let res: any = await this.monitorService.getLabel(this.data.order_id);
    // this.protoData = res.data;
    // if (!this.protoData.productall[i].qtyAll) {
    //   if (value > this.protoData.productall[i].qty) {
    //     this.dataLabel.productall[i].qty = this.protoData.productall[i].qty
    //   } else if (value == 0) {
    //     this.dataLabel.productall[i].qty = 1
    //   } else {
    //     let number = Number.isNaN(value);
    //     if (!number) {
    //       this.dataLabel.productall[i].qty = parseInt(e)
    //     }
    //   }
    // }
    // if (this.protoData.productall[i].qtyAll) {
    //   if (value > this.protoData.productall[i].qtyAll) {
    //     this.dataLabel.productall[i] = this.protoData.productall[i]
    //   } else if (value == 0) {
    //     let data = {
    //       name: this.dataLabel.productall[i].name,
    //       qty: this.dataLabel.productall[i].qty,
    //       qtyAll: 1
    //     }
    //     this.dataLabel.productall[i] = data
    //   } else {
    //     let number = Number.isNaN(value);
    //     if (!number) {
    //       this.dataLabel.productall[i].qtyAll = parseInt(e)
    //     }
    //   }
    // }
  }

  async confirmLabel() {
    try {
      let body = {
        productlist: this.prodData
      }
      console.log(body);
      let resp = await this.monitorService.addLabel(this.data.order_id, body)
      if (resp) {
        this.thisDialogRef.close('clse');
      }
    } catch (error) {
      console.log(error);
    }
  }

  selectAll() {
    this.selectData = [];
    this.prodData = [];
    this.dataLabel.productlist.forEach(product => {
      product.active = this.onCheck
      product.option.forEach(option => {
        option.value.forEach(value => {
          value.active = this.onCheck
        });
      });
      console.log(product);
      if (this.onCheck) {
        this.selectData.push(product)
        this.prodData.push({
          name: product.name,
          option: [{
            name: product.option[0].name,
            value: product.option[0].value
          }]
        })
      } else {
        this.selectData.forEach(res => {
          let l = this.selectData.findIndex((data) => { return data.name === product.name })
          this.selectData.splice(l, 1)
        });
        this.prodData = [];
      }
    });
    console.log(this.prodData);
    this.checkSelectAll()
  }

  selectProduct(e, item, i, j, k, option, product) {
    this.valueOption = []
    let optionName: '';
    if (e.checked === true) {
      this.dataLabel.productlist[i].option[j].value[k].active = true
      product.option.forEach(opt => {
        optionName = opt.name
        opt.value.forEach(val => {
          if (val.active === true) {
            this.valueOption.push(val)
          }
        });
      });
    } else {
      let u = this.useProduct.findIndex(function (data) { return data.name === item.name })
      this.useProduct.splice(u, 1);
      this.dataLabel.productlist[i].option[j].value[k].active = false
      this.valueOption.forEach(valueO => {
        if (valueO.name === item.name) {
          let l = this.valueOption.findIndex((data) => { return data.name === item.name })
          this.valueOption.splice(l, 1)
        }
      })
    }
    let data = {
      name: product.name,
      option: [{
        name: optionName,
        value: this.valueOption
      }]
    }
    let chkValue = []
    data.option.forEach(option => {
      chkValue = option.value
    })
    if (chkValue.length >= option.value.length) {
      this.selectData.push(data)
    } else {
      this.selectData.forEach(selData => {
        selData.option[0].value.forEach(val => {
          if (val.name === item.name) {
            let l = selData.option[0].value.findIndex((data) => { return data.name === item.name })
            if (l >= 0) {
              let m = this.selectData.findIndex((dataSelect) => { return dataSelect.name === selData.name })
              if (m >= 0) {
                this.selectData.splice(m, 1)
              }
            }
          }
        });
      });
    }
    this.checkValue()
    this.selectProdData(e, item, i, j, k, option, product)
  }

  selectProdData(e, item, i, j, k, option, product) {
    console.log(item);
    console.log(product);
    if (item.active === false) {
      let indexProd = this.prodData.findIndex(function (data) { return data.name === product.name });
      console.log(indexProd);
      let vOption = [];
      if (indexProd >= 0) {
        let iV = 0;
        const lengthArray = product.option[0].value.length;
        product.option[0].value.forEach(v => {
          if (v.active === true) {
            vOption.push(v)
          }
          iV++;
        });
        console.log(vOption);
        this.prodData[indexProd].option[0].value = vOption
        if (this.prodData[indexProd].option[0].value.length < 1) {
          this.prodData.splice(indexProd, 1)
        }
      }
    } else if (item.active === true) {
      let indexProd = this.prodData.findIndex(function (data) { return data.name === product.name })
      let vOption = [];
      if (indexProd >= 0) {
        let iV = 0;
        const lengthArray = product.option[0].value.length;
        product.option[0].value.forEach(v => {
          if (v.active === true) {
            vOption.push(v)
          }
          iV++;
        });
        if (lengthArray === iV) {
          this.prodData[indexProd].option[0].value = vOption
        }
      } else {
        let iV = 0;
        const lengthArray = product.option[0].value.length;
        product.option[0].value.forEach(v => {
          if (v.active === true) {
            vOption.push(v)
          }
          iV++;
        });
        if (lengthArray === iV) {
          this.prodData.push({
            name: product.name,
            option: [{
              name: product.option[0].name,
              value: vOption
            }]
          })
        }
      }
    }
    console.log(this.prodData);
  }

  selectProductlist(item, i) {
    if (item.name === this.dataLabel.productlist[i].name) {
      this.dataLabel.productlist[i].option.forEach(option => {
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
          this.selectData.push(this.dataLabel.productlist[i]);
        } else {
          this.selectData.forEach(res => {
            let l = this.selectData.findIndex((data) => { return data.name === this.dataLabel.productlist[i].name });
            console.log(l);
            if (l >= 0) {
              this.selectData.splice(l, 1)
            }
          })
        }
      });
    }
    this.checkSelectAll();
    this.selectProdListData(item);
  }

  selectProdListData(item) {
    console.log(item);
    let iProd = this.prodData.findIndex((data) => { return data.name === item.name });
    console.log(iProd);
    if (item.active === true) {
      if (iProd >= 0) {
        this.prodData[iProd].option = []
        this.prodData[iProd].option.push({
          name: item.option[0].name,
          value: item.option[0].value
        })
      } else {
        this.prodData.push({
          name: item.name,
          option: [{
            name: item.option[0].name,
            value: item.option[0].value
          }]
        })
      }
    } else {
      if (iProd >= 0) {
        this.prodData.splice(iProd, 1);
      }
    }
    console.log(this.prodData);
  }

  checkForSelectAll() {
    let opt = []
    this.dataLabel.productlist.forEach(pro => {
      opt.push(pro)
    });
    if (this.selectData.length >= opt.length) {
      this.dataLabel.productlist.forEach(pro => {
        if (pro.active === true) {
          this.onCheck = true
        }
      });
    } else {
      this.dataLabel.productlist.forEach(pro => {
        if (pro.active === false) {
          this.onCheck = false
        }
      });
    }
  }

  checkSelectAll() {
    let opt = []
    this.dataLabel.productlist.forEach(pro => {
      opt.push(pro)
    });
    if (this.selectData.length >= opt.length) {
      this.dataLabel.productlist.forEach(pro => {
        if (pro.active === true) {
          this.onCheck = true
        }
      });

    } else {
      this.dataLabel.productlist.forEach(pro => {
        if (pro.active === true) {
          this.onCheck = false
        }
      });
    }
  }

  checkValue() {
    this.dataValue = []
    let nameSelect = '';
    let nameProduct = '';
    let chkData = '';
    if (this.selectData.length > 0) {
      this.selectData.forEach(selData => {
        chkData = selData.option[0].value;
        nameSelect = selData.name
      });

      this.dataLabel.productlist.forEach(product => {
        if (nameSelect === product.name) {
          nameProduct = product.name;
          product.option[0].value.forEach(val => {
            this.dataValue.push(val)
          });
        }
      });
      if (nameSelect === nameProduct && chkData.length >= this.dataValue.length) {
        this.dataLabel.productlist.forEach(pro => {
          if (nameSelect === pro.name) {
            pro.active = true
          }
        });
      }
    } if (this.selectData.length !== this.dataLabel.productlist.length) {
      this.dataLabel.productlist.forEach(pro => {
        if (nameSelect !== pro.name) {
          pro.active = false
        }
      });
    }
    this.checkSelectAll()
  }

}

