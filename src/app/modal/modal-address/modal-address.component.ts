import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modal-address',
  templateUrl: './modal-address.component.html',
  styleUrls: ['./modal-address.component.scss']
})
export class ModalAddressComponent implements OnInit {
  @Output() dataCutomer:EventEmitter<any> = new EventEmitter();
  data: {
    tel: any;
    fname: any;
    lname: any;
    address: any;
  }

  constructor(
    public dialogRef: MatDialogRef<ModalAddressComponent>,
  ) { }

  ngOnInit() {
  }
  next() {
    this.dataCutomer.emit(this.data);
    // this.dialogRef.close('clse');
  }
}
