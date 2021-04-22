import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { catchError, concatMap, retryWhen } from "rxjs/operators";
import { AlertifyService } from "./alertify.service";
import { TokenService } from "./token.service";

@Injectable({
  providedIn: 'root'
})

export class HttpErrorInterceptorService implements HttpInterceptor {

  constructor(private alertifyService: AlertifyService, private tokenService: TokenService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    request = this.addToken(request, localStorage.getItem('token'));
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const refreshToken = localStorage.getItem('refreshToken');
        // if token expired
        if(error.status === 403 && refreshToken) {
          console.log(`Previous: ${localStorage.getItem('token')}`);
          this.tokenService.getNewToken(refreshToken).subscribe((data: string) => {
            localStorage.setItem('token', data);
            console.log(`After: ${localStorage.getItem('token')}`);
          })
          return next.handle(this.addToken(request, localStorage.getItem('token')));
        }
          console.log(error);
          const errorMessage = this.setError(error);
          this.alertifyService.error(errorMessage);
          return throwError(errorMessage);
      })
    );
  }

  // Retry the request in case of an error
  retryRequest(error: Observable<unknown>, retryCount: number): Observable<unknown> {
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

  setError(error: HttpErrorResponse): string {
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

  addToken(request: HttpRequest<any>, token: string) {
    return request.clone({setHeaders: {'Authorization': `Bearer ${token}`}});
  }
}
