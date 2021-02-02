import { Component, Input } from '@angular/core';
import { ComplaintComponent } from "../../model/complaint-component";
import { BankType } from "../../../complaint/bank";
import { getPriorityDisplayValue } from '../../model/complaint-priority';

@Component ( {
  selector: 'cca-complaint-session-component',
  templateUrl: './complaint-session-component.component.html',
  styleUrls: [ './complaint-session-component.component.scss' ]
} )
export class ComplaintSessionComponentComponent {
  @Input () component: ComplaintComponent;
            BankType = BankType;
  constructor () {
  }

  isBankType(...bankTypes: BankType[]): boolean {
    return this.component.bank && bankTypes.includes(this.component.bank.systemValue);
  }

  get priority(): string {
    return this.component && getPriorityDisplayValue(this.component.priority);
  }
}
