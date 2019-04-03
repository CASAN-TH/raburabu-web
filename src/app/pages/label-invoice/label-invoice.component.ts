import { PrintService } from './../../services/print/print.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-label-invoice',
  templateUrl: './label-invoice.component.html',
  styleUrls: ['./label-invoice.component.scss']
})
export class LabelInvoiceComponent implements OnInit {
  invoiceIds: string[];
  invoiceDetails: Promise<any>[];
  constructor(
    private route: ActivatedRoute,
    private printService: PrintService
  ) {
    this.invoiceIds = route.snapshot.params['invoiceIds']
      .split(',');
  }

  ngOnInit() {
    console.log(this.invoiceIds)
    // setTimeout(window.print);
    this.invoiceDetails = this.invoiceIds
      .map(id => this.getInvoiceDetails(id));
    Promise.all(this.invoiceDetails)
      .then(() => this.printService.onDataReadyLabel());
  }
  getInvoiceDetails(invoiceId) {
    const amount = Math.floor((Math.random() * 100));
    return new Promise(resolve =>
      setTimeout(() => resolve({ amount }), 1000)
    );
  }
}
