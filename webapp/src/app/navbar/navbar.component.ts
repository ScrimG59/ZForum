import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedInUser: boolean = false;
  loggedInUserName: string = "";

  constructor() { }

  ngOnInit() {
  }

  loggedIn() {
    if(localStorage.getItem('username')) {
      this.loggedInUserName = localStorage.getItem('username').toString();
      return this.loggedInUser = true
    }
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('id');
    this.loggedInUser = false;
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
