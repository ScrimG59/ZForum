import { Component, OnInit } from '@angular/core';
import { Thread } from 'src/models/thread';

@Component({
  selector: 'app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css']
})
export class ThreadListComponent implements OnInit {

  newDate = new Date().toLocaleString();

  threadList: Thread[] = [
    {
      Id: 1,
      Title: 'Anewthreadthatisextremlylongandreallycomplexlol31234142134',
      Description: 'Test desc',
      CreationDate: this.newDate,
      UserId: 1,
      Username: 'Maxii'
    },

    {
      Id: 2,
      Title: 'Down gehen',
      Description: 'Ich will einfach down gehen',
      CreationDate: this.newDate,
      UserId: 1,
      Username: 'Maxii'
    },
    {
      Id: 3,
      Title: 'A new thread that is extremly long and really complex lol31234142134',
      Description: 'Test desc',
      CreationDate: this.newDate,
      UserId: 1,
      Username: 'Maxii'
    },

    {
      Id: 4,
      Title: 'Down gehen',
      Description: 'Ich will einfach down gehen',
      CreationDate: this.newDate,
      UserId: 1,
      Username: 'Maxii'
    },
    {
      Id: 5,
      Title: 'A new thread that is extremly long and really complex lol31234142134',
      Description: 'Test descdsaihwfepöoaofehgfoiaüpöwg ihnoeöawpghielghnkaeöpghnöperohgroiegöhegphr goöpihaogöhergieaghr epöoghaopihgproeaöhgoraeihgpaohga epoöghieapöghnepörghhtr shtrhsrhrshsrhrshsrhsrh',
      CreationDate: this.newDate,
      UserId: 1,
      Username: 'Maxii'
    },

    {
      Id: 6,
      Title: 'Down gehen',
      Description: 'Ich will einfach down gehen',
      CreationDate: this.newDate,
      UserId: 1,
      Username: 'Maxii'
    },
    {
      Id: 7,
      Title: 'A new thread that is extremly long and really complex lol31234142134',
      Description: 'Test desc',
      CreationDate: this.newDate,
      UserId: 1,
      Username: 'Maxii'
    },

    {
      Id: 8,
      Title: 'Down gehen',
      Description: 'Ich will einfach down gehen',
      CreationDate: this.newDate,
      UserId: 1,
      Username: 'Maxii'
    },
    {
      Id: 9,
      Title: 'A new thread that is extremly long and really complex lol31234142134',
      Description: 'Test desc',
      CreationDate: this.newDate,
      UserId: 1,
      Username: 'Maxii'
    },

    {
      Id: 2,
      Title: 'Down gehen',
      Description: 'Ich will einfach down gehen',
      CreationDate: this.newDate,
      UserId: 1,
      Username: 'Maxii'
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
