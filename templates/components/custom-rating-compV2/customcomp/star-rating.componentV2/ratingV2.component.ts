import {Component, Input, OnInit} from '@angular/core';

/*
We use font awesome to render rating icon.

See https://stackoverflow.com/questions/38796541/how-to-add-font-awesome-to-angular-2-cli-project
 */
@Component({
  selector: 'custom-ratingV2',
  templateUrl: './ratingV2.component.html',
  styleUrls: ['./ratingV2.component.css']
})
export class RatingComponentV2 implements OnInit {
  @Input() rating: number;
  @Input() spacing: string;
  @Input() height: string;
  @Input() icon: string;
  @Input() color: string;
  @Input() marginBottom: string;
  @Input() marginTop: string;
  @Input() alignment: string;

  // Angular doesn't know about boolean attributes.  See:
  // https://stackoverflow.com/questions/41856883/angular2-boolean-input-property-getting-set-as-string-binding-nested-properti
  @Input() showRange: string;
  // The statement below ended up causing problems between code generation and compile (one would complain about a
    // duplicate definition and the other one would complain about missing attribute.
    // so ended up just testing the boolean for its equivalent string value - very simple :)
  // set showRange (value: string) {
  //    // debugger;
  //    this.isShowingRange = value !== 'false';
  // }
  isShowingRange: Boolean;

  //iconRangeColor = 'lightgrey';

  // Set it to true to output debug data in the component itself.
  debugComp = false;

  constructor() { }

  // ngFor only works on iteratable (does not accept a simple number) so we need to create
  // dummy arrays of a specific length for the rating icons and the range icons.
  loopCounter: Array<number>;
  remainingLoopCounter: Array<number>;

  static createEmptyArrayWithSpecificLengthForNgFor(length): Array<number> {
    return new Array<number>(length);
  }

  ngOnInit() {
    // debugger;

    this.isShowingRange = this.showRange !== 'false';

    const ratingCount = this.normalizeRatingValue();
    this.loopCounter = RatingComponentV2.createEmptyArrayWithSpecificLengthForNgFor(ratingCount);

    if ( this.icon === undefined ) {
      this.icon = 'fa fa-star';
    }

    if ( this.color === undefined ) {
      this.color = 'blue';
    }

    this.spacing += 'px';
    this.height += 'px';
    this.marginTop += 'px';
    this.marginBottom += 'px';
  }

  // Need to recompute the size of the array when the data changes.
  ngOnChanges() {
      if ( this.debugComp ) { console.log( `RatingComponentV2: rating value: ${this.rating}` ); }

      this.isShowingRange = this.showRange !== 'false';

      const ratingCount = this.normalizeRatingValue();

      this.loopCounter = RatingComponentV2.createEmptyArrayWithSpecificLengthForNgFor(ratingCount);

      // For showing the range
      let remaining;
      if ( this.isShowingRange ) {
          remaining = 5 - ratingCount;
      }
      else {
          remaining = 0;
      }
      this.remainingLoopCounter = RatingComponentV2.createEmptyArrayWithSpecificLengthForNgFor(remaining);

      if ( this.debugComp ) { console.log(`loopCount1: $loopCount1, loopCount2: $loopCount1, remaining: $remaining`); }
  }

    private normalizeRatingValue() {
        let ratingCount;
        if (this.rating !== undefined) {
            ratingCount = Number(this.rating);
            if (isNaN(ratingCount)) {
                ratingCount = 0;
            }
        }
        else {  // no data is selected in combo-box so model is not initialized with any data
            ratingCount = 0;
        }

        if ( ratingCount > 5 ) {
            ratingCount = 5;
        }

        return ratingCount;
    }
}
