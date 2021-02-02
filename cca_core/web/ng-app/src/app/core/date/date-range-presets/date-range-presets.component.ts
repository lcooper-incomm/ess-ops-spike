import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { GenericOption } from '../../model/generic-option';
import { DateRangePreset } from './date-range-preset';
import { DateService } from '../date.service';
import * as moment from 'moment';
import { MaplesDateRange } from '@cscore/maples-client-model';
import { DateFormat } from '../date-format';
import { DateRangeService } from '../date-range.service';

@Component({
  selector: 'cca-date-range-presets',
  templateUrl: './date-range-presets.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateRangePresetsComponent {
  @Input() activationDate: Date;
  @Input() defaultDateRange: MaplesDateRange;
  @Input() format: DateFormat = DateFormat.MOMENT_DATE_ISO_FORMAT;
  @Input() options: GenericOption<DateRangePreset>[] = this.dateRangeService.getDateRangePresetOptions();

  @Output() select: EventEmitter<MaplesDateRange> = new EventEmitter();

  constructor(private dateRangeService: DateRangeService, private dateService: DateService) {
  }

  selectPreset(preset: DateRangePreset): void {
    const dateRange: MaplesDateRange = this.buildDateRangeFromPreset(preset);
    if (dateRange) {
      this.select.emit(dateRange);
    }
  }

  private buildDateRangeFromPreset(preset: DateRangePreset): MaplesDateRange {
    switch (preset) {
      case DateRangePreset.DEFAULT:
        return this.defaultDateRange;
      case DateRangePreset.TODAY:
        return {
          startDate: this.dateService.formatMomentToDateString(moment(), this.format),
          endDate: this.dateService.formatMomentToDateString(moment(), this.format),
        };
      case DateRangePreset.YESTERDAY:
        return {
          startDate: this.dateService.formatMomentToDateString(moment().subtract(1, DateService.MOMENT_DAY_UNIT), this.format),
          endDate: this.dateService.formatMomentToDateString(moment().subtract(1, DateService.MOMENT_DAY_UNIT), this.format),
        };
      case DateRangePreset.WEEK_TO_DATE:
        return {
          startDate: this.dateService.formatMomentToDateString(moment().day(0), this.format),
          endDate: this.dateService.formatMomentToDateString(moment(), this.format),
        };
      case DateRangePreset.MONTH_TO_DATE:
        return {
          startDate: this.dateService.formatMomentToDateString(moment().date(1), this.format),
          endDate: this.dateService.formatMomentToDateString(moment(), this.format),
        };
      case DateRangePreset.YEAR_TO_DATE:
        return {
          startDate: this.dateService.formatMomentToDateString(moment().dayOfYear(1), this.format),
          endDate: this.dateService.formatMomentToDateString(moment(), this.format),
        };
      case DateRangePreset.MONTH_OF_ACTIVATION:
        return this.activationDate && {
          startDate: this.dateService.formatMomentToDateString(moment(this.activationDate), this.format),
          endDate: this.dateService.formatMomentToDateString(moment(this.activationDate).add(30, DateService.MOMENT_DAY_UNIT), this.format),
        };
      case DateRangePreset.FIRST_6_MONTHS:
        return this.activationDate && {
          startDate: this.dateService.formatMomentToDateString(moment(this.activationDate), this.format),
          endDate: this.dateService.formatMomentToDateString(moment(this.activationDate).add(6, DateService.MOMENT_MONTH_UNIT), this.format),
        };
      case DateRangePreset.PREVIOUS_WEEK:
        const previousSundayMoment = moment().day(0).subtract(7, DateService.MOMENT_DAY_UNIT);
        return {
          startDate: this.dateService.formatMomentToDateString(previousSundayMoment, this.format),
          endDate: this.dateService.formatMomentToDateString(moment(previousSundayMoment).add(6, DateService.MOMENT_DAY_UNIT), this.format),
        };
      case DateRangePreset.PREVIOUS_MONTH:
        const firstDayOfPreviousMonthMoment = moment().date(1).subtract(1, DateService.MOMENT_MONTH_UNIT);
        const lastDayOfPreviousMonthMoment = moment().date(1).subtract(1, DateService.MOMENT_DAY_UNIT);
        return {
          startDate: this.dateService.formatMomentToDateString(firstDayOfPreviousMonthMoment, this.format),
          endDate: this.dateService.formatMomentToDateString(lastDayOfPreviousMonthMoment, this.format),
        };
      case DateRangePreset.LAST_7_DAYS:
        return {
          startDate: this.dateService.formatMomentToDateString(moment().subtract(7, DateService.MOMENT_DAY_UNIT), this.format),
          endDate: this.dateService.formatMomentToDateString(moment(), this.format),
        };
      case DateRangePreset.LAST_30_DAYS:
        return {
          startDate: this.dateService.formatMomentToDateString(moment().subtract(30, DateService.MOMENT_DAY_UNIT), this.format),
          endDate: this.dateService.formatMomentToDateString(moment(), this.format),
        };
      case DateRangePreset.LAST_60_DAYS:
        return {
          startDate: this.dateService.formatMomentToDateString(moment().subtract(60, DateService.MOMENT_DAY_UNIT), this.format),
          endDate: this.dateService.formatMomentToDateString(moment(), this.format),
        };
      case DateRangePreset.LAST_90_DAYS:
        return {
          startDate: this.dateService.formatMomentToDateString(moment().subtract(90, DateService.MOMENT_DAY_UNIT), this.format),
          endDate: this.dateService.formatMomentToDateString(moment(), this.format),
        };
      case DateRangePreset.LAST_6_MONTHS:
        return {
          startDate: this.dateService.formatMomentToDateString(moment().subtract(6, DateService.MOMENT_MONTH_UNIT), this.format),
          endDate: this.dateService.formatMomentToDateString(moment(), this.format),
        };
      default:
        return undefined;
    };
  }
}
