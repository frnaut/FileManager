import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';


import { UserModel } from '../Models/UserModel';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  
  
  constructor( private _http: HttpClient ) { }



  register(user: UserModel)
  {
    var Urls = 'https://localhost:44327/';
    return this._http.post(`${Urls}api/cuentas/registro`, user)
  }

  login(user: UserModel)
  {
    var Urls = 'https://localhost:44327/';
    return this._http.post(`${Urls}api/cuentas/login`, user)
  }

  isLogin()
  {
    var tokenExp = localStorage.getItem("tokenExpiration")
    var token = localStorage.getItem("token")
    var time = new Date(tokenExp);

    if(token == null)
    {
      return false;
    }

    if(token.length > 1)
    {
      if (time > new Date){
        return true;
      }else{
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
        return false
      }
    }else{
      return false;
    }
  }
  

  

}
