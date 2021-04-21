import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUser } from 'src/models/RegisterUser';
import { AlertifyService } from 'src/services/alertify.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registrationForm: FormGroup;
  user: RegisterUser;
  userSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.createRegistrationForm();
  }

  createRegistrationForm() {
    this.registrationForm = this.formBuilder.group({
      Username: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      Email: new FormControl(null, [Validators.required, Validators.email]),
      Password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      ConfirmPassword: new FormControl(null, [Validators.required])
    }, {validators: this.passwordMatchingValidator});
  }

  // a custom validator that checks if the content of "confirmPassword"-FormControl matches the content of "userPassword"-FormControl
  passwordMatchingValidator(formGroup: FormGroup): Validators {
    return formGroup.get('Password').value === formGroup.get('ConfirmPassword').value ? null : {notMatched: true};
  }

  onSubmit() {
    this.userSubmitted = true;

    if(this.registrationForm.valid) {
      this.userService.registerUser(this.createUser()).subscribe(() => {
        this.registrationForm.reset();
        this.userSubmitted = false;
        this.alertifyService.success('Successfully registered!');
        this.router.navigate(['']);
      });
    }
  }

  onBack() {
    this.router.navigate(['']);
  }

  createUser() {
    return this.user = {
      Username: this.Username.value,
      Email: this.Email.value,
      Password: this.Password.value
    }
  }

  // ------------------------------------
  // Getter-methods for all form controls
  // ------------------------------------

  get Username() {
    return this.registrationForm.get('Username') as FormControl;
  }

  get Password() {
    return this.registrationForm.get('Password') as FormControl;
  }

  get ConfirmPassword() {
    return this.registrationForm.get('ConfirmPassword') as FormControl;
  }

  get Email() {
    return this.registrationForm.get('Email') as FormControl;
  }
  // ------------------------------------


}
