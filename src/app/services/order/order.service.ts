import { environment } from './../../../environments/environment';
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
    return this.http.get(environment.apiUrl + '/api/orders', { headers: this.authorizationHeader() }).toPromise()
  }
  getByIdOrderList(id) {
    return this.http.get(environment.apiUrl + '/api/orders/' + id, { headers: this.authorizationHeader() }).toPromise()
  }

  saveOrder(body) {
    return this.http.post(environment.apiUrl + '/api/orders', body, { headers: this.authorizationHeader() }).toPromise()
  }
  getOrderByUser(id) {
    return this.http.get(environment.apiUrl + '/api/order/user/' + id, { headers: this.authorizationHeader() }).toPromise()
  }
  getOrder(id) {
    return this.http.get(environment.apiUrl + '/api/order/team/' + id, { headers: this.authorizationHeader() }).toPromise()
  }
  deleteOrder(id) {
    return this.http.delete(environment.apiUrl + '/api/orders/' + id, { headers: this.authorizationHeader() }).toPromise();
  }
  editOrder(id, body) {
    return this.http.put(environment.apiUrl + '/api/orders/' + id, body, { headers: this.authorizationHeader() }).toPromise();
  }
  sendOrderAll(id) {
    return this.http.put(environment.apiUrl + '/api/order/sendorder/' + id, null, { headers: this.authorizationHeader() }).toPromise();
  }
}
