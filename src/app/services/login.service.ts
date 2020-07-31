import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user: any;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router)
  {}

  isLogged(){
    return this.afAuth.authState;
    //return localStorage.getItem('token') !== null;
  }

  userToken() {
    return window.localStorage.getItem('token');
  }

  saveUser(user) {
    window.localStorage.setItem('token', user.token);
    window.localStorage.setItem('user', JSON.stringify(user.username));
  }

  login(data: any): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(data.email, data.password));
  }

  logout() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
    return this.afAuth.signOut();
  }
}
