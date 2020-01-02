import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Params } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string;
  loginForm : FormGroup;
  constructor(public authService: AuthService, private fb: FormBuilder, private router: Router) { 
	this.createForm();
  }

  createForm() {
	this.loginForm = this.fb.group({
		email: ['', Validators.required],
		password: ['', Validators.required]	
	})
  }

  tryLogin(value){
	this.authService.doLogin(value)
	    .then(res => {
	     // this.router.navigate(['/user']);
		console.log('login successful');
		
	    }, err => {
	      console.log(err);
	      this.errorMessage = err.message;
	    })
  }

  ngOnInit() {
  }

}
