import { filter } from 'rxjs/operator/filter';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterKeyword'
})
export class FilterKeywordPipe implements PipeTransform {

  transform(items: any = [], filter: string): any {
    // console.log(filter);
    // console.log(items);
    if (!filter || !items) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    if (items) {
      let res1: any = items.filter(item => item.monitorno.indexOf(filter) !== -1);
      // console.log(res1)
      if (res1.length < 1) {
        let res2: any = [];
        items.forEach(itm => {
          // console.log(itm)
          let resOrder: any = itm.orders.filter(it => it.orderno.indexOf(filter) !== -1);
          // console.log(resOrder);
          if (resOrder.length > 0) {
            resOrder.forEach(resO => {
              res2.push(itm);
            });
          }
        });
        // console.log(res2);
        if (res2.length < 1) {
          let res3: any = [];
          items.forEach(itm => {
            let resTel: any = itm.orders.filter(it => it.customer.tel.indexOf(filter) !== -1);
            // console.log(resTel);
            if (resTel.length > 0) {
              resTel.forEach(resT => {
                res3.push(itm);
              });
            }
          });
          if (res3.length < 1) {
            let res4: any = [];
            items.forEach(itm => {
              let resFname: any = itm.orders.filter(it => it.customer.firstname.indexOf(filter) !== -1 || it.customer.lastname.indexOf(filter) !== -1);
              // console.log(resFname);
              if (resFname.length > 0) {
                resFname.forEach(resT => {
                  res4.push(itm);
                });
              }
            });
            if (res4.length < 1) {
              // console.log('ไม่เจอไรเลยอะ');
              // let res5: any = [];
              // items.forEach(itm => {
              //   let resLname: any = itm.orders.filter(it => it.customer.lastname.indexOf(filter) !== -1);
              //   // console.log(resLname);
              //   if (resLname.length > 0) {
              //     resLname.forEach(resT => {
              //       res5.push(itm);
              //     });
              //   }
              // });
              // if (res5.length < 1) {
              //   console.log('ไม่เจอไรเลยอะ');
              // } else {
              //   return res5
              // }
            } else {
              return res4
            }
          } else {
            return res3
          }
        } else {
          return res2
        }
      } else {
        return res1
      }
    }

  }

}
