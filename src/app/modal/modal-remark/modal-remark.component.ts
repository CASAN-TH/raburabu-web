import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modal-remark',
  templateUrl: './modal-remark.component.html',
  styleUrls: ['./modal-remark.component.scss']
})
export class ModalRemarkComponent implements OnInit {
  @Output() outPutRemark: EventEmitter<any> = new EventEmitter();
  remark: any;
  constructor(
    public dialogRef: MatDialogRef<ModalRemarkComponent>,
      ) { }
  ngOnInit() {
  }
  confirm() {
    this.outPutRemark.emit(this.remark);
    this.dialogRef.close()
  }
}
