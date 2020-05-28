import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DocumentRequest } from '../Models/DocumentsRequest';


@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor(private _http : HttpClient) { }

  UrlDev = 'https://localhost:44327/'
 
  addDocument(document: DocumentRequest)
  {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer' +' '+localStorage.getItem('token')
    });

    return this._http.post(`${this.UrlDev}api/Documents`,document, {headers})
  }

  deleteDocument(id: number)
  {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer' +' '+localStorage.getItem('token')
    });
    
    return this._http.delete(`${this.UrlDev}api/Documents/${id}`, {headers})
  }
}
