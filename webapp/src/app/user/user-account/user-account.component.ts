import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/User';
import { Location } from '@angular/common';
import { UserService } from 'src/services/user.service';
import { TokenService } from 'src/services/token.service';
import { AlertifyService } from 'src/services/alertify.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  user: User = new User();
  accountForm: FormGroup;
  userSubmitted: boolean = false;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private location: Location,
              private userService: UserService,
              private tokenService: TokenService,
              private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe((userData: User) => {
      this.user = userData['acc'];
    });
    this.createAccountForm();
  }

  createAccountForm() {
    this.accountForm = this.formBuilder.group({
      Username: new FormControl(this.user.Username, [Validators.required, Validators.minLength(4)]),
      Email: new FormControl(this.user.Email, [Validators.required, Validators.email]),
      Password: new FormControl(this.user.Password, [Validators.required, Validators.minLength(8)])
    })
  }

  onSubmit() {
    this.userSubmitted = true;

    // if the account form is valid
    if(this.accountForm.valid) {
      // instantiate a new user with new values
      const user: User = {
        Id: this.tokenService.getInfo().Id,
        Username: this.Username.value,
        Email: this.Email.value,
        Password: this.Password.value
      }
      this.accountForm.reset();
      // send it to backend
      this.userService.editUser(user).subscribe();
      this.alertifyService.success('Successfully edited user!');
      window.location.reload();
    }
  }

  onBack() {
    this.location.back();
  }

  // ------------------------------------
  // Getter-methods for all form controls
  // ------------------------------------

  get Username() {
    return this.accountForm.get('Username') as FormControl;
  }

  get Password() {
    return this.accountForm.get('Password') as FormControl;
  }

  get Email() {
    return this.accountForm.get('Email') as FormControl;
  }
  // ------------------------------------

  // ------------------------------------
  // Helper-methods
  // ------------------------------------
  checkIfChanged() {
    if(this.user.Username != this.Username.value ||
       this.user.Password != this.Password.value ||
       this.user.Email != this.Email.value) {
         return true;
       }
    return false;
  }

  isValid(): boolean {
    if(this.accountForm.valid){
      return true;
    }
    return false;
  }
  // ------------------------------------
}
