import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RefreshToken } from 'src/models/RefreshToken';
import { AlertifyService } from 'src/services/alertify.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedInUser: boolean = false;
  loggedInUserName: string = "";

  constructor(private userService: UserService, private router: Router, private alertifyService: AlertifyService) { }

  ngOnInit() {
  }

  loggedIn() {
    if(localStorage.getItem('username')) {
      this.loggedInUserName = localStorage.getItem('username').toString();
      return this.loggedInUser = true;
    }
  }

  onLogout() {
    const refreshToken = new RefreshToken();
    refreshToken.RefreshToken = localStorage.getItem('refreshToken');
    this.userService.logoutUser(refreshToken).subscribe(data => {
      this.alertifyService.success('Successfully logged out.');
    }, error => {
      this.alertifyService.error('Error while logging out.');
    });
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('id');
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

}
