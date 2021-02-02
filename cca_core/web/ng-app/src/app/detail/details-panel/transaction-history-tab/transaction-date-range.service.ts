import {Injectable} from '@angular/core';
import {Selection, SelectionDataType} from "../../../core/session/model/selection";
import {PlatformType} from "../../../core/platform/platform-type.enum";
import * as moment from "moment";
import {PropertyService} from "../../../core/config/property.service";
import {PropertyType} from "../../../core/model/property-type.enum";
import {SelectionType} from "../../../core/session/model/selection-type.enum";
import {DateService} from "../../../core/date/date.service";
import {GenericOption} from "../../../core/model/generic-option";
import {DateRangePreset} from "../../../core/date/date-range-presets/date-range-preset";
import * as _ from "lodash";
import {DateRangeService} from 'src/app/core/date/date-range.service';
import {MaplesDateRange} from '@cscore/maples-client-model';
import {CompositeTransactionRequest} from './composite-transaction-request';
import {TransactionSearchRequest} from './transaction-search-request';

@Injectable ( {
  providedIn: 'root'
} )
export class TransactionDateRangeService {

  constructor (
    private dateRangeService: DateRangeService,
    private dateService: DateService,
    private propertyService: PropertyService,
  ) {
  }

  getDateRangeOptions(): GenericOption<DateRangePreset>[] {
    return this.dateRangeService
      .getDateRangePresetOptions()
      .filter((option: GenericOption<DateRangePreset>) => option.value !== DateRangePreset.YEAR_TO_DATE);
  }

  getDateRangeOptionsForSelection ( selection: Selection<any> ): GenericOption<DateRangePreset>[] {
    let isActivationAware = selection.type === SelectionType.CARD
      && selection.getCard ()
      && selection.getCard ().activation
      && selection.getCard ().activation.activationDate;

    if (isActivationAware) {
      return [
        ...this.dateRangeService.getDateRangePresetOptions(),
        { value: DateRangePreset.MONTH_OF_ACTIVATION, displayValue: 'Month of Activation' },
        { value: DateRangePreset.FIRST_6_MONTHS, displayValue: 'First 6 Months' },
      ];
    } else {
      return this.dateRangeService.getDateRangePresetOptions();
    }
  }

  getDefaultDateRangeForSelection(selection: Selection<SelectionDataType>): MaplesDateRange {
    // Clone selection but omit start and end dates (cached values), so we get the true defaults
    const transactionSearchRequest: TransactionSearchRequest = Object.assign(new TransactionSearchRequest(), { startDate: null, endDate: null })
    const transactionRequests = Object.assign(new CompositeTransactionRequest(), selection.transactionRequests, { current: transactionSearchRequest });
    selection = Object.assign(new Selection(), selection, { transactionRequests });
    
    return {
      startDate: this.getDefaultStartDateForSelection(selection),
      endDate: this.getDefaultEndDateForSelection(selection),
    };
  }

  getDefaultEndDateForSelection ( selection: Selection<any> ): string {
    let endDateMoment = moment ();
    let request       = selection.getDefaultTransactionSearchRequest ();

    //As long as the platform is not CASHTIE...
    if ( selection.platform !== PlatformType.CASHTIE ) {
      //If we have a startDate (we should), set endDate to default range after startDate
      if ( request.startDate ) {
        let startDateMoment        = this.dateService.buildMomentFromDateString ( request.startDate );
        let defaultDateRangeInDays = this.getDefaultDateRangeInDays ( selection );
        endDateMoment              = moment ( startDateMoment ).add ( defaultDateRangeInDays, DateService.MOMENT_DAY_UNIT );
      }
      //If endDate is past today, reset it back to today
      if ( endDateMoment.isAfter ( moment () ) ) {
        endDateMoment = moment ();
      }
    }

    return this.dateService.formatMomentToDateString ( endDateMoment );
  }

