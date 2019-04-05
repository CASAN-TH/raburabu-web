import { environment } from './../../../environments/environment';
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
    // const token = window.localStorage.getItem('token@raburabu-web-dev');
    const token = window.localStorage.getItem(`token@${environment.appName}-${environment.environment}`);
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return headers;
  }
  createTeam(body) {
    return this.http.post(environment.apiUrl + '/api/teams', body, { headers: this.authorizationHeader() }).toPromise()
  }
  getTeam() {
    return this.http.get(environment.apiUrl + '/api/teams', { headers: this.authorizationHeader() }).toPromise();
  }
  joinTeam(id, body) {
    return this.http.put(environment.apiUrl + '/api/teams/add/' + id, body, { headers: this.authorizationHeader() }).toPromise()
  }
  getById(id) {
    return this.http.get(environment.apiUrl + '/api/teams/' + id, { headers: this.authorizationHeader() }).toPromise();
  }
  me() {
      return this.http.get(environment.apiUrl + '/api/me', { headers: this.authorizationHeader() }).toPromise();
  }
  updateMe(body) {
    return this.http.put(environment.apiUrl + '/api/me', body, { headers: this.authorizationHeader() }).toPromise();
  }
  updateStatusMember(idTeam, idUser) {
    return this.http.put(environment.apiUrl + '/api/teams/' + idTeam, idUser, { headers: this.authorizationHeader() }).toPromise();
  }
  approveMember(id, body) {
    return this.http.put(environment.apiUrl + '/api/teams/edit/' + id, body, { headers: this.authorizationHeader() }).toPromise();
  }
  adminManageTeam(_id, body) {
    return this.http.put(environment.apiUrl + '/api/teams/adminapporve/' + _id, body, { headers: this.authorizationHeader() }).toPromise();
  }
  getUserById(id) {
    return this.http.get(environment.apiUrl + '/api/users/' + id, { headers: this.authorizationHeader() }).toPromise();
  }
}
