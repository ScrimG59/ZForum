import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { catchError, concatMap, map, retryWhen, switchMap } from "rxjs/operators";
import { AlertifyService } from "./alertify.service";
import { TokenService } from "./token.service";

@Injectable({
  providedIn: 'root'
})

export class HttpErrorInterceptorService implements HttpInterceptor {

  constructor(private alertifyService: AlertifyService, private tokenService: TokenService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {
    // add to each request the authorization header
    request = this.addToken(request, this.tokenService.getAccessToken());
    // catch any error that comes as an answer for the request
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const refreshToken = this.tokenService.getRefreshToken();
        console.log(error);
        // if token expired
        if(error.status === 403 && refreshToken) {
          // get a new token and retry the request with the new access token in the header
          return this.tokenService.getNewToken(refreshToken).pipe(switchMap((token: string) => {
            this.tokenService.setAccessToken(token);
            return next.handle(this.addToken(request, this.tokenService.getAccessToken()));
          }));
        }
        else {
          const errorMessage = this.setError(error);
          this.alertifyService.error(errorMessage);
          return throwError(errorMessage);
        }
      })
    );
  }

  // Retry the request in case of an error a certain number of times
  private retryRequest(error: Observable<unknown>, retryCount: number): Observable<unknown> {
    return error.pipe(
      concatMap((checkError: HttpErrorResponse, count: number) => {
        if(count <= retryCount) {
          return of(checkError);
        }
        else {
          console.log('Hier')
          return throwError(checkError);
        }
      })
    );
  }

  private setError(error: HttpErrorResponse): string {
    let errorMessage = "Unknown error occured";

    if(error.error instanceof ErrorEvent) {
      // Client side error
      errorMessage = error.error.message;
    }
    else {
      // Server side error
      if(error.status !== 0) {
        errorMessage = error.error;
      }
    }

    return errorMessage;
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({setHeaders: {'Authorization': `Bearer ${token}`}});
  }
}
