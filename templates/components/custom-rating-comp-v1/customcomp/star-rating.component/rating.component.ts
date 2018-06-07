import {Component, Input, OnInit} from '@angular/core';

/*
We will use font awesome to render rating icon.

See https://stackoverflow.com/questions/38796541/how-to-add-font-awesome-to-angular-2-cli-project
 */
@Component({
  selector: 'custom-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input() rating: number;
  @Input() spacing: string;
  @Input() height: string;
  @Input() icon: string;
  @Input() color: string;

  // Set it to true to output debug data in the component itself.
  debugComp = false;

  constructor() { }

  // ngFor only works on iteratable (does not accept a simple number) so we need to create
  // a dummy array of a specific length.
  loopCounter: Array<number>;

  static createEmptyArrayWithSpecificLengthForNgFor(length): Array<number> {
    return new Array<number>(length);
  }

  ngOnInit() {
    // debugger;
    if ( this.icon === undefined ) {
      this.icon = 'fa fa-star';
    }

    if ( this.color === undefined ) {
      this.color = 'blue';
    }

    console.log( `RatingComponent initialized with ${this.rating}` );
    let x = Number(this.rating);
    if ( isNaN(x)) {
      x = 0;
    }

    this.spacing += 'px';
    this.height += 'px';
    this.loopCounter = RatingComponent.createEmptyArrayWithSpecificLengthForNgFor(x);
  }
}
