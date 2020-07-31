import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: firebase.User;

  constructor(
    private auth: LoginService,
    private router: Router) { }

  ngOnInit() {
    console.log('User logged in is - ' + this.user);
    this.auth.isLogged().subscribe(user => {
      this.user = user;
    });
  }

  signIn() {
    this.router.navigate(['/login']);
  }

  signOut() {
    this.auth.logout();
  }
}
