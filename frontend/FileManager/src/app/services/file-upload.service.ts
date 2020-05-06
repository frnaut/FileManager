import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PersonalModel } from '../Models/FileUploads/PersonalModel';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor( private _http : HttpClient ) {
  }

  UrlDev = 'https://localhost:44327/'
  UrlProd = 'http://frnaut-001-site1.atempurl.com/'
  
  personalDocGetAll()
  {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer' +' '+localStorage.getItem('token')
    });
    
    return this._http.get(`${this.UrlProd}api/FileManager/`, {headers});
  }

  getById(id: number)
  {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer' +' '+localStorage.getItem('token')
    });

    return this._http.get(`${this.UrlProd}api/FileManager/${id}`, {headers});
  }

  getByIdentification(param: string)
  {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer' +' '+localStorage.getItem('token')
    });

    return this._http.get(`${this.UrlProd}api/filemanager/search/${param}`, {headers})
  }
  
  postPersonalDocument(data: PersonalModel)
  {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer' +' '+localStorage.getItem('token')
    });

    return this._http.post(`${this.UrlProd}api/FileManager`, data, {headers});
  }

  delete(id: number)
  {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer' +' '+localStorage.getItem('token')
    });

    return this._http.delete(`${this.UrlProd}api/FileManager/${id}`, {headers});
  }
  put(id: number, data: PersonalModel)
  {
   
    var headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer' +' '+localStorage.getItem('token')
    });

    return this._http.put(`${this.UrlProd}api/FileManager/${id}`, data, {headers});
  }

}
