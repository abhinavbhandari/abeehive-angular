import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth-service.service';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

  constructor(public authService: AuthService, private router: Router) { }

//  canActivate(): Promise<boolean>{
//    return new Promise((resolve, reject) => {
//      this.authService.getCurrentUser()
//      .then(user => {
//        this.router.navigate(['post']);
//        return resolve(false);
//      }, err => {
//        return resolve(true);
//      })
//    })
//  }

  canActivate(): Promise<boolean> {
	console.log('helloo');
	return new Promise((resolve, reject) => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				resolve(true);
			}
			else {
				this.router.navigate(['login']);
				reject(false);
			}
		})

	})
  }
}
