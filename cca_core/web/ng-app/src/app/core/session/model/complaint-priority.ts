import {GenericOption} from '../../model/generic-option';
export enum ComplaintPriority {
  HIGH = 1,
  MEDIUM = 2,
  LOW = 3,
}

export function getPriorityDisplayValue(value: ComplaintPriority) {
  switch (value) {
    case ComplaintPriority.HIGH:
      return 'High';
    case ComplaintPriority.MEDIUM:
      return 'Medium';
    case ComplaintPriority.LOW:
      return 'Low';
  }
}

export function complaintPriorityOptions(): GenericOption<ComplaintPriority>[] {
  return [ComplaintPriority.HIGH, ComplaintPriority.MEDIUM, ComplaintPriority.LOW].map((value, i) => {
    return {
      value,
      displayValue: getPriorityDisplayValue(value),
      sortOrder: i,
    };
  });
}