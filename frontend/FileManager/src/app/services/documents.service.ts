import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DocumentRequest } from '../Models/DocumentsRequest';


@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor(private _http : HttpClient) { }

  UrlDev = 'https://localhost:44327/'
  UrlProd = 'https://filesmanager20200506202017.azurewebsites.net/'
  UrlSmarterASP = 'http://frnaut-001-site1.atempurl.com/'

  addDocument(document: DocumentRequest)
  {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer' +' '+localStorage.getItem('token')
    });

    return this._http.post(`${this.UrlSmarterASP}api/Documents`,document, {headers})
  }

  deleteDocument(id: number)
  {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer' +' '+localStorage.getItem('token')
    });
    
    return this._http.delete(`${this.UrlSmarterASP}api/Documents/${id}`, {headers})
  }
}
