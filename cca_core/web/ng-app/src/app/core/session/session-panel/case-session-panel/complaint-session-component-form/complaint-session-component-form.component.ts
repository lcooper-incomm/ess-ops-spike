import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../../app-state";
import { Bank, BankType } from "../../../../complaint/bank";
import { BankService } from "../../../../complaint/bank.service";
import { ComplaintComponent } from "../../../model/complaint-component";
import * as _ from "lodash";
import { UpdateComplaintComponentAction } from "../../../action/session-actions";
import { ComplaintComponentService } from "./complaint-component.service";
import { mapTo, tap } from "rxjs/operators";
import { GenericOption } from '../../../../model/generic-option';
import { ComplaintPriority, complaintPriorityOptions } from '../../../model/complaint-priority';
import { AutoSavingSessionComponentForm } from '../auto-saving-session-component-form';
import { Observable } from 'rxjs';
import { SecurityService } from 'src/app/core/security/security.service';

@Component ( {
  selector: 'cca-complaint-session-component-form',
  templateUrl: './complaint-session-component-form.component.html',
  styleUrls: [ './complaint-session-component-form.component.scss' ]
} )
export class ComplaintSessionComponentFormComponent extends AutoSavingSessionComponentForm implements OnInit {
  
  banks: Bank[]                          = [];
  complaintComponent: ComplaintComponent = new ComplaintComponent ();
  @Input ()
  form: FormGroup;
  priorityOptions: GenericOption<ComplaintPriority>[] = complaintPriorityOptions();

  constructor ( 
    private bankService: BankService,
    private complaintComponentService: ComplaintComponentService,
    private securityService: SecurityService,
    store: Store<AppState>,
  ) {
    super (store)
  }

  ngOnInit () {
    super.ngOnInit();
    this.loadBanks ();
  }

  get bank(): Bank {
    const bank: Bank = this.form.get('bank').value;
    return this.banks && this.banks.find(b => this.compareBanks(bank, b)) || bank;
  }

  get isMastercard(): boolean {
    return this.bank && this.bank.systemValue === BankType.MASTERCARD;
  }

  private loadBanks () {
    this.bankService.findAll ()
      .subscribe ( (( banks: Bank[] ) => {
        this.banks = banks.filter(bank => this.securityService.hasPermission(`CREATE_COMPLAINT_${bank.systemValue}`));
        this.handleBankChanged ();
      }) )
  }

  compareBanks ( a: Bank, b: Bank ): boolean {
    return a && b && a.systemValue === b.systemValue;
  }

  handleBankChanged (): void {
    if ( this.bank ) {
      this.updateFieldIfNull ( 'source', this.complaintComponent.source );
      this.updateFieldIfNull ( 'type', this.complaintComponent.type );
      this.updateFieldIfNull ( 'department', this.complaintComponent.department );

      switch ( this.bank.systemValue ) {
        case BankType.AMERICAN_EXPRESS:
        case BankType.BANCORP:
          this.updateFieldValidators ( 'cause', [ Validators.required ] );
          this.updateFieldValidators ( 'type', [ Validators.required ] );
          break;
        case BankType.MASTERCARD:
        case BankType.METABANK:
          this.updateFieldValidators ( 'cause', [] );
          this.updateFieldValidators ( 'type', [] );
          break;
        default:
          break;
      }
    }
  }

  protected autoSave ( formValue: any ): Observable<void> {
    const request: ComplaintComponent = new ComplaintComponent(formValue);
    request.id = this.session.complaintComponent.id;
    return this.complaintComponentService.updateOne ( request )
      .pipe (
        tap ( complaintComponent => this.store.dispatch ( new UpdateComplaintComponentAction ( complaintComponent ) ) ),
        mapTo ( null ),
      );
  }

  private updateFieldIfNull ( key: string, value: any ): void {
    if ( !this.form.get ( key ).value ) {
      this.form.get ( key ).setValue ( value );
    }
  }

  private updateFieldValidators ( key: string, validators: any[] ): void {
    this.form.get ( key ).setValidators ( validators );
  }
}
