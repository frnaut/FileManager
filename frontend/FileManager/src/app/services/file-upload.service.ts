import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PersonalModel } from '../Models/FileUploads/PersonalModel';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor( private _http : HttpClient ) {
  }

  
  personalDocGetAll()
  {
    var Urls = 'https://localhost:44327/';
    var headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer' +' '+localStorage.getItem('token')
    });
    
    return this._http.get(`${Urls}api/FileManager/`, {headers});
  }

  getById(id: number)
  {
    var Urls = 'https://localhost:44327/';
    var headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer' +' '+localStorage.getItem('token')
    });

    return this._http.get(`${Urls}api/FileManager/${id}`, {headers});
  }

  getByIdentification(param: string)
  {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer' +' '+localStorage.getItem('token')
    });

    var Urls = 'https://localhost:44327/';
    return this._http.get(`${Urls}api/filemanager/search/${param}`, {headers})
  }
  
  postPersonalDocument(data: PersonalModel)
  {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer' +' '+localStorage.getItem('token')
    });

    var Urls = 'https://localhost:44327/';
    return this._http.post(`${Urls}api/FileManager`, data, {headers});
  }

  delete(id: number)
  {
    var Urls = 'https://localhost:44327/';
    var headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer' +' '+localStorage.getItem('token')
    });

    return this._http.delete(`${Urls}api/FileManager/${id}`, {headers});
  }
  put(id: number, data: PersonalModel)
  {
    var Urls = 'https://localhost:44327/';
    var headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer' +' '+localStorage.getItem('token')
    });

    return this._http.put(`${Urls}api/FileManager/${id}`, data, {headers});
  }

}
