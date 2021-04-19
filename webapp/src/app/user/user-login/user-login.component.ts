import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/services/alertify.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private alertifyService: AlertifyService) { }

  ngOnInit() {
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      Email: new FormControl(null, [Validators.required, Validators.email]),
      Password: new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {

  }

  onBack() {
    this.router.navigate(['']);
  }


   // ------------------------------------
  // Getter-methods for all form controls
  // ------------------------------------

  get Email() {
    return this.loginForm.get('Email') as FormControl;
  }

  get Password() {
    return this.loginForm.get('Password') as FormControl;
  }

  // ------------------------------------

}
