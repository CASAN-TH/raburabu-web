import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeameServiceService {

  constructor(
    public http: HttpClient,
  ) { }
  private authorizationHeader() {
    const token = window.localStorage.getItem('token@raburabu-web-dev');
    // console.log(token);
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return headers;
  }
  createTeam(body) {
    return this.http.post('http://13.250.99.131/api/teams', body, { headers: this.authorizationHeader() }).toPromise()
  }
  getTeam() {
    return this.http.get('http://13.250.99.131/api/teams', { headers: this.authorizationHeader() }).toPromise();
  }
  joinTeam(id, body) {
    return this.http.put('http://13.250.99.131/api/teams/add/' + id, body, { headers: this.authorizationHeader() }).toPromise()
  }
  getById(id) {
    return this.http.get('http://13.250.99.131/api/teams/' + id, { headers: this.authorizationHeader() }).toPromise();
  }
  me() {
    return this.http.get('http://13.250.99.131/api/me', { headers: this.authorizationHeader() }).toPromise();
  }
  updateMe(body) {
    return this.http.put('http://13.250.99.131/api/me', body, { headers: this.authorizationHeader() }).toPromise();
  }
  updateStatusMember(idTeam, idUser) {
    return this.http.put('http://13.250.99.131/api/teams/' + idTeam, idUser, { headers: this.authorizationHeader() }).toPromise();
  }
  approveMember(id, body) {
    return this.http.put('http://13.250.99.131/api/teams/edit/' + id, body, { headers: this.authorizationHeader() }).toPromise();
  }
  adminManageTeam(_id, body) {
    return this.http.put('http://13.250.99.131/api/teams/adminapporve/' + _id, body, { headers: this.authorizationHeader() }).toPromise();
  }
  getUserById(id) {
    return this.http.get('http://13.250.99.131/api/users/' + id, { headers: this.authorizationHeader() }).toPromise();
  }
}
