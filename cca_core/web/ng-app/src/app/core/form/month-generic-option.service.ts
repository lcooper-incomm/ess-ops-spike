import { Injectable } from '@angular/core';
import { GenericOption } from "../model/generic-option";

@Injectable ( {
  providedIn: 'root'
} )
export class MonthGenericOptionService {

  months_en: string[] = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

  constructor () {
  }

  public getSingleMonthOption_en ( index: number ): GenericOption<number> {
    if( index >= 0 && index < this.months_en.length ) {
      return { value: index, displayValue: this.months_en[ index ] };
    } else {
      return null;
    }
  }

  public monthOptions_en (): GenericOption<number>[] {
    return [
      {
        value: 0,
        displayValue: 'January'
      },
      {
        value: 1,
        displayValue: 'February'
      },
      {
        value: 2,
        displayValue: 'March'
      },
      {
        value: 3,
        displayValue: 'April'
      },
      {
        value: 4,
        displayValue: 'May'
      },
      {
        value: 5,
        displayValue: 'June'
      },
      {
        value: 6,
        displayValue: 'July'
      },
      {
        value: 7,
        displayValue: 'August'
      },
      {
        value: 8,
        displayValue: 'September'
      },
      {
        value: 9,
        displayValue: 'October'
      },
      {
        value: 10,
        displayValue: 'November'
      },
      {
        value: 11,
        displayValue: 'December'
      }
    ];
  }
}
