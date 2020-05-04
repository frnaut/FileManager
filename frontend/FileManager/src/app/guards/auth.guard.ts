import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private _services: AccountService,
               private _router: Router ) {
  }

  canActivate(): boolean {
        
    if(this._services.isLogin())
    {
      return true;
    }else {
      this._router.navigateByUrl('/login');
      return false;
    }
    
  }
  
}
