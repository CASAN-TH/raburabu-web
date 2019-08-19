import { Injectable } from "@angular/core";
import { HttpResponse, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class FileService {

  constructor(private http: HttpClient) { }

  // downloadFile(): Observable<HttpResponse<Blob>> {
  //   //return this.http.get("http://localhost:8080/employees/download", { responseType: ResponseContentType.Blob });
  //   this.http.get(`${environment.apiUrl}`,{
  //     responseType: 'arraybuffer',headers:headers}
  //    ).subscribe(response => this.downLoadFile(response, "application/ms-excel"));
  // }

}
