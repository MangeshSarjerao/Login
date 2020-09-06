import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { User } from  '../Interface/user';
import { AuthService } from  '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isSubmitted  =  false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
        email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
        password: ['', Validators.required]
    });
}

get formControls() { return this.loginForm.controls; }

login(){
  console.log(this.loginForm.value);
  this.isSubmitted = true;
  if(this.loginForm.invalid){
    return;
  }
  this.authService.login(this.loginForm.value);
  this.router.navigateByUrl('/admin');
}

goToRegister()
{
  this.router.navigateByUrl('/register');
}

}
