import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public showPassword = false;
  message = '';
  invalid = false;

  public user = {
    email: '',
    password: '',
  };

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {}

  loginUser(form){
    this.user.email = form.value.email;
    this.user.password = form.value.password;
    this.loginService.login(this.user).subscribe(userCredential => {
      if (userCredential){
        this.loginService.saveUser({
          username: this.user.email,
          token: userCredential.user.getIdToken()
        });
        this.router.navigate(['/dashboard']);
      }
    }, error => {
      this.message = error;
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  validateField() {
    if (this.user.password.length < 8) {
      this.invalid = true;
    } else { this.invalid = false; }
  }
}
