import {ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import * as _ from 'lodash';
import {DictionaryService} from '../../dictionary/dictionary.service';
import {Dictionary} from '../../dictionary/dictionary';

@Component ( {
  selector: 'cca-key-value-with-placeholder',
  templateUrl: './key-value-with-placeholder.component.html',
  styleUrls: [ './key-value-with-placeholder.component.scss' ]
} )
export class KeyValueWithPlaceholderComponent implements OnChanges {

  @Input ()
  alignment: string       = 'start start';
  @Input ()
  key: string;
  @Input ()
  keyWidthPercent: number = 40;
  @Input ()
  value: any;
  @Input ()
  valueClass: string = 'value-container';
  @Input ()
  naValue: string = 'Not Available';
  @Input()
  dictionary: string;

  displayValue: string;
  isUndefined: boolean = false;

  constructor(private dictionaryService: DictionaryService,
              private changeDetectorRef: ChangeDetectorRef) {}

  ngOnChanges (changes: SimpleChanges) {
    this.isUndefined = typeof this.value === 'undefined' || this.value === null || _.trim ( this.value ) === '';

    if (this.dictionary && (changes['dictionary'] || changes['value'])) {
      this.updateValueFromDictionary();
    }
  }

  /**
   * This assumes the value is the id of the dictionary.  It does a lookup and finds the display for that value.
   */
  private updateValueFromDictionary(): void {
    this.dictionaryService.find(this.dictionary, this.value).subscribe((dictionary: Dictionary) => {
      if (dictionary) {
        if (dictionary.group) {
          this.displayValue = dictionary.group + ' - ' + dictionary.displayValue;
        } else {
          this.displayValue = dictionary.displayValue;
        }
      } else {
        this.displayValue = null;
      }
      this.changeDetectorRef.detectChanges();
    });
  }
}
