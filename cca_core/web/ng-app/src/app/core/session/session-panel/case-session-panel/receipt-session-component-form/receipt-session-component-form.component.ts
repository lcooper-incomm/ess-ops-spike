import { Component, ViewChild } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from "../../../../../app-state";
import { AppStateType } from "../../../../../app-state-type.enum";
import { UpdateReceiptComponentAction } from "../../../action/session-actions";
import { ReceiptComponentService } from './receipt-component.service';
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { ReceiptComponentCard } from "../../../model/receipt-component-card";
import * as _ from "lodash";
import { WizardRunner } from "../../../../wizard/wizard-runner/wizard-runner.service";
import { AddReceiptCardWizard } from "./add-receipt-card-wizard/add-receipt-card-wizard";
import { EditReceiptCardWizard } from "./edit-receipt-card-wizard/edit-receipt-card-wizard";
import { AutoSavingSessionComponentForm } from '../auto-saving-session-component-form';
import { Observable } from 'rxjs';
import { tap, mapTo } from 'rxjs/operators';

@Component ( {
  selector: 'cca-receipt-session-component-form',
  templateUrl: './receipt-session-component-form.component.html',
  styleUrls: [ './receipt-session-component-form.component.scss' ]
} )
export class ReceiptSessionComponentFormComponent extends AutoSavingSessionComponentForm {

  dataSource                 = new MatTableDataSource<ReceiptComponentCard> ();
  displayedColumns: string[] = [ 'van', 'serialNumber', 'packageVan', 'productType', 'initialLoadAmount' ];

  paymentMethodOptions = [
    {
      value: 'VISA',
      displayValue: 'VISA'
    },
    {
      value: 'MASTERCARD',
      displayValue: 'MasterCard'
    },
    {
      value: 'DISCOVER',
      displayValue: 'Discover'
    },
    {
      value: 'AMERICAN_EXPRESS',
      displayValue: 'American Express'
    },
    {
      value: 'CASH',
      displayValue: 'Cash'
    },
    {
      value: 'DEBIT',
      displayValue: 'Debit'
    },
    {
      value: 'MONEY_ORDER',
      displayValue: 'Money Order'
    }
  ];

  @ViewChild ( MatPaginator )
  paginator: MatPaginator;
  @ViewChild ( MatSort )
  sort: MatSort;

  constructor ( private receiptComponentService: ReceiptComponentService,
                store: Store<AppState>,
                private wizardRunner: WizardRunner ) {
    super ( store );
  }

  ngOnInit () {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort      = this.sort;
    super.ngOnInit ();
  }

  openAddReceiptCardDialog (): void {
    let wizard           = new AddReceiptCardWizard ();
    wizard.model.session = this.session;
    this.wizardRunner.run ( wizard );
  }

  openEditReceiptCardDialog ( card ): void {
    let wizard           = new EditReceiptCardWizard ();
    wizard.model.card    = _.clone ( card );
    wizard.model.session = this.session;
    this.wizardRunner.run ( wizard );
  }

  protected autoSave ( formValue: any ): Observable<void> {
    formValue.id = this.session.receiptComponent.id;
    return this.receiptComponentService.updateOne ( formValue )
      .pipe (
        tap ( receiptComponent => this.store.dispatch ( new UpdateReceiptComponentAction ( receiptComponent ) ) ),
        mapTo ( null ),
      );
  }

  protected subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE ).subscribe ( {
        next: sessionState => {
          if ( sessionState ) {
            this.session = sessionState.session;
            if ( this.session ) {
              this.dataSource.data = this.session.receiptComponent.cards;
            } else {
              this.dataSource.data = [];
            }
          }
        }
      } )
    );
  }
}
