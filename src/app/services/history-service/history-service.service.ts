import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistoryServiceService {


  constructor(public http: HttpClient, ) { }

  private authorizationHeader() {
    const token = window.localStorage.getItem(`token@${environment.appName}-${environment.environment}`);
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return headers;
  }

  getHistory(_id) {
    return this.http.get(environment.apiUrl + '/api/order/history/' + _id, { headers: this.authorizationHeader() }).toPromise()
  }


}
