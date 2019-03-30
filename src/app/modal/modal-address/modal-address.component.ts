import { Component, OnInit, Output, EventEmitter, Input, Inject, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-modal-address',
  templateUrl: './modal-address.component.html',
  styleUrls: ['./modal-address.component.scss']
})
export class ModalAddressComponent implements OnInit {
  isLinear = false;
  @Output() dataCutomer: EventEmitter<any> = new EventEmitter();
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
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
  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModalAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public address: any = {},
    private orderService: OrderService,
    private cdRef: ChangeDetectorRef

  ) {
    this.firstFormGroup = this._formBuilder.group({
      tel: '',
      firstName: '',
      lastName: ''
    });
    this.secondFormGroup = this._formBuilder.group({
      houseno: '',
      village: '',
      street: '',
      subdistrict: '',
      district: '',
      province: '',
      zipcode: ''
    });
  }

  async ngOnInit() {
    this.getAddress()
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

  checkNumber(e) {
    console.log(e);
    let regEx = new RegExp(/^[0-9]+$/);
    if (!(regEx.test(e.key) || e.key === 'Backspace' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Shift' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
      this.data.tel = this.data.tel.substring(0, this.data.tel.length - 1);
    }
  }



}
