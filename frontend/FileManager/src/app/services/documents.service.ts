import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DocumentRequest } from '../Models/DocumentsRequest';


@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor(private _http : HttpClient) { }

  addDocument(document: DocumentRequest)
  {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer' +' '+localStorage.getItem('token')
    });

    var Urls = 'https://localhost:44327/';
    return this._http.post(`${Urls}api/Documents`,document, {headers})
  }

  deleteDocument(id: number)
  {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer' +' '+localStorage.getItem('token')
    });
    
    var Urls = 'https://localhost:44327/';
    return this._http.delete(`${Urls}api/Documents/${id}`, {headers})
  }
}
