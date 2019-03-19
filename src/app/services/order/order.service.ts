import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(public http: HttpClient, ) { }

  private authorizationHeader() {
    const token = window.localStorage.getItem('token@raburabu-web-dev');
    // console.log(token);
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return headers;
  }

  orderList() {
    return this.http.get('http://13.250.99.131/api/orders', { headers: this.authorizationHeader() }).toPromise()
  }
  getByIdOrderList(id) {
    return this.http.get('http://13.250.99.131/api/orders/' + id, { headers: this.authorizationHeader() }).toPromise()
  }

  saveOrder(body) {
    return this.http.post('http://13.250.99.131/api/orders', body, { headers: this.authorizationHeader() }).toPromise()
  }
  getOrderByUser(id) {
    return this.http.get('http://13.250.99.131/api/order/user/' + id, { headers: this.authorizationHeader() }).toPromise()
  }
  getOrder(body) {
    return this.http.post('http://13.250.99.131/api/order/team', body, { headers: this.authorizationHeader() }).toPromise()

  }
  deleteOrder(id) {
    return this.http.delete('http://13.250.99.131/api/orders/' + id, { headers: this.authorizationHeader() }).toPromise();
  }
}
