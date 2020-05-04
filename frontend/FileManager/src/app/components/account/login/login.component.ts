import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { TokenModel } from 'src/app/Models/TokenModel';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  newForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  
  logInForm: FormGroup;
  error: boolean;

  constructor(private _services: AccountService,
              private _router: Router) { 
    this.logInForm = this.newForm;
  }

  logIn()
  {
    if(this.logInForm.valid)
    {
      this._services.login(this.logInForm.value).subscribe((resp: TokenModel) => {
        console.log(resp);
        localStorage.setItem("token", resp.token);
        localStorage.setItem("tokenExpiration", resp.expiration);
        this._router.navigateByUrl("/home")
      },err => {
        alert(err.error)
      });
    }else{
      this.error = true;

      setTimeout(() => {
        this.error = false;
      }, 3000);
    }
  }

  clean()
  {
    this.logInForm.reset
  }
}
