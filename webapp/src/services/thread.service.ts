import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Thread } from 'src/models/thread';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  constructor(private http: HttpClient) { }

  getAllThreads() {
    return this.http.get('http://localhost:3000/api/thread').pipe(
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
    return this.http.get(`http://localhost:3000/api/thread/${id}`).pipe(
      map(data => {
        return data;
      })
    );
  }

}
