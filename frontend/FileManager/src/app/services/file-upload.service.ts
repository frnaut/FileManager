import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PersonalModel } from '../Models/FileUploads/PersonalModel';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor( private _http : HttpClient ) {
  }

  UrlDev = 'https://localhost:44327/';

  personalDocGetAll()
  {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer' +' '+localStorage.getItem('token')
    });
    
    return this._http.get(`${this.UrlDev}api/FileManager/`, {headers});
  }

  getById(id: number)
  {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer' +' '+localStorage.getItem('token')
    });

    return this._http.get(`${this.UrlDev}api/FileManager/${id}`, {headers});
  }

  getByIdentification(param: string)
  {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer' +' '+localStorage.getItem('token')
    });

    return this._http.get(`${this.UrlDev}api/filemanager/search/${param}`, {headers})
  }
  
  postPersonalDocument(data: PersonalModel)
  {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer' +' '+localStorage.getItem('token')
    });

    return this._http.post(`${this.UrlDev}api/FileManager`, data, {headers});
  }

  delete(id: number)
  {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer' +' '+localStorage.getItem('token')
    });

    return this._http.delete(`${this.UrlDev}api/FileManager/${id}`, {headers});
  }
  put(id: number, data: PersonalModel)
  {
   
    var headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer' +' '+localStorage.getItem('token')
    });

    return this._http.put(`${this.UrlDev}api/FileManager/${id}`, data, {headers});
  }

}
