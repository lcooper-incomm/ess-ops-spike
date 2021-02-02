import { Component, OnInit } from '@angular/core';
import { MinionFormType, TaskSendableForm } from "../../../../model/minion/task/task-sendable-form";
import { WizardPage } from "../../../../wizard/wizard-page";
import { FormTypeOption, VmsSendFormWizard } from "../vms-send-form-wizard";
import { MinionUtilsService } from "../../../../model/minion/minion-utils.service";
import { WizardWidth } from "../../../../wizard/wizard-width.enum";
import { Observable, of } from "rxjs";
import { MonthGenericOptionService } from "../../../../form/month-generic-option.service";
import { FormGroup } from "@angular/forms";
import { FormService } from "../../../form.service";
import { catchError, map } from "rxjs/operators";
import { DeliveryMethodCode } from 'src/app/core/model/minion/task/delivery-method';

@Component ( {
  selector: 'cca-vms-send-form-confirm-page',
  templateUrl: './vms-send-form-confirm-page.component.html',
  styleUrls: [ './vms-send-form-confirm-page.component.scss' ]
} )
export class VmsSendFormConfirmPageComponent extends WizardPage<VmsSendFormWizard> implements OnInit {

  backButtonText: string      = 'No';
  closeButtonText: string     = 'Cancel';
  readonly DeliveryMethodCode = DeliveryMethodCode;
  easyMonth: string;
  isBackable: boolean         = true;
  isCloseable: boolean        = true;
  isNextable: boolean         = true;
  key: string                 = 'confirm-page';
  nextButtonText: string      = 'Yes';
  wizardForm: FormGroup       = new FormGroup ( {} );

  constructor ( private formService: FormService,
                private minionUtil: MinionUtilsService,
                private monthOptionService: MonthGenericOptionService ) {
    super ();
    this.width = WizardWidth.MEDIUM;
  }

  ngOnInit () {
  }

  onLoad (): Observable<any> {
    this.easyMonth = this.monthOptionService.months_en[ this.wizard.model.selectedMonth ];
    return of ( null );
  }

  onNext (): Observable<string> {
    this.setDatesOnModel ();
    let request = this.buildSendableFormTask ();

    return this.formService.sendForm ( request )
      .pipe (
        map ( () => {
          this.wizard.model.actionFailed = false;
          return 'results-page';
        } ),
        catchError ( () => {
          this.wizard.model.actionFailed = true;
          // toggle some other wizardModel boolean here to show a special message when APLS returns 404 - no data found for request. Minion or minion-client needs to change first
          return of ( 'results-page' );
        } ),
      );
  }

  private buildSendableFormTask (): TaskSendableForm {
    let sendableFormTask: any;
    switch ( this.wizard.model.selectedFormType ) {

      case FormTypeOption.ACCOUNT_STATEMENT:
        sendableFormTask = this.minionUtil.createAccountStatementTaskFromSendFormWizard ( this.wizard.model );

        // if there are multiple different account statement FormType possibilities, determine which one to use here
        // sendableFormTask.formType = MinionFormType.WHATEVER
        break;

      case FormTypeOption.DIRECT_DEPOSIT:
        sendableFormTask = this.minionUtil.createDirectDepositTaskFromSendFormWizard ( this.wizard.model );

        // determine form type
        if ( this.wizard.model.selection.getCustomer ().isMomentumMc ) {
          sendableFormTask.formType = MinionFormType.DIRECT_DEPOSIT_MOMENTUM_MC;
        }
        else if ( this.wizard.model.selection.getCustomer ().isMomentumVisa ) {
          sendableFormTask.formType = MinionFormType.DIRECT_DEPOSIT_MOMENTUM_VISA;
        }
        else if ( this.wizard.model.selection.getCustomer ().isTitaniumMc ) {
          sendableFormTask.formType = MinionFormType.DIRECT_DEPOSIT_TITANIUM_MC;
        }
        else {
          sendableFormTask.formType = MinionFormType.DIRECT_DEPOSIT_GPR;
        }
        break;
    }

    return sendableFormTask;
  }

  private setDatesOnModel (): void {
    this.wizard.model.startDate = this.minionUtil.convertDateToStringForAccountStatement ( new Date ( this.wizard.model.selectedYear, this.wizard.model.selectedMonth, 1 ) );
    this.wizard.model.endDate   = this.minionUtil.convertDateToStringForAccountStatement ( new Date ( this.wizard.model.selectedYear, this.wizard.model.selectedMonth + 1, 0 ) );
  }

}
