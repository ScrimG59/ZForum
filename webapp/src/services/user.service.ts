import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from 'src/models/LoginUser';
import { RegisterUser } from 'src/models/RegisterUser';
import { User } from 'src/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  header: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) { }

  registerUser(body: RegisterUser) {
    return this.http.post('http://localhost:3000/api/user/register', body);
  }

  loginUser(body: LoginUser) {
    return this.http.post('http://localhost:3000/api/user/login', body);
  }

  logoutUser(refreshToken: string) {
    return this.http.post('http://localhost:3000/api/user/logout', {'RefreshToken': refreshToken});
  }

  editUser(user: User) {
    return this.http.patch('http://localhost:3000/api/user/edit', user);
  }

  getUserPrivate(id: number) {
    //this.header = this.header.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get(`http://localhost:3000/api/user/account/${id}`);
  }
}
