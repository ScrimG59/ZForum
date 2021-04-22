import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/services/alertify.service';
import { TokenService } from 'src/services/token.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedInUser: boolean = false;
  loggedInUserName: string = "";

  constructor(private userService: UserService,
              private router: Router,
              private alertifyService: AlertifyService,
              private tokenService: TokenService) { }

  ngOnInit() {
  }

  loggedIn() {
    if(localStorage.getItem('token') && localStorage.getItem('refreshToken')) {
      this.loggedInUserName = this.tokenService.getInfo().Username;
      return this.loggedInUser = true;
    }
  }

  onLogout() {
    const refreshToken: string = localStorage.getItem('refreshToken');
    this.userService.logoutUser(refreshToken).subscribe(data => {
      this.alertifyService.success('Successfully logged out.');
    }, error => {
      this.alertifyService.error('Error while logging out.');
    });
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.loggedInUser = false;
    this.router.navigate(['']);

  }

  onMouseClick() {
    if(!document.querySelector('.dropdown-menu').classList.contains('open')) {
      document.querySelector('.dropdown-menu').classList.add('open');
    }
  }

  onMouseLeave() {
    if(document.querySelector('.dropdown-menu').classList.contains('open')) {
      document.querySelector('.dropdown-menu').classList.remove('open');
    }
  }

  getUserName(): string {
    return this.tokenService.getInfo().Username;
  }
}
