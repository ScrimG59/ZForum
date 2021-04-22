import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/User';
import { Location } from '@angular/common';

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
              private location: Location) { }

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

  }

  onBack() {
    this.location.back();
  }

  checkIfChanged() {
    if(this.user.Username != this.Username.value ||
       this.user.Password != this.Password.value ||
       this.user.Email != this.Email.value) {
         return true;
       }
    return false;
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

}
