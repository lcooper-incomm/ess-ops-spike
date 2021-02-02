import { Injectable } from '@angular/core';
import * as moment from "moment";
import { ToastFactory } from "../../toast/toast-factory.service";
import { DateService } from "./date.service";
import { MaplesDateRange } from '@cscore/maples-client-model';
import { GenericOption } from '../model/generic-option';
import { DateRangePreset } from './date-range-presets/date-range-preset';
import * as _ from 'lodash';

const presetOptions: GenericOption<DateRangePreset>[] = [
  { value: DateRangePreset.DEFAULT, displayValue: 'Default' },
  { value: DateRangePreset.TODAY, displayValue: 'Today' },
  { value: DateRangePreset.YESTERDAY, displayValue: 'Yesterday' },
  { value: DateRangePreset.WEEK_TO_DATE, displayValue: 'Week to Date' },
  { value: DateRangePreset.MONTH_TO_DATE, displayValue: 'Month to Date' },
  { value: DateRangePreset.YEAR_TO_DATE, displayValue: 'Year to Date' },
  { value: DateRangePreset.PREVIOUS_WEEK, displayValue: 'Previous Week' },
  { value: DateRangePreset.PREVIOUS_MONTH, displayValue: 'Previous Month' },
  { value: DateRangePreset.LAST_7_DAYS, displayValue: 'Last 7 Days' },
  { value: DateRangePreset.LAST_30_DAYS, displayValue: 'Last 30 Days' },
  { value: DateRangePreset.LAST_60_DAYS, displayValue: 'Last 60 Days' },
  { value: DateRangePreset.LAST_90_DAYS, displayValue: 'Last 90 Days' },
  { value: DateRangePreset.LAST_6_MONTHS, displayValue: 'Last 6 Months' },
];

@Injectable({
  providedIn: 'root'
})
export class DateRangeService {

  constructor(
    private dateService: DateService,
    private toastFactory: ToastFactory,
  ) {
  }

  getDateRangePresetOptions(): GenericOption<DateRangePreset>[] {
    return presetOptions;
  }

  validateDateRange(dateRange: MaplesDateRange, defaultStartDate: string, defaultEndDate: string, maximumRange?: number): boolean {
    //Start must be provided, set to default if missing
    if (!dateRange.startDate) {
      dateRange.startDate = defaultStartDate;
    }
    //End must be provided, set to default if missing
    if (!dateRange.endDate) {
      dateRange.endDate = defaultEndDate;
    }

    let startDateMoment = this.dateService.buildMomentFromDateString(dateRange.startDate);
    let endDateMoment = this.dateService.buildMomentFromDateString(dateRange.endDate);
    let todayMoment = moment();

    //Start cannot be in the future, reset to today if it is
    if (startDateMoment.isAfter(todayMoment)) {
      startDateMoment = moment(todayMoment);
      dateRange.startDate = this.dateService.formatMomentToDateString(startDateMoment);
      this.toastFactory.info('Start Date was reset to Today, because it cannot be in the future.');
    }
    //End cannot be in the future, reset to today if it is
    if (endDateMoment.isAfter(todayMoment)) {
      endDateMoment = moment(todayMoment);
      dateRange.endDate = this.dateService.formatMomentToDateString(endDateMoment);
      this.toastFactory.info('End Date was reset to Today, because it cannot be in the future.');
    }
    //Start cannot be after End, reset to default if it is
    if (startDateMoment.isAfter(endDateMoment)) {
      let newStartDate = defaultStartDate;
      let newStartDateMoment = this.dateService.buildMomentFromDateString(newStartDate);
      //Now, the new Start Date can't still be after the End Date, so if it is, reset the End Date to default instead
      if (newStartDateMoment.isBefore(endDateMoment)) {
        dateRange.startDate = this.dateService.formatMomentToDateString(newStartDateMoment);
        this.toastFactory.info('Start Date was reset to Default, because it cannot be after End Date.');
      } else {
        dateRange.endDate = defaultEndDate;
        this.toastFactory.info('End Date was reset to Default, because it cannot be before Start Date.');
      }
    }

    //Before we check the range, refresh the moments, to be sure we're checking the right values
    startDateMoment = this.dateService.buildMomentFromDateString(dateRange.startDate);
    endDateMoment = this.dateService.buildMomentFromDateString(dateRange.endDate);

    if (maximumRange != undefined) {
      //Range cannot exceed specified limits
      let difference = Math.abs(startDateMoment.diff(endDateMoment, DateService.MOMENT_DAY_UNIT));
      if (difference > maximumRange) {
        startDateMoment = moment(endDateMoment).subtract(maximumRange, DateService.MOMENT_DAY_UNIT);
        dateRange.startDate = this.dateService.formatMomentToDateString(startDateMoment);
        this.toastFactory.info('Start Date was reset to maximum allowed from End Date.');
      }
    }

    return true;
  }
}
