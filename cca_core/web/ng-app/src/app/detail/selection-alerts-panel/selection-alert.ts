import {SelectionAlertType} from "./selection-alert-type.enum";
import {Session} from "../../core/session/model/session";
import {OrderRelatedJobView} from "../../core/order/order-related-job-view";

export enum SelectionAlertPeriodType {
  DAY   = 'day',
  HOUR  = 'hour',
  MONTH = 'month',
  WEEK  = 'week'
}

export class SelectionAlert {

  isClickable: boolean = true;
  priority: number;
  type: SelectionAlertType;
}

export class FraudCaseSelectionAlert extends SelectionAlert {

  relatedCases: Session[] = [];
}

export class OrderJobInProgressSelectionAlert extends SelectionAlert {

  relatedJobs: OrderRelatedJobView[] = [];
}
