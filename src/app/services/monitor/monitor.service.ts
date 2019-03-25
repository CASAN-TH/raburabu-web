import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  constructor(
    public http: HttpClient,
  ) { }
  private authorizationHeader() {
    // const token = window.localStorage.getItem('token@raburabu-web-dev');
    // console.log(token);
    const headers = new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cGRhdGVieSI6eyJfaWQiOiI1Yzg3OTM5OTMzYmZhOTAwMTJmNzRlNDQiLCJ1c2VybmFtZSI6ImJvb20ifSwiZmlyc3RuYW1lIjoi4LiT4Lix4LiQ4Lie4LilIiwibGFzdG5hbWUiOiLguYPguIjguJTguLUiLCJlbWFpbCI6ImJvb21AaG90bWFpbC5jb20iLCJwcm9maWxlSW1hZ2VVUkwiOiJodHRwOi8vcmVzLmNsb3VkaW5hcnkuY29tL2hmbHZsYXYwNC9pbWFnZS91cGxvYWQvdjE0ODc4MzQxODcvZzNod3lpZWI3ZGw3dWdkZ2ozdGIucG5nIiwicm9sZXMiOlsidXNlciJdLCJfaWQiOiI1Yzg3OTM5OTMzYmZhOTAwMTJmNzRlNDQiLCJ1c2VybmFtZSI6ImJvb20iLCJjcmVhdGVkIjoiMjAxOS0wMy0xMlQxMToxMDoxNy4zMjZaIiwicHJvdmlkZXIiOiJsb2NhbCIsImRpc3BsYXluYW1lIjoi4LiT4Lix4LiQ4Lie4LilIOC5g-C4iOC4lOC4tSIsIl9fdiI6MCwicmVmMSI6IjVjODc5NDEzNzM2NDk3MDAxMjZlNWNhMSIsInVwZGF0ZWQiOiIyMDE5LTAzLTEyVDExOjEyOjE5LjkwM1oiLCJsb2dpblRva2VuIjoiIn0.sUqq_Vz7Hyp-haEWGqU3LGyRWxV1sg1i3et44jd-_JY ');
    return headers;
  }
  sendOrderToMonitor(body) {
    return this.http.post('http://13.250.99.131/api/monitors', body, { headers: this.authorizationHeader() }).toPromise();
  }
  getMonitorAll() {
    return this.http.get('http://13.250.99.131/api/monitors', { headers: this.authorizationHeader() }).toPromise();
  }
  getReportMonitorById(id) {
    return this.http.get('http://13.250.99.131/api/monitor/report/' + id, { headers: this.authorizationHeader() }).toPromise();
  }
  getLabel(id) {
    return this.http.get('http://13.250.99.131/api/monitor/labels/' + id, { headers: this.authorizationHeader() }).toPromise();
  }
  saveLabel(id, body) {
    return this.http.put('http://13.250.99.131/api/monitors/' + id, body, { headers: this.authorizationHeader() }).toPromise();
  }
  getMonitor(id) {
    return this.http.get('http://13.250.99.131/api/monitors/' + id, { headers: this.authorizationHeader() }).toPromise();

  }
  changStatus(id, body) {
    return this.http.put('http://13.250.99.131/api/monitors/' + id, body, { headers: this.authorizationHeader() }).toPromise();
  }
}
