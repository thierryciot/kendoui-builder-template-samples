import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'custom-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css']
})
export class HelloWorldComponent implements OnInit {

  @Input() greeting: string;
  // debugger;

  constructor() {
    // debugger;
  }

  ngOnInit() {
    // debugger;
    if ( this.greeting === undefined ) {
      this.greeting = 'Hello';
    }
  }
}