  getDefaultStartDateForSelection ( selection: Selection<any> ): string {
    let startDateMoment = moment ();
    let request         = selection.getDefaultTransactionSearchRequest ();

    //Set to endDate if endDate is present, so we can apply our default date range in a moment
    if ( request.endDate ) {
      startDateMoment = this.dateService.buildMomentFromDateString ( request.endDate );
    }

    //If CASHTIE, override to account's create date
    if ( selection.platform === PlatformType.CASHTIE && selection.getAccount ().createDate ) {
      startDateMoment = moment ( selection.getAccount ().createDate.value );
    }
    //Else, push startDate back by the default range
    else {
      let defaultDateRangeInDays = this.getDefaultDateRangeInDays ( selection );
      startDateMoment.subtract ( defaultDateRangeInDays, DateService.MOMENT_DAY_UNIT );
    }

    return this.dateService.formatMomentToDateString ( startDateMoment );
  }

  /**
   * An archive request is only required if the platform is INCOMM and the startDate is more than 60 days ago.
   */
  isArchiveRequestRequired ( selection: Selection<any> ): boolean {
    let archiveRequest         = selection.transactionRequests.archive;
    let startDateMoment        = this.dateService.buildMomentFromDateString ( archiveRequest.startDate );
    let isMoreThanSixtyDaysAgo = moment().diff(startDateMoment, DateService.MOMENT_DAY_UNIT) > 60;

    return archiveRequest.platform === PlatformType.INCOMM && isMoreThanSixtyDaysAgo;
  }

  validateDateRange ( selection: Selection<any> ): boolean {
    const request = selection.getDefaultTransactionSearchRequest ();
    const dateRange = {
      startDate: request.startDate,
      endDate: request.endDate,
    };

    const defaultStartDate = this.getDefaultStartDateForSelection ( selection );
    const defaultEndDate = this.getDefaultEndDateForSelection ( selection );
    const maximumRange = this.getMaximumDateRangeInDays ( selection );

    return this.dateRangeService.validateDateRange(dateRange, defaultStartDate, defaultEndDate, maximumRange);
  }

  private getDefaultDateRangeInDays ( selection: Selection<any> ): number {
    let propertyName = this.getDefaultDateRangeProperty ( selection );
    let stringValue  = this.propertyService.findOneValueFromSnapshot ( propertyName );
    return stringValue ? Number ( stringValue ) : 90; //If all else fails, which shouldn't happen, default to 90 days.
  }

  private getDefaultDateRangeProperty ( selection: Selection<any> ): PropertyType {
    let propertyName: PropertyType;
    let request = selection.getDefaultTransactionSearchRequest ();

    switch ( selection.type ) {
      case SelectionType.ACCOUNT:
        propertyName = PropertyType.DEFAULT_CASHTIE_HISTORY_DATE_RANGE;
        break;
      case SelectionType.CUSTOMER:
        propertyName = PropertyType.DEFAULT_CUSTOMER_HISTORY_DATE_RANGE;
        break;
      case SelectionType.LOCATION:
        propertyName = PropertyType.DEFAULT_LOCATION_HISTORY_DATE_RANGE;
        break;
      case SelectionType.CARD:
        let isGreenCard = request.platform === PlatformType.GREENCARD;
        propertyName    = isGreenCard ? PropertyType.DEFAULT_GC_PRODUCT_HISTORY_DATE_RANGE : PropertyType.DEFAULT_MM_PRODUCT_HISTORY_DATE_RANGE;
        break;
      default:
        propertyName = PropertyType.DEFAULT_MM_PRODUCT_HISTORY_DATE_RANGE;
        break;
    }

    return propertyName;
  }

  private getMaximumDateRangeInDays ( selection: Selection<any> ): number {
    let request = selection.getDefaultTransactionSearchRequest ();
    let value: number;

    switch ( request.platform ) {
      case PlatformType.CASHTIE:
        value = 3650;
        break;
      case PlatformType.GREENCARD:
        value = this.getDefaultDateRangeInDays ( selection );
        break;
      case PlatformType.CCL:
      case PlatformType.VMS:
        value = 365;
        break;
      default:
        value = 180;
        break;
    }

    return value;
  }
}
