import { Component, OnInit, Output, EventEmitter, Input, Inject, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatStepper } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order/order.service';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-modal-address',
  templateUrl: './modal-address.component.html',
  styleUrls: ['./modal-address.component.scss']
})
export class ModalAddressComponent implements OnInit {
  @Output() dataCutomer: EventEmitter<any> = new EventEmitter();
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  data: any = {
    tel: '',
    firstname: '',
    lastname: '',
    address:
    {
      houseno: '',
      village: '',
      street: '',
      subdistrict: '',
      district: '',
      province: '',
      zipcode: ''
    }
  }


  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  postnumPattern = "^((91-?)|0)?[0-9]{5}$";
  customersData: any;
  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModalAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public address: any = {},
    private orderService: OrderService,
    private customerService: CustomerService,
    private cdRef: ChangeDetectorRef

  ) {
    this.firstFormGroup = this._formBuilder.group({
      tel: ['', Validators.pattern(this.mobnumPattern)]
    });
    this.secondFormGroup = this._formBuilder.group({
      firstName: '',
      lastName: '',
      houseno: '',
      village: '',
      street: '',
      subdistrict: '',
      district: '',
      province: '',
      zipcode: ['', Validators.pattern(this.postnumPattern)]
    });

  }

  async ngOnInit() {

    this.getCustomers();
    this.getAddress()
  }

  async getCustomers() {

    try {
      let res: any = await this.customerService.customerList();
      console.log(res.data);
      this.customersData = res.data;

    } catch (error) {
      console.log(error);

    }

  }

  async getAddress() {
    if (this.address) {
      // console.log(this.address);
      this.data.tel = this.address.tel;
      this.data.firstname = this.address.firstname;
      this.data.lastname = this.address.lastname;
      this.data.address = this.address.address;
    }
    this.cdRef.detectChanges();
  }

  next() {
    // console.log(this.data);
    this.dataCutomer.emit(this.data);
    this.dialogRef.close('clse');
  }

  exit() {
    this.dialogRef.close();
  }

  goForward(stepper: MatStepper) {
    console.log(this.data);
    var a = 0;
    if (this.customersData.length > 0) {
      this.customersData.forEach(cust => {
        a += 1;
        if (cust.tel === this.data.tel) {
          this.data.firstname = cust.firstname;
          this.data.lastname = cust.lastname;
          this.data.address = cust.address[cust.address.length - 1];
        }
        if (a = this.customersData.length) {
          stepper.next();
        }
      });
    } else {
      stepper.next();
    }
  }

  checkNumber(e) {
    // console.log(e);
    let regEx = new RegExp(/^[0-9]+$/);
    if (!(regEx.test(e.key) || e.key === 'Backspace' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Shift' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
      this.data.tel = this.data.tel.substring(0, this.data.tel.length - 1);
    }
  }



}
