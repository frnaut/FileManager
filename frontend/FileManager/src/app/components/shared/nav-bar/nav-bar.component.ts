import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit  {

  login: boolean;
  constructor(private _router: Router, 
              private _sevices: AccountService) { 
    
    if(_sevices.isLogin())
    {
      this.login = true;
    }else {
      this.login = false;
    }
  }

  ngOnInit(){

  }

  logOut()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    this.login = false;
    this._router.navigateByUrl("/login")
    this.ngOnInit();
  }
}
