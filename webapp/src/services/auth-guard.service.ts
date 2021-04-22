import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuardService implements CanActivate {

  constructor(private router: Router,
              private alertifyService: AlertifyService,
              private tokenService: TokenService) { }

  canActivate(): boolean {

    if(!localStorage.getItem('token') || !localStorage.getItem('refreshToken')) {
      this.alertifyService.error('You have to login for this action!');
      this.router.navigate(['user/login']);
      return false;
    }

    // verify if token is valid
    this.tokenService.checkRefreshToken(localStorage.getItem('refreshToken')).subscribe((status: string) => {
      if(status) {
        return true;
      }
      return false;
    })
    return true;
  }

}
