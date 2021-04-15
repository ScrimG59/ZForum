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
      Title: "Anewthreadthatisextremlylongandreallycomplexlol31234142134",
      Description: "Test desc",
      Created: this.newDate
    },

    {
      Id: 2,
      Title: "Down gehen",
      Description: "Ich will einfach down gehen",
      Created: this.newDate
    },
    {
      Id: 3,
      Title: "A new thread that is extremly long and really complex lol31234142134",
      Description: "Test desc",
      Created: this.newDate
    },

    {
      Id: 4,
      Title: "Down gehen",
      Description: "Ich will einfach down gehen",
      Created: this.newDate
    },
    {
      Id: 5,
      Title: "A new thread that is extremly long and really complex lol31234142134",
      Description: "Test descdsaihwfepöoaofehgfoiaüpöwg ihnoeöawpghielghnkaeöpghnöperohgroiegöhegphr goöpihaogöhergieaghr epöoghaopihgproeaöhgoraeihgpaohga epoöghieapöghnepörghhtr shtrhsrhrshsrhrshsrhsrh",
      Created: this.newDate
    },

    {
      Id: 6,
      Title: "Down gehen",
      Description: "Ich will einfach down gehen",
      Created: this.newDate
    },
    {
      Id: 1,
      Title: "A new thread that is extremly long and really complex lol31234142134",
      Description: "Test desc",
      Created: this.newDate
    },

    {
      Id: 2,
      Title: "Down gehen",
      Description: "Ich will einfach down gehen",
      Created: this.newDate
    },
    {
      Id: 1,
      Title: "A new thread that is extremly long and really complex lol31234142134",
      Description: "Test desc",
      Created: this.newDate
    },

    {
      Id: 2,
      Title: "Down gehen",
      Description: "Ich will einfach down gehen",
      Created: this.newDate
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
