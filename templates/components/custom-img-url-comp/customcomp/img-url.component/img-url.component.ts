import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'custom-img-url',
  templateUrl: './img-url.component.html',
  styleUrls: ['./img-url.component.css']
})
export class ImgUrlComponent implements OnInit {

  @Input() url: string;
  @Input() title: string;
  @Input() id: string;
  @Input() marginBottom: string;
  @Input() marginTop: string;
  @Input() marginLeft: string;
  @Input() marginRight: string;
  // debugger;

  constructor() {
    // debugger;
  }

  ngOnInit() {
    // debugger;
    if ( this.url === undefined ) {
      this.url = '';
    }
    if ( this.title === undefined ) {
      this.title = '';
    }
    if ( this.id === undefined ) {
      throw "Id is required";
    }

    this.marginTop += 'px';
    this.marginBottom += 'px';
    this.marginRight += 'px';
    this.marginLeft += 'px';

    // console.log(`Img Url: $this.url`);
    // console.log(`title: $this.title`);
  }
}
