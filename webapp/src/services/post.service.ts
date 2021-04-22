import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreatePost } from 'src/models/CreatePost';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  header: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) { }

  addPost(post: CreatePost) {
    //this.header = this.header.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post('http://localhost:3000/api/post/add', post, {'headers': this.header});
  }
}
