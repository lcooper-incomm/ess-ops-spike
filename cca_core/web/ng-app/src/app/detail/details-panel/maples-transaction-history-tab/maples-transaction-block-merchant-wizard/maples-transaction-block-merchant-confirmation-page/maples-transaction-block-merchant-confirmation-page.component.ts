import { Component } from '@angular/core';
import {WizardWidth} from "../../../../../core/wizard/wizard-width.enum";
import {FormGroup} from "@angular/forms";
import {WizardPage} from "../../../../../core/wizard/wizard-page";
import {MaplesTransactionBlockMerchantWizard} from "../maples-transaction-block-merchant-wizard";
import {forkJoin, Observable, of} from "rxjs";
import {catchError, map, mapTo, switchMap, tap} from "rxjs/operators";
import {MaplesTransactionService} from "../../../../../core/transaction/maples-transaction.service";
import {CustomerAccountService} from "../../../../../core/customer-account/customer-account.service";
import {MaplesAddMerchantBlockRequest, MaplesTransaction} from "@cscore/maples-client-model";
import {SetSelectionMaplesTransactionsAction} from "../../../../../core/session/action/session-actions";
import {AppState} from "../../../../../app-state";
import {Store} from "@ngrx/store";
import {HttpErrorResponse} from "@angular/common/http";
import {AuditService} from "../../../../../core/audit/audit.service";
import {IdentifierRequest} from "../../../../../core/session/model/identifier";
import {PlatformType} from "../../../../../core/platform/platform-type.enum";
import {IdentifierService} from "../../../../../core/identifier/identifier.service";
import {PlaceholderDictionary} from "../../../../../core/wizard/placeholders/placeholder-dictionary";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'cca-maples-transaction-block-merchant-confirmation-page',
  templateUrl: './maples-transaction-block-merchant-confirmation-page.component.html',
  styleUrls: ['./maples-transaction-block-merchant-confirmation-page.component.scss']
})
export class MaplesTransactionBlockMerchantConfirmationPageComponent extends WizardPage<MaplesTransactionBlockMerchantWizard> {
  key: string             = 'confirmation-page';
  wizardForm: FormGroup   = new FormGroup ( {} );
  isBackable: boolean     = true;
  isCloseable: boolean    = true;
  isNextable: boolean     = true;
  backButtonText: string  = 'No';
  closeButtonText: string = 'Cancel';
  nextButtonText: string  = 'Yes';
  width: WizardWidth      = WizardWidth.MEDIUM;

  constructor(private customerAccountService: CustomerAccountService,
              private transactionService: MaplesTransactionService,
              private auditService: AuditService,
              private identifierService: IdentifierService,
              private store: Store<AppState>) {
    super();
    this.title = 'Block Merchant';
    this.footer = 'Are you sure you want to perform this action?';
  }

  onNext (): Observable<any> {
    return this.customerAccountService
      .addMerchantBlock(this.wizard.model.selection.getCustomerAccount().id, this.buildRequest(), this.wizard.model.selection.platform)
      .pipe(
        switchMap( (value:any) => {
          return forkJoin([
            this.updateAudit().pipe(catchError(error => of(error))),
            this.updateIdentifier().pipe(catchError(error => of(error))),
            this.refreshTransactions()
          ]).pipe(map((response: [any, any, any]) => {
            this.wizard.model.success = 0;
            if(response[0] instanceof HttpErrorResponse || response[1] instanceof  HttpErrorResponse) {
              this.wizard.model.success = 2;
            }
          }))
        }),
        catchError(() => {
          this.wizard.model.success = 1;
          return of (null);
        }),
    mapTo ( 'result-page' )
      )
  }

  private buildRequest (): MaplesAddMerchantBlockRequest {
    let id = this.wizard.model.merchant? this.wizard.model.merchant.id : null;
    let name = this.wizard.model.merchant ? this.wizard.model.merchant.name : null;
    return {
      type: "PURCHASE",
      frequency: "PERMANENT",
      merchantId:  id,
      merchantName: name,
      accountId: this.wizard.model.selection.getCustomerAccount().id
    }
  }

  private updateAudit(): Observable<any> {
    return this.auditService.addOne(this.wizard.model.auditActivityType);
  }

  private updateIdentifier(): Observable<any> {
    let request: IdentifierRequest = {
      identifierType: this.wizard.model.identifierType,
      value: this.wizard.model.identifier,
      platform: PlatformType.SERVE,
      comments: [
        {
          content: this.wizard.model.comment
        }
      ]
    };

    return this.identifierService.addOneIdentifierWithComment(request);
  }

  private refreshTransactions (): Observable<any> {
    const selection = this.wizard.model.selection;
    return this.transactionService
      .searchForSelection ( selection )
      .pipe (
        tap ( ( response: MaplesTransaction[] ) => {
          selection.maplesTransactions = response;
          this.store.dispatch(new SetSelectionMaplesTransactionsAction(selection));
        } ),
        catchError ( () => of ( null ) ),
      );
    return of(null);
  }

  applyCodexResponse ( codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer ): void {}

}
