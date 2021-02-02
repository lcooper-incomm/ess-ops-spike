import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../core/wizard/wizard-page";
import { Selection } from "../../../../../core/session/model/selection";
import { FormControl, FormGroup } from "@angular/forms";
import { WizardWidth } from "../../../../../core/wizard/wizard-width.enum";
import { FullTransactionHistoryDetailsWizard } from "../full-transaction-history-details-wizard";
import * as _ from "lodash";
import { CsCoreCodeType } from "@cscore/core-client-model";
import { convertBooleanToYesNo, filterArrayByKeyValueString } from "../../../../../core/utils/string-utils";

@Component ( {
  selector: 'cca-full-transaction-history-details',
  templateUrl: './full-transaction-history-details.component.html',
  styleUrls: [ './full-transaction-history-details.component.scss' ]
} )
export class FullTransactionHistoryDetailsComponent extends WizardPage<FullTransactionHistoryDetailsWizard> implements OnInit {
  archDetails: any[]    = [];
  details: any[]        = [];
  filterForm: FormGroup;
  key: string           = 'form-page';
  selection: Selection<any>;
  summary: any[]        = [];
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor () {
    super ();
    this.isCloseable = true;
    this.width       = WizardWidth.MEDIUM;
    this.filterForm  = new FormGroup ( {
      filter: new FormControl ( null, [] )
    } );
  }

  ngOnInit () {
    this.subscribeToFilterChanges ();
    this.buildSummary ();
    this.buildDetails ();
    this.archDetails = _.cloneDeep ( this.details );
  }

