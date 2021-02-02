import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {CsCoreTimestamp} from '@cscore/core-client-model';
import {DateFormat} from './date-format';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  public static readonly MOMENT_DAY_UNIT         = 'd';
  public static readonly MOMENT_MONTH_UNIT       = 'M';

  constructor() {
  }

  buildCsCoreTimestampFromDateString(value: string): CsCoreTimestamp {
    let timestampMoment = moment(value, DateFormat.MOMENT_DATE_FORMAT);
    return new CsCoreTimestamp({
      displayValue: value,
      value: timestampMoment.endOf(DateService.MOMENT_DAY_UNIT).toDate()
    });
  }

  buildCsCoreTimestampFromDateTimeString(value: string): CsCoreTimestamp {
    let timestampMoment = moment(value, DateFormat.MOMENT_DATE_TIME_FORMAT);
    if (!timestampMoment.isValid()) {
      throw new Error('Invalid date');
    }
    return new CsCoreTimestamp({
      displayValue: value,
      value: timestampMoment.toDate()
    });
  }

  buildMomentFromDateString(value: string, format: DateFormat = DateFormat.MOMENT_DATE_FORMAT): Moment {
    return moment(value, format);
  }

  buildMomentFromDateStringISO(value: string): Moment {
    return this.buildMomentFromDateString(value, DateFormat.MOMENT_DATE_ISO_FORMAT);
  }

  /**
   * VMS dateOfBirth comes to us in yyyy-MM-dd, but we want to display it in our form fields as MM/dd/yyyy.
   */
  convertYYYYMMDDToMMDDYYYY(value: string): string {
    return this.formatMomentToDateString(moment(value, DateFormat.MOMENT_DATE_ISO_FORMAT));
  }

  convertMMDDYYYYToYYYYMMDD(value: string): string {
    return moment(value, DateFormat.MOMENT_DATE_FORMAT).format(DateFormat.MOMENT_DATE_ISO_FORMAT);
  }

  convertMMDDYYYYHHmmZToYYYYMMDDUtc(value: string): string {
    return moment(value, DateFormat.CSCORE_DATE_TIME_FORMAT)
        .utc()
        .format(DateFormat.MOMENT_DATE_ISO_FORMAT);
  }

  formatDateToDateString(value: Date): string {
    return this.formatMomentToDateString(moment(value));
  }

  formatDateToDateStringISO(value: Date): string {
    return this.formatMomentToDateStringISO(moment(value));
  }

  formatMomentToDateString(value: Moment, format: DateFormat = DateFormat.MOMENT_DATE_FORMAT): string {
    return value.format(format);
  }

  formatMomentToDateStringISO(value: Moment): string {
    return value.format(DateFormat.MOMENT_DATE_ISO_FORMAT);
  }

  formatDateToDateTimeString(value: Date): string {
    return this.formatMomentToDateTimeString(moment(value));
  }

  formatMomentToDateTimeString(value: Moment): string {
    return value.format(DateFormat.MOMENT_DATE_TIME_FORMAT);
  }

}
