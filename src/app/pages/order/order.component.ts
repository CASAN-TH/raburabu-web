import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';
import { MatDialog } from '@angular/material';
import { SelectOptionComponent } from 'src/app/modal/select-option/select-option.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  address: any;

  constructor(
    private route: ActivatedRoute,
    private prodService: ProductsService,
    public dialog: MatDialog,
  ) { }

  prodData: any;

  ngOnInit() {
    let res: any = this.route.snapshot.paramMap.get('title');
    this.address = JSON.parse(res)
    console.log(this.address);
    this.getProd();
  }

  async getProd() {
    let res: any = await this.prodService.order();
    // console.log(res);
    this.prodData = res.data;
    console.log(this.prodData);
  }
  openmodal(i) {
    // console.log(i)
    const dialogRef = this.dialog.open(SelectOptionComponent, {
      width: '800px',
      data: i,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result)
      // if (result) {
      // this.router.navigate(['manage-member']);
      // }
    });
  }
}
