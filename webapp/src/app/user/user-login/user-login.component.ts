import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/models/LoginUser';
import { LoginUserResponse } from 'src/models/LoginUserResponse';
import { AlertifyService } from 'src/services/alertify.service';
import { TokenService } from 'src/services/token.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  loginForm: FormGroup;
  userSubmitted: boolean = false;
  user: LoginUser = new LoginUser();

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private alertifyService: AlertifyService,
              private location: Location,
              private tokenService: TokenService) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      Email: new FormControl(null, [Validators.required, Validators.email]),
      Password: new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    this.userSubmitted = true;

    if(this.loginForm.valid) {
      this.user = {
        Email: this.Email.value,
        Password: this.Password.value
      }
      this.loginUser(this.user);
      this.userSubmitted = false;
    }
  }

  onBack() {
    this.location.back();
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


  // ------------------------------------
  // Helper-methods
  // ------------------------------------

  loginUser(user: LoginUser) {
    return this.userService.loginUser(user).subscribe((res: LoginUserResponse) => {
      if(!res) {return;}
      this.loginForm.reset();
      this.tokenService.setAccessToken(res.Token);
      this.tokenService.setRefreshToken(res.RefreshToken);
      this.alertifyService.success('Successfully logged in.');
      this.router.navigate(['']);
    })
  }

  isValid(): boolean {
    if(this.loginForm.valid){
      return true;
    }
    return false;
  }
  // ------------------------------------

}
