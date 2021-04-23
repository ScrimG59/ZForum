import { Injectable } from '@angular/core';
import { DecodedToken } from 'src/models/DecodedToken';
import jwt_decode from 'jwt-decode';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  header: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) { }

  getInfo(): DecodedToken {
    const token = localStorage.getItem('token');
    const decodedToken: DecodedToken = jwt_decode(token);
    return decodedToken;
  }

  getAccessToken(): string {
    return localStorage.getItem('token');
  }

  getRefreshToken(): string {
    return localStorage.getItem('refreshToken');
  }

  setAccessToken(token: string): void {
    localStorage.setItem('token', token);
  }

  checkToken(token: string) {
    //this.header = this.header.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get('http://localhost:3000/api/authenticate', { 'headers': this.header});
  }

  getNewToken(refreshToken: string) {
    return this.http.post('http://localhost:3000/api/token', {'RefreshToken': refreshToken});
  }

  checkRefreshToken(refreshToken: string) {
    return this.http.post('http://localhost:3000/api/token', {'RefreshToken': refreshToken});
  }
}
