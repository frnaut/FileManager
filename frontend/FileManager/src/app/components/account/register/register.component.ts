import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { UserModel } from 'src/app/Models/UserModel';
import { TokenModel } from 'src/app/Models/TokenModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  newForm = new FormGroup({
    email: new FormControl(''),
    password1: new FormControl(''),
    password2: new FormControl('')
  });

  registerForm: FormGroup;


  error: boolean;
  passError: boolean;

  constructor( private _services: AccountService, private _router: Router ) { 
    this.registerForm = this.newForm;
  }

  register()
  {
    try
    {
      if(this.registerForm.valid)
    {
      if(this.registerForm.value.password1 == this.registerForm.value.password2)
      {
        var model = new UserModel()
        model.email = this.registerForm.value.email
        model.password = this.registerForm.value.password1

        this._services.register(model).subscribe((resp: TokenModel) => {
          console.log(resp);
          localStorage.setItem("token", resp.token);
          localStorage.setItem("tokenExpiration", resp.expiration);
          this._router.navigateByUrl("/home")
        },err => {
          for(let data of err.error)
          {
            alert(data.description);
          }
        })
        
      }else{
        this.passError = true;
        setTimeout(() => {
          this.passError = false;
        }, 3000);
      }

    }else{
      this.error = true;
      setTimeout(()=>{
        this.error = false;
      }, 3000)
    }
    
    }catch(error){
      console.log(error)
    }
    
  }

  clean()
  {
    this.registerForm.reset();
  }
}