  private buildDetails (): void {
    this.newDetailRow ( 'ANI', this.wizard.model.transaction.identifiers ? this.wizard.model.transaction.identifiers.ani : null );
    this.newDetailRow ( 'Account', this.wizard.model.transaction.identifiers ? this.wizard.model.transaction.identifiers.accountNumber : null );
    this.newDetailRow ( 'Acquirer ID', this.wizard.model.transaction.nodes.acquirer ? this.wizard.model.transaction.nodes.acquirer.financialId : null );
    this.newDetailRow ( 'Addr Ver Postal Code', this.wizard.model.transaction.settlement && this.wizard.model.transaction.settlement.addressVerification ? this.wizard.model.transaction.settlement.addressVerification.postalCode : null );
    this.newDetailRow ( 'Addr Ver Response', this.wizard.model.transaction.settlement && this.wizard.model.transaction.settlement.addressVerification ? this.wizard.model.transaction.settlement.addressVerification.responseDescription + ' ' + this.wizard.model.transaction.settlement.addressVerification.responseCode : null );
    this.newDetailRow ( 'Addr Ver Success', this.wizard.model.transaction.settlement && this.wizard.model.transaction.settlement.addressVerification ? this.wizard.model.transaction.settlement.addressVerification.avsIndicator : null );
    this.newDetailRow ( 'Authentication Type', this.wizard.model.transaction.settlement ? this.wizard.model.transaction.settlement.authenticationType : null );
    this.newDetailRow ( 'Authorized Amount', this.wizard.model.transaction.amounts.authorizedAmount ? this.wizard.model.transaction.amounts.authorizedAmount.displayValue : null );
    this.newDetailRow ( 'Available Balance', this.wizard.model.transaction.amounts.availableBalance ? this.wizard.model.transaction.amounts.availableBalance.displayValue : null );
    this.newDetailRow ( 'Balance', this.wizard.model.transaction.amounts.balance ? this.wizard.model.transaction.amounts.balance.displayValue : null );
    this.newDetailRow ( 'Billable', this.wizard.model.transaction.flags ? convertBooleanToYesNo ( this.wizard.model.transaction.flags.isBillable ) : null );
    this.newDetailRow ( 'CAN', this.wizard.model.transaction.identifiers ? this.wizard.model.transaction.identifiers.can : null );
    this.newDetailRow ( 'Card Owning FID', this.wizard.model.transaction.identifiers ? this.wizard.model.transaction.identifiers.cardOwningFinancialId : null );
    this.newDetailRow ( 'Cashback Amount', this.wizard.model.transaction.amounts ? this.wizard.model.transaction.amounts.cashbackAmount : null );
    this.newDetailRow ( 'Cashier ID', this.wizard.model.transaction.identifiers ? this.wizard.model.transaction.identifiers.cashierId : null );
    this.newDetailRow ( 'Chargeback Rights Indicator', this.wizard.model.transaction ? this.wizard.model.transaction.chargeBackRightsIndicator : null );
    this.newDetailRow ( 'Comment', this.wizard.model.transaction ? this.wizard.model.transaction.comment : null );
    this.newDetailRow ( 'Completion Count', this.wizard.model.transaction.settlement ? this.wizard.model.transaction.settlement.completionCount : null );
    this.newDetailRow ( 'Create Date', this.wizard.model.transaction.createDate ? this.wizard.model.transaction.createDate.displayValue : null );
    this.newDetailRow ( 'Credit/Debit', this.wizard.model.transaction.amounts ? this.wizard.model.transaction.amounts.crdrFlag : null );
    this.newDetailRow ( 'Currency Code', this.wizard.model.transaction.codes[ 0 ] ? this.wizard.model.transaction.codes[ 0 ].code : null );
    this.newDetailRow ( 'Customer', this.wizard.model.transaction.nodes.customer ? this.wizard.model.transaction.nodes.customer.name : null );
    this.newDetailRow ( 'Delivery Channel', this.wizard.model.transaction.getCodeByType ( CsCoreCodeType.DELIVERY_CHANNEL ) ? this.wizard.model.transaction.getCodeByType ( CsCoreCodeType.DELIVERY_CHANNEL ).description : null );
    this.newDetailRow ( 'Description', this.wizard.model.transaction ? this.wizard.model.transaction.description : null );
    this.newDetailRow ( 'Device', this.wizard.model.transaction.device ? this.wizard.model.transaction.device.type : null );
    this.newDetailRow ( 'Digital Product', this.wizard.model.transaction.flags ? convertBooleanToYesNo ( this.wizard.model.transaction.flags.isDigitalProduct ) : null );
    this.newDetailRow ( 'Disputable', this.wizard.model.transaction.flags ? convertBooleanToYesNo ( this.wizard.model.transaction.flags.isDisputable ) : null );
    this.newDetailRow ( 'Duration', this.wizard.model.transaction.response ? this.wizard.model.transaction.response.duration : null );
    this.newDetailRow ( 'Entry Mode', this.wizard.model.transaction.request ? this.wizard.model.transaction.request.entryMode : null );
    this.newDetailRow ( 'Expiration Date', this.wizard.model.transaction.settlement ? this.wizard.model.transaction.settlement.expirationDate : null );
    this.newDetailRow ( 'FX Surcharge Amount', this.wizard.model.transaction.amounts ? this.wizard.model.transaction.amounts.fxSurchargeAmount : null );
    this.newDetailRow ( 'Fee Amount*', this.wizard.model.transaction.fee && this.wizard.model.transaction.fee.amount ? this.wizard.model.transaction.fee.amount.displayValue : null );
    this.newDetailRow ( 'Fee Description', this.wizard.model.transaction.fee &&
    this.wizard.model.transaction.fee.amount &&
    this.wizard.model.transaction.fee.amount.descriptor ? this.wizard.model.transaction.fee.amount.descriptor.description : null );
    this.newDetailRow ( 'Fee ID*', this.wizard.model.transaction.fee ? this.wizard.model.transaction.fee.id : null );
    this.newDetailRow ( 'Fee Plan ID*', this.wizard.model.transaction.fee ? this.wizard.model.transaction.fee.feePlanId : null );
    this.newDetailRow ( 'From Account', this.wizard.model.transaction.identifiers ? this.wizard.model.transaction.identifiers.fromAccount : null );
    this.newDetailRow ( 'In Dispute', this.wizard.model.transaction.flags ? convertBooleanToYesNo ( this.wizard.model.transaction.flags.isInDispute ) : null );
    this.newDetailRow ( 'Incremental Indicator', this.wizard.model.transaction.settlement ? this.wizard.model.transaction.settlement.incrementalIndicator : null );
    this.newDetailRow ( 'Institution', this.wizard.model.transaction ? this.wizard.model.transaction.institution : null );
    this.newDetailRow ( 'Interchange Fee', this.wizard.model.transaction.amounts.interchangeFee ? this.wizard.model.transaction.amounts.interchangeFee.displayValue : null );
    this.newDetailRow ( 'International', this.wizard.model.transaction.response ? convertBooleanToYesNo ( this.wizard.model.transaction.response.isInternational ) : null );
    this.newDetailRow ( 'Last Completion Indicator', this.wizard.model.transaction.settlement ? this.wizard.model.transaction.settlement.incrementalIndicator : null );
    this.newDetailRow ( 'Location', this.wizard.model.transaction.nodes.merchant ? this.wizard.model.transaction.nodes.merchant.name : null );
    this.newDetailRow ( 'MCC Code', this.wizard.model.transaction.getCodeByType ( CsCoreCodeType.MCC ) ? this.wizard.model.transaction.getCodeByType ( CsCoreCodeType.MCC ).description : null );
    this.newDetailRow ( 'Manual Notes', this.wizard.model.transaction ? this.wizard.model.transaction.manualNotes : null );
    this.newDetailRow ( 'Manual Reason', this.wizard.model.transaction ? this.wizard.model.transaction.manualReason : null );
    this.newDetailRow ( 'Merchant', this.wizard.model.transaction.nodes.merchant ? this.wizard.model.transaction.nodes.merchant.name : null );
    this.newDetailRow ( 'Merchant Floor Limit*', this.wizard.model.transaction.amounts ? this.wizard.model.transaction.amounts.merchantFloorLimitIndicator : null );
    this.newDetailRow ( 'Merchant ID', this.wizard.model.transaction.identifiers ? this.wizard.model.transaction.identifiers.merchantId : null );
    this.newDetailRow ( 'Network Description', this.wizard.model.transaction.settlement ? this.wizard.model.transaction.settlement.networkDescription : null );
    this.newDetailRow ( 'Network Settlement Date', this.wizard.model.transaction.settlement && this.wizard.model.transaction.settlement.settlementDate ? this.wizard.model.transaction.settlement.settlementDate.displayValue : null );
    this.newDetailRow ( 'Not on US Mask', this.wizard.model.transaction.identifiers ? this.wizard.model.transaction.identifiers.notOnUsMask : null );
    this.newDetailRow ( 'OP Code', this.wizard.model.transaction.opCode ? this.wizard.model.transaction.opCode.code : null );
    this.newDetailRow ( 'OP Code Flag', this.wizard.model.transaction.opCode ? this.wizard.model.transaction.opCode.code : null );
    this.newDetailRow ( 'OP Code Text', this.wizard.model.transaction.opCode ? this.wizard.model.transaction.opCode.descriptor : null );
    this.newDetailRow ( 'PIN', this.wizard.model.transaction.identifiers ? this.wizard.model.transaction.identifiers.pin : null );
    this.newDetailRow ( 'PIN Transaction', this.wizard.model.transaction.response ? convertBooleanToYesNo ( this.wizard.model.transaction.response.isPin ) : null );
    this.newDetailRow ( 'POS Entry Mode', this.wizard.model.transaction.request ? this.wizard.model.transaction.request.posEntryMode : null );
    this.newDetailRow ( 'Partial', this.wizard.model.transaction.flags ? convertBooleanToYesNo ( this.wizard.model.transaction.flags.isPartial ) : null );
    this.newDetailRow ( 'Pending', this.wizard.model.transaction.flags ? convertBooleanToYesNo ( this.wizard.model.transaction.flags.isPending ) : null );
    this.newDetailRow ( 'Pending Amount', this.wizard.model.transaction.amounts.pendingAmount ? this.wizard.model.transaction.amounts.pendingAmount.displayValue : null );
    this.newDetailRow ( 'Platform', this.wizard.model.transaction ? this.wizard.model.transaction.platform : null );
    this.newDetailRow ( 'PreAuth Balance', this.wizard.model.transaction.amounts ? this.wizard.model.transaction.amounts.preAuthBalance : null );
    this.newDetailRow ( 'PreAuth Key', this.wizard.model.transaction.settlement ? this.wizard.model.transaction.settlement.preAuthKey : null );
    this.newDetailRow ( 'PreAuth Release Date', this.wizard.model.transaction.settlement ? this.wizard.model.transaction.settlement.preAuthReleaseDate : null );
    this.newDetailRow ( 'Receipt Number', this.wizard.model.transaction.identifiers ? this.wizard.model.transaction.identifiers.receiptNumber : null );
    this.newDetailRow ( 'Request', this.wizard.model.transaction.request ? this.wizard.model.transaction.request.description : null );
    this.newDetailRow ( 'Request Reason', this.wizard.model.transaction.request ? this.wizard.model.transaction.request.reason : null );
    this.newDetailRow ( 'Request Type', this.wizard.model.transaction.request ? this.wizard.model.transaction.request.type : null );
    this.newDetailRow ( 'Request Username', this.wizard.model.transaction.request ? this.wizard.model.transaction.request.userName : null );
    this.newDetailRow ( 'Requested Amount', this.wizard.model.transaction.amounts.requestedAmount ? this.wizard.model.transaction.amounts.requestedAmount.displayValue : null );
    this.newDetailRow ( 'Response*', this.wizard.model.transaction.response ? this.wizard.model.transaction.response.description : null );
    this.newDetailRow ( 'Reversal', this.wizard.model.transaction.flags ? convertBooleanToYesNo ( this.wizard.model.transaction.flags.isReversalTransaction ) : null );
    this.newDetailRow ( 'Reversal Amount', this.wizard.model.transaction.amounts ? this.wizard.model.transaction.amounts.reversalAmount : null );
    this.newDetailRow ( 'SIC Code*', this.wizard.model.transaction.settlement && this.wizard.model.transaction.settlement.sic ? this.wizard.model.transaction.settlement.sic.code : null );
    this.newDetailRow ( 'SIC Code Description*', this.wizard.model.transaction.settlement && this.wizard.model.transaction.settlement.sic ? this.wizard.model.transaction.settlement.sic.description : null );
    this.newDetailRow ( 'Serial #', this.wizard.model.transaction.identifiers ? this.wizard.model.transaction.identifiers.serialNumber : null );
    this.newDetailRow ( 'Settlement Date', this.wizard.model.transaction.settlement && this.wizard.model.transaction.settlement.settlementDate ? this.wizard.model.transaction.settlement.settlementDate.displayValue : null );
    this.newDetailRow ( 'Source*', this.wizard.model.transaction ? this.wizard.model.transaction.source : null );
    this.newDetailRow ( 'Submission Indicator*', this.wizard.model.transaction.request ? this.wizard.model.transaction.request.submissionIndicator : null );
    this.newDetailRow ( 'Terminal ID', this.wizard.model.transaction.nodes.terminal ? this.wizard.model.transaction.nodes.terminal.id : null );
    this.newDetailRow ( 'Terminal Postal Code', this.wizard.model.transaction.nodes.terminal && this.wizard.model.transaction.nodes.terminal.addresses[ 0 ] ? this.wizard.model.transaction.nodes.terminal.addresses[ 0 ].postalCode : null );
    this.newDetailRow ( 'To Account', this.wizard.model.transaction.identifiers ? this.wizard.model.transaction.identifiers.toAccount : null );
    this.newDetailRow ( 'Trace Number*', this.wizard.model.transaction.identifiers ? this.wizard.model.transaction.identifiers.traceNumber : null );
    this.newDetailRow ( 'Transaction Date', this.wizard.model.transaction.transactionDate ? this.wizard.model.transaction.transactionDate.displayValue : null );
    this.newDetailRow ( 'User Code', this.wizard.model.transaction.request ? this.wizard.model.transaction.request.userCode : null );
    this.newDetailRow ( 'Username', this.wizard.model.transaction.request ? this.wizard.model.transaction.request.userName : null );
    this.newDetailRow ( 'VAN', this.wizard.model.transaction.identifiers ? this.wizard.model.transaction.identifiers.van : null );
    this.newDetailRow ( 'X95 Code Description', this.wizard.model.transaction.settlement && this.wizard.model.transaction.settlement.x95 ? this.wizard.model.transaction.settlement.x95.description : null );
    this.newDetailRow ( 'X95 Message Code', this.wizard.model.transaction.settlement && this.wizard.model.transaction.settlement.x95 ? this.wizard.model.transaction.settlement.x95.code : null );
    this.newDetailRow ( 'X95 Original Type', this.wizard.model.transaction.settlement && this.wizard.model.transaction.settlement.x95 ? this.wizard.model.transaction.settlement.x95.originalType : null );
    this.newDetailRow ( 'X95 Type', this.wizard.model.transaction.settlement && this.wizard.model.transaction.settlement.x95 ? this.wizard.model.transaction.settlement.x95.type : null );
  }

