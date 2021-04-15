import { Component, Input, OnInit } from '@angular/core';
import { Thread } from 'src/models/thread';

@Component({
  selector: 'app-thread-item',
  templateUrl: './thread-item.component.html',
  styleUrls: ['./thread-item.component.css']
})
export class ThreadItemComponent implements OnInit {

  @Input() thread: Thread;

  constructor() { }

  ngOnInit() {
  }
}
