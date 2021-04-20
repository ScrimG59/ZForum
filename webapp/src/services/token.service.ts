import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient) { }

  getNewToken(refreshToken) {
    return this.http.post('http://localhost:3000/api/token', {'RefreshToken': localStorage.getItem('refreshToken')}).pipe(
      map(data => {
        return data;
      })
    );
  }
}
