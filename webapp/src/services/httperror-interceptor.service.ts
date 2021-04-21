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
    return next.handle(request).pipe(
      retryWhen(error => this.retryRequest(error, 5)),
      catchError((error: HttpErrorResponse) => {
        const errorMessage = this.setError(error);
        console.log(error);
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
          const refreshToken = localStorage.getItem('refreshToken');
          // if token expired
          if(checkError.status === 403 && refreshToken) {
            this.tokenService.getNewToken(refreshToken).subscribe(data => {
              console.log(data.toString())
              localStorage.setItem('token', data.toString());
              window.location.reload();
            })
          }
          return of(checkError);
        }
        return throwError(checkError);
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
}
