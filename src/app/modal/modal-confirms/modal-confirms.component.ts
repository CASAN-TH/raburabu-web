import { NgxSpinnerService } from 'ngx-spinner';
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
    public ngxSpinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  onClickOk() {
    this.thisDialogRef.close('confirm');
    this.ngxSpinner.show();
  }
  onClickCancel() {
    this.thisDialogRef.close();
  }
}
