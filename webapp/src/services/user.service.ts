import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from 'src/models/LoginUser';
import { RegisterUser } from 'src/models/RegisterUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(body: RegisterUser) {
    return this.http.post('http://localhost:3000/api/user/register', body)
  }

  loginUser(body: LoginUser) {
    return this.http.post('http://localhost:3000/api/user/login', body)
  }

}
