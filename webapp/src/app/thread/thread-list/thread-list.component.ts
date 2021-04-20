import { Component, OnInit } from '@angular/core';
import { Thread } from 'src/models/Thread';
import { ThreadService } from 'src/services/thread.service';

@Component({
  selector: 'app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css']
})
export class ThreadListComponent implements OnInit {

  newDate = new Date().toLocaleString();
  threadList: Thread[];

  constructor(private threadService: ThreadService) { }

  ngOnInit() {
    this.threadService.getAllThreads().subscribe((data: Thread[]) =>{
      this.threadList = data;
    }, error => {console.log(error);})
  }

}
