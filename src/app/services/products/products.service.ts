import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(public http: HttpClient) {

  }
  private authorizationHeader() {
    // const token = window.localStorage.getItem('token@raburabu-web-dev');
    // console.log(token);
    const headers = new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cGRhdGVieSI6eyJfaWQiOiI1Yzg3OTM5OTMzYmZhOTAwMTJmNzRlNDQiLCJ1c2VybmFtZSI6ImJvb20ifSwiZmlyc3RuYW1lIjoi4LiT4Lix4LiQ4Lie4LilIiwibGFzdG5hbWUiOiLguYPguIjguJTguLUiLCJlbWFpbCI6ImJvb21AaG90bWFpbC5jb20iLCJwcm9maWxlSW1hZ2VVUkwiOiJodHRwOi8vcmVzLmNsb3VkaW5hcnkuY29tL2hmbHZsYXYwNC9pbWFnZS91cGxvYWQvdjE0ODc4MzQxODcvZzNod3lpZWI3ZGw3dWdkZ2ozdGIucG5nIiwicm9sZXMiOlsidXNlciJdLCJfaWQiOiI1Yzg3OTM5OTMzYmZhOTAwMTJmNzRlNDQiLCJ1c2VybmFtZSI6ImJvb20iLCJjcmVhdGVkIjoiMjAxOS0wMy0xMlQxMToxMDoxNy4zMjZaIiwicHJvdmlkZXIiOiJsb2NhbCIsImRpc3BsYXluYW1lIjoi4LiT4Lix4LiQ4Lie4LilIOC5g-C4iOC4lOC4tSIsIl9fdiI6MCwicmVmMSI6IjVjODc5NDEzNzM2NDk3MDAxMjZlNWNhMSIsInVwZGF0ZWQiOiIyMDE5LTAzLTEyVDExOjEyOjE5LjkwM1oiLCJsb2dpblRva2VuIjoiIn0.sUqq_Vz7Hyp-haEWGqU3LGyRWxV1sg1i3et44jd-_JY ');
    return headers;
  }
  order() {
    return this.http.get('http://13.250.99.131:3002/api/products', { headers: this.authorizationHeader() }).toPromise();
  }
}