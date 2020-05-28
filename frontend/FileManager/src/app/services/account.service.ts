import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';


import { UserModel } from '../Models/UserModel';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  
  
  constructor( private _http: HttpClient ) { }

  

  UrlDev = 'https://localhost:44327/'
  

  register(user: UserModel)
  {
    
    return this._http.post(`${this.UrlDev}api/cuentas/registro`, user)
  }

  login(user: UserModel)
  {
    return this._http.post(`${this.UrlDev}api/cuentas/login`, user)
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
