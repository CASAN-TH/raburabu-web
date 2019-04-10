import { filter } from 'rxjs/operator/filter';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterKeyword'
})
export class FilterKeywordPipe implements PipeTransform {

  transform(items: any = [], filter: string): any {
    // console.log(filter);
    console.log(items);
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    if (items) {
      let res1: any = items.filter(item => item.monitorno.indexOf(filter) !== -1);
      if (res1.length < 1) {
        let res2: any = [];
        items.forEach(itm => {
          let resOrder: any = itm.orders.filter(it => it.orderno.indexOf(filter) !== -1);
          // console.log(resOrder);
          if (resOrder.length > 0) {
            resOrder.forEach(resO => {
              res2.push(itm);
            });
          }
        });
        console.log(res2);
        if (res2.length < 1) {
          let res3: any = [];
          if (res3.length < 1) {
            items.forEach(itm => {
              let resTel: any = itm.orders.filter(it => it.customer.tel.indexOf(filter) !== -1);
              console.log(resTel);
              if (resTel.length > 0) {
                resTel.forEach(resT => {
                  res3.push(itm);
                });
              }
            });
            if (res3.length < 1) {
              console.log('w');
            } else {
              return res3
            }
          }
        } else {
          return res2
        }
      } else {
        return res1
      }
      console.log();
      // return result
    }

  }

}