  private buildSummary (): void {
    this.newSummaryRow ( 'Date', this.wizard.model.transaction.createDate ? this.wizard.model.transaction.createDate.displayValue : null );
    this.newSummaryRow ( 'Transaction ID', this.wizard.model.transaction ? this.wizard.model.transaction.id : null );
    this.newSummaryRow ( 'Request	(act)', this.wizard.model.transaction.request ? this.wizard.model.transaction.request.description : null );
    this.newSummaryRow ( 'Response', this.wizard.model.transaction.response ? this.wizard.model.transaction.response.description : null );
    this.newSummaryRow ( 'Amount', this.wizard.model.transaction.amounts.requestedAmount ? this.wizard.model.transaction.amounts.requestedAmount.displayValue : null );
    this.newSummaryRow ( 'Card Number', this.wizard.model.transaction.identifiers ? this.wizard.model.transaction.identifiers.pan : null );
    this.newSummaryRow ( 'Serial Number', this.wizard.model.transaction.identifiers ? this.wizard.model.transaction.identifiers.serialNumber : null );
    this.newSummaryRow ( 'Description', this.wizard.model.transaction ? this.wizard.model.transaction.description : null );
    this.newSummaryRow ( 'Entity', this.wizard.model.transaction.getPreferredEntityNode () ? this.wizard.model.transaction.getPreferredEntityNode ().name : null );
    this.newSummaryRow ( 'OP Code', this.wizard.model.transaction.opCode ? this.wizard.model.transaction.opCode.code + ' - ' + this.wizard.model.transaction.opCode.description + ' (' + this.wizard.model.transaction.opCode.flag + ')' : null );
    this.newDetailRow ( 'Fee Amount*', this.wizard.model.transaction.fee ? this.wizard.model.transaction.fee.amount.displayValue : null );
    this.newSummaryRow ( 'Holds', this.wizard.model.transaction.amounts.pendingAmount ? this.wizard.model.transaction.amounts.pendingAmount.displayValue : null );
    this.newSummaryRow ( 'Balance', this.wizard.model.transaction.amounts.balance ? this.wizard.model.transaction.amounts.balance.displayValue : null );
    this.newSummaryRow ( 'Available Balance', this.wizard.model.transaction.amounts.availableBalance ? this.wizard.model.transaction.amounts.availableBalance.displayValue : null );
  }

  private newSummaryRow ( key: string, value: any ) {
    //Only show the row if there is a value
    if ( value ) {
      this.summary.push ( {
        key: key,
        value: value
      } );
    }
  }

  private newDetailRow ( key: string, value: any ) {
    this.details.push ( {
      key: key,
      value: value
    } );
  }

  private subscribeToFilterChanges (): void {
    this.addSubscription (
      this.filterForm.valueChanges
        .subscribe ( ( value: any ) => {
          this.details = filterArrayByKeyValueString ( this.archDetails, value.filter );
        } )
    );
  }

}


