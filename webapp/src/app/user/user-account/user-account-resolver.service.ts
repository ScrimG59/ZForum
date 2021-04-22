import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from 'src/services/token.service';
import { UserService } from 'src/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserAccountResolverService {

  constructor(private userService: UserService,
              private tokenService: TokenService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userId = this.tokenService.getInfo().Id;
    return this.userService.getUserPrivate(userId).pipe(
      catchError(error => {
        return of(null);
      })
    );
  }

}
