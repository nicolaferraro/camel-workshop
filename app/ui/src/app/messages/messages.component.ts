import { Component, OnInit } from '@angular/core';
import {Message} from "../datatypes";
import {DataService} from "../data.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  message: Message;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.messages.subscribe(message => this.message = message);
  }

  refresh(): void {
    this.dismiss()
    this.data.triggerModelChange();
  }

  dismiss(): void {
    this.message = null;
  }

}
