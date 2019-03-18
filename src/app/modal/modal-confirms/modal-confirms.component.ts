import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-confirms',
  templateUrl: './modal-confirms.component.html',
  styleUrls: ['./modal-confirms.component.scss']
})
export class ModalConfirmsComponent implements OnInit {

  constructor(
    private thisDialogRef: MatDialogRef<ModalConfirmsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  onClickOk() {
    this.thisDialogRef.close('confirm');
  }
  onClickCancel() {
    this.thisDialogRef.close();
  }
}
