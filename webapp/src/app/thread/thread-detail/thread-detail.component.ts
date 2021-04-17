import { Component, OnInit } from '@angular/core';
import { Thread } from 'src/models/thread';
import { Post } from 'src/models/post';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-thread-detail',
  templateUrl: './thread-detail.component.html',
  styleUrls: ['./thread-detail.component.css'],
})
export class ThreadDetailComponent implements OnInit {
  newDate = new Date().toLocaleString();

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        const id = +params['id'];
        // TODO: Call a service-method that calls the api and gets the thread with the given id
        // and also get the posts of the thread
      },
      (error) => {
        this.router.navigate(['/']);
      }
    );
  }

  thread: Thread = {
    Id: 2,
    Title: 'Down gehen',
    Description: 'Ich will einfach down gehen',
    CreationDate: this.newDate,
    UserId: 1,
    Username: 'Maxii',
  };

  postList: Post[] = [
    {
      Id: 1,
      Content:
        'Ja ich hab das selbe Problem! Ja ich hab das selbe ProblemJa ich hab das selbe ProblemJa ich hab das selbe ProblemJa ich hab das selbe ProblemJa ich hab das selbe ProblemJa ich hab das selbe ProblemJa ich hab das selbe ProblemJa ich hab das selbe ProblemJa ich hab das selbe Problem',
      UserId: 2,
      Username: 'Dominic',
      CreationDate: this.newDate,
    },
    {
      Id: 2,
      Content: 'Auf jeden Fall, Bruder.',
      UserId: 3,
      Username: 'RAF',
      CreationDate: this.newDate,
    },
  ];
}
