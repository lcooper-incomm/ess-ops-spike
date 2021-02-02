import {GenericOption} from '../../model/generic-option';

export enum EncorPriority {
  HIGH   = 'High',
  MEDIUM = 'Medium',
  LOW    = 'Low'
}

export class EncorComponent {
  id: number;
  priority: string;
  customerId: string;
  orderId: string;
  issueType: number;
  complaintType: number;

  constructor(data: any = null) {
    if (data) {
      Object.assign(this, data);
    }
  }
}

export function buildPriorityOptions(): GenericOption<any>[] {
  let priorityOptions: GenericOption<any>[] = [];

  let i: number = 0;
  for (let priority of Object.values(EncorPriority)) {
    priorityOptions.push({
      value: priority,
      displayValue: priority,
      sortOrder: i++
    });
  }
  return priorityOptions;
}
