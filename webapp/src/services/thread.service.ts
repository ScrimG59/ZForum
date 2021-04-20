import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Thread } from 'src/models/Thread';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  header = new HttpHeaders()

  constructor(private http: HttpClient) { }

  getAllThreads() {
    return this.http.get('http://localhost:3000/api/thread', ).pipe(
      map(data => {
        const threadArray: Thread[] = [];
        for(const id in data) {
          threadArray.push(data[id]);
        }

        return threadArray;
      })
    );
  }

  getThreadById(id: number) {
    this.header = this.header.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    console.log(this.header)
    return this.http.get(`http://localhost:3000/api/thread/${id}`, {'headers': this.header}).pipe(
      map(data => {
        return data;
      })
    );
  }

}
