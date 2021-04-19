import { Component, OnInit } from '@angular/core';
import { Thread } from 'src/models/thread';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-thread-detail',
  templateUrl: './thread-detail.component.html',
  styleUrls: ['./thread-detail.component.css'],
})
export class ThreadDetailComponent implements OnInit {

  thread =  new Thread();

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.data.subscribe((data: Thread) => {
      this.thread = data['threads'];
    }, error => {
      // if there's an error, redirect to main page
      this.router.navigate(['']);
    })
  }
}
