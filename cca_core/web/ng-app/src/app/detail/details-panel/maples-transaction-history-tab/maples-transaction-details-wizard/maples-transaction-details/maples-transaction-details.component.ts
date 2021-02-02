import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import * as _ from "lodash";
import {CsCoreCodeType} from "@cscore/core-client-model";
import {WizardPage} from "../../../../../core/wizard/wizard-page";
import {Selection} from "../../../../../core/session/model/selection";
import {WizardWidth} from "../../../../../core/wizard/wizard-width.enum";
import {MaplesTransactionDetailsWizard} from "../maples-transaction-details-wizard";
import {convertBooleanToYesNo, filterArrayByKeyValueString} from "../../../../../core/utils/string-utils";
import {MaplesNode, MaplesTransaction} from "@cscore/maples-client-model";

@Component({
  selector: 'cca-maples-transaction-details',
  templateUrl: './maples-transaction-details.component.html',
  styleUrls: ['./maples-transaction-details.component.scss']
})
export class MaplesTransactionDetailsComponent extends WizardPage<MaplesTransactionDetailsWizard> implements OnInit {
  archDetails: any[]    = [];
  details: any[]        = [];
  filterForm: FormGroup;
  key: string           = 'form-page';
  selection: Selection<any>;
  summary: any[]        = [];
  preauthDetails: any[] = [];
  wizardForm: FormGroup = new FormGroup({});

  constructor() {
    super();
    this.isCloseable = true;
    this.width       = WizardWidth.MEDIUM;
    this.filterForm  = new FormGroup({
      filter: new FormControl(null, [])
    });
  }

  ngOnInit() {
    this.subscribeToFilterChanges();
    this.buildSummary();
    this.buildDetails();
    this.buildPreauthDetails();
    this.archDetails = _.cloneDeep(this.details);
  }

  private buildDetails(): void {
    //this.newDetailRow('ANI', this.wizard.model.transaction.identifiers ? this.wizard.model.transaction.identifiers.ani : null);
    //this.newDetailRow('Account', this.wizard.model.transaction.identifiers ? this.wizard.model.transaction.identifiers.accountNumber : null);
    //this.newDetailRow('Acquirer ID', this.wizard.model.nodes.acquirer ? this.wizard.model.nodes.acquirer.financialId : null);
    this.newDetailRow('Addr Ver Postal Code', this.wizard.model.settlement && this.wizard.model.settlement.addressVerification ? this.wizard.model.settlement.addressVerification.postalCode : null);
    this.newDetailRow('Addr Ver Response', this.wizard.model.settlement && this.wizard.model.settlement.addressVerification ? this.wizard.model.settlement.addressVerification.responseDescription + ' ' + this.wizard.model.settlement.addressVerification.responseCode : null);
    this.newDetailRow('Addr Ver Success', this.wizard.model.settlement && this.wizard.model.settlement.addressVerification ? this.wizard.model.settlement.addressVerification.avsIndicator : null);
    this.newDetailRow('APP Code', this.wizard.model.transaction.getCodeByType(CsCoreCodeType.APP_CODE) ? this.wizard.model.transaction.getCodeByType(CsCoreCodeType.APP_CODE).description : null);
    this.newDetailRow('Authentication Type', this.wizard.model.settlement ? this.wizard.model.settlement.authenticationType : null);
    this.newDetailRow('Authorized Amount', this.wizard.model.amounts.authorizedAmount ? this.wizard.model.amounts.authorizedAmount.displayValue : null);
    this.newDetailRow('Available Balance', this.wizard.model.amounts.availableBalance ? this.wizard.model.amounts.availableBalance.displayValue : null);
    this.newDetailRow('Balance', this.wizard.model.amounts.balance ? this.wizard.model.amounts.balance.displayValue : null);
    this.newDetailRow('Billable', this.wizard.model.alerts ? convertBooleanToYesNo(this.wizard.model.alerts.isBillable) : null);
    //this.newDetailRow('CAN', this.wizard.model.transaction.identifiers ? this.wizard.model.transaction.identifiers.can : null);
    //this.newDetailRow('Card Owning FID', this.wizard.model.transaction.identifiers ? this.wizard.model.transaction.identifiers.cardOwningFinancialId : null);
    this.newDetailRow('Cashback Amount', this.wizard.model.amounts && this.wizard.model.amounts.cashbackAmount ? this.wizard.model.amounts.cashbackAmount.displayValue : null);
    this.newDetailRow('Card Member Present', this.wizard.model.transaction.getCodeByType(CsCoreCodeType.CARD_MEMBER_PRESENT) ? this.wizard.model.transaction.getCodeByType(CsCoreCodeType.CARD_MEMBER_PRESENT).description : null);
    //this.newDetailRow('Cashier ID', this.wizard.model.transaction.identifiers ? this.wizard.model.transaction.identifiers.cashierId : null);
    this.newDetailRow('Chargeback Rights Indicator', this.wizard.model.transaction ? this.wizard.model.transaction.chargeBackRightsIndicator : null);
    this.newDetailRow('Comment', this.wizard.model.transaction ? this.wizard.model.transaction.comment : null);
    this.newDetailRow('Completion Count', this.wizard.model.settlement ? this.wizard.model.settlement.completionCount : null);
    this.newDetailRow('Create Date', this.wizard.model.transaction.createDate ? this.wizard.model.transaction.createDate.displayValue : null);
    this.newDetailRow('Credit/Debit', this.wizard.model.amounts ? this.wizard.model.amounts.crdrFlag : null);
    this.newDetailRow('Currency Code', this.wizard.model.transaction.codes[0] ? this.wizard.model.transaction.codes[0].code : null);
    //this.newDetailRow('Customer', this.wizard.model.nodes.customer ? this.wizard.model.nodes.customer.name : null);
    //this.newDetailRow('Delivery Channel', this.wizard.model.transaction.getCodeByType(CsCoreCodeType.DELIVERY_CHANNEL) ? this.wizard.model.transaction.getCodeByType(CsCoreCodeType.DELIVERY_CHANNEL).description : null);
    this.newDetailRow('Description', this.wizard.model.transaction ? this.wizard.model.transaction.description : null);
    this.newDetailRow('Device', this.wizard.model.transaction.device ? this.wizard.model.transaction.device.code : null);
    this.newDetailRow('Digital Product', this.wizard.model.alerts ? convertBooleanToYesNo(this.wizard.model.alerts.isDigitalProduct) : null);
    this.newDetailRow('Disputable', this.wizard.model.alerts ? convertBooleanToYesNo(this.wizard.model.alerts.isDisputable) : null);
    this.newDetailRow('Duration', this.wizard.model.response ? this.wizard.model.response.duration : null);
    this.newDetailRow('Entry Class', this.wizard.model.transaction.getCodeByType(CsCoreCodeType.ENTRY_CLASS) ? this.wizard.model.transaction.getCodeByType(CsCoreCodeType.ENTRY_CLASS).code : null);
    this.newDetailRow('Entry Mode', this.wizard.model.request ? this.wizard.model.request.entryMode : null);
    this.newDetailRow('Expiration Date', this.wizard.model.settlement ? this.wizard.model.settlement.expirationDate : null);
    this.newDetailRow('FX Surcharge Amount', this.wizard.model.amounts ? this.wizard.model.amounts.fxSurchargeAmount : null);
    this.newDetailRow('Fee Amount*', this.wizard.model.feeInfo && this.wizard.model.feeInfo.feeAmount ? this.wizard.model.feeInfo.feeAmount.displayValue : null);
    this.newDetailRow('Fee Description', this.wizard.model.feeInfo &&
    this.wizard.model.feeInfo.feeAmount &&
    this.wizard.model.feeInfo.feeAmount.descriptor ? this.wizard.model.feeInfo.feeAmount.descriptor.description : null);
    this.newDetailRow('Fee ID*', this.wizard.model.feeInfo ? this.wizard.model.feeInfo.feeId : null);
    this.newDetailRow('Fee Plan ID*', this.wizard.model.feeInfo ? this.wizard.model.feeInfo.feePlanId : null);
    //this.newDetailRow('From Account', this.wizard.model.transaction.identifiers ? this.wizard.model.transaction.identifiers.fromAccount : null);
    this.newDetailRow('In Dispute', this.wizard.model.alerts ? convertBooleanToYesNo(this.wizard.model.alerts.inDispute) : null);
    this.newDetailRow('Incremental Indicator', this.wizard.model.settlement ? this.wizard.model.settlement.incrementalIndicator : null);
    this.newDetailRow('Institution', this.wizard.model.transaction ? this.wizard.model.transaction.institution : null);
    this.newDetailRow('Interchange Fee', this.wizard.model.amounts.interchangeFee ? this.wizard.model.amounts.interchangeFee.displayValue : null);
    this.newDetailRow('International', this.wizard.model.response ? convertBooleanToYesNo(this.wizard.model.response.isInternational) : null);
    this.newDetailRow('Last Completion Indicator', this.wizard.model.settlement ? this.wizard.model.settlement.incrementalIndicator : null);
    this.newDetailRow('Location', this.wizard.model.merchant ? this.wizard.model.merchant.name : null);
    this.newDetailRow('MCC Code', this.wizard.model.transaction.getCodeByType(CsCoreCodeType.MCC) ? this.wizard.model.transaction.getCodeByType(CsCoreCodeType.MCC).code : null);
    this.newDetailRow('Manual Notes', this.wizard.model.transaction ? this.wizard.model.transaction.manualNotes : null);
    this.newDetailRow('Manual Reason', this.wizard.model.transaction ? this.wizard.model.transaction.manualReason : null);
    this.newDetailRow('Merchant', this.wizard.model.merchant ? this.wizard.model.merchant.name : null);
    this.newDetailRow('Merchant Floor Limit*', this.wizard.model.amounts ? this.wizard.model.amounts.merchantFloorLimitIndicator : null);
    this.newDetailRow('Merchant ID', this.wizard.model.merchant ? this.wizard.model.merchant.id : null);
    this.newDetailRow('Network Description', this.wizard.model.settlement ? this.wizard.model.settlement.networkDescription : null);
    this.newDetailRow('Network Settlement Date', this.wizard.model.settlement && this.wizard.model.settlement.settlementDate ? this.wizard.model.settlement.settlementDate.displayValue : null);
    //this.newDetailRow('Not on US Mask', this.wizard.model.transaction.identifiers ? this.wizard.model.transaction.identifiers.notOnUsMask : null);
    this.newDetailRow('OP Code', this.wizard.model.transaction.opCode);
    this.newDetailRow('OP Code Flag', this.wizard.model.transaction.opCodeFlag);
    this.newDetailRow('OP Code Text', this.wizard.model.transaction.opCodeText);
    this.newDetailRow('PIN', this.wizard.model.transaction.identifiers ? this.wizard.model.transaction.identifiers.pin : null);
    this.newDetailRow('PIN Transaction', this.wizard.model.transaction.response ? convertBooleanToYesNo(this.wizard.model.transaction.response.isPin) : null);
    this.newDetailRow('POS Entry Mode', this.wizard.model.request ? this.wizard.model.request.posEntryMode : null);
    this.newDetailRow('Partial', this.wizard.model.alerts ? convertBooleanToYesNo(this.wizard.model.alerts.isPartial) : null);
    this.newDetailRow('Partial Auth', this.wizard.model.amounts && this.wizard.model.amounts.partialAuth ? this.wizard.model.amounts.partialAuth.displayValue : null);
    this.newDetailRow('Pending', this.wizard.model.alerts ? convertBooleanToYesNo(this.wizard.model.alerts.isPending) : null);
    this.newDetailRow('Pending Amount', this.wizard.model.amounts.pendingAmount ? this.wizard.model.amounts.pendingAmount.displayValue : null);
    this.newDetailRow('Platform', this.wizard.model.transaction ? this.wizard.model.transaction.platform : null);
    this.newDetailRow('PreAuth Balance', this.wizard.model.amounts ? this.wizard.model.amounts.preAuthBalance : null);
    this.newDetailRow('PreAuth Key', this.wizard.model.settlement ? this.wizard.model.settlement.preAuthKey : null);
    //this.newDetailRow('PreAuth Release Date', this.wizard.model.settlement ? this.wizard.model.settlement.preAuthReleaseDate : null);
    //this.newDetailRow('Receipt Number', this.wizard.model.transaction.identifiers ? this.wizard.model.transaction.identifiers.receiptNumber : null);
    //this.newDetailRow('Region', this.wizard.model.transaction.nodes ? this.wizard.model.transaction.nodes[0].addresses[0].region : null);
    this.newDetailRow('Reject Reason', this.wizard.model.transaction.getCodeByType(CsCoreCodeType.REJECT_REASON) ? this.wizard.model.transaction.getCodeByType(CsCoreCodeType.REJECT_REASON).code : null);
    this.newDetailRow('Request', this.wizard.model.request ? this.wizard.model.request.description : null);
    this.newDetailRow('Request Reason', this.wizard.model.request ? this.wizard.model.request.reason : null);
    this.newDetailRow('Request Type', this.wizard.model.request ? this.wizard.model.request.type : null);
    this.newDetailRow('Request Username', this.wizard.model.request ? this.wizard.model.request.userName : null);
    this.newDetailRow('Requested Amount', this.wizard.model.amounts.requestedAmount ? this.wizard.model.amounts.requestedAmount.displayValue : null);
    this.newDetailRow('Response*', this.wizard.model.transaction.response ? this.wizard.model.transaction.response.description : null);
    this.newDetailRow('Reversal', this.wizard.model.alerts ? convertBooleanToYesNo(this.wizard.model.alerts.isReversalTransaction) : null);
    this.newDetailRow('Reversal Amount', this.wizard.model.amounts ? this.wizard.model.amounts.reversalAmount : null);
    this.newDetailRow('SIC Code', this.wizard.model.transaction.getCodeByType('SIC') ? this.wizard.model.transaction.getCodeByType('SIC').code : null);
    //this.newDetailRow('Serial #', this.wizard.model.transaction.identifiers ? this.wizard.model.transaction.identifiers.serialNumber : null);
    this.newDetailRow('Settlement Date', this.wizard.model.settlement.settlementDate ? this.wizard.model.settlement.settlementDate.displayValue : null);
    this.newDetailRow('Source*', this.wizard.model.transaction.source);
    this.newDetailRow('Submission Indicator*', this.wizard.model.request.submissionIndicator);
    //this.newDetailRow('Terminal ID', this.wizard.model.nodes.terminal ? this.wizard.model.nodes.terminal.id : null);
    //this.newDetailRow('Terminal Postal Code', this.wizard.model.nodes.terminal && this.wizard.model.nodes.terminal.addresses[0] ? this.wizard.model.nodes.terminal.addresses[0].postalCode : null);
    //this.newDetailRow('To Account', this.wizard.model.transaction.identifiers ? this.wizard.model.transaction.identifiers.toAccount : null);
    //this.newDetailRow('Trace Number*', this.wizard.model.transaction.identifiers ? this.wizard.model.transaction.identifiers.traceNumber : null);
    this.newDetailRow('Transaction Date', this.wizard.model.transaction.transactionDate ? this.wizard.model.transaction.transactionDate.displayValue : null);
    this.newDetailRow('User Code', this.wizard.model.request ? this.wizard.model.request.userCode : null);
    this.newDetailRow('Username', this.wizard.model.request ? this.wizard.model.request.userName : null);
    //this.newDetailRow('VAN', this.wizard.model.transaction.identifiers ? this.wizard.model.transaction.identifiers.van : null);
    this.newDetailRow('X95 Code Description', this.wizard.model.settlement.x95CodeDescription);
    this.newDetailRow('X95 Message Code', this.wizard.model.settlement.x95Code);
    this.newDetailRow('X95 Original Type', this.wizard.model.settlement.x95OriginalType);
    this.newDetailRow('X95 Type', this.wizard.model.settlement.x95Type);
  }

  private buildSummary(): void {
    this.newSummaryRow('Date', this.wizard.model.transaction.getDisplayDate());
    this.newSummaryRow('Transaction ID', this.wizard.model.transaction.id);
    this.newSummaryRow('Request	(act)', this.wizard.model.request ? this.wizard.model.request.description : null);
    this.newSummaryRow('Response', this.wizard.model.transaction.response ? this.wizard.model.transaction.response.description : null);
    this.newSummaryRow('Amount', this.wizard.model.amounts.requestedAmount ? this.wizard.model.amounts.requestedAmount.displayValue : null);
    this.newSummaryRow('Card Number', this.wizard.model.transaction.identifiers ? this.wizard.model.transaction.identifiers.cardNumber : null);
    //this.newSummaryRow('Serial Number', this.wizard.model.transaction.identifiers ? this.wizard.model.transaction.identifiers.serialNumber : null);
    this.newSummaryRow('Description', this.wizard.model.transaction ? this.wizard.model.transaction.description : null);
    //this.newSummaryRow('Entity', this.wizard.model.transaction.getPreferredEntityNode() ? this.wizard.model.transaction.getPreferredEntityNode().name : null);
    //this.newSummaryRow('OP Code', this.wizard.model.transaction.opCode ? this.wizard.model.transaction.opCode.code + ' - ' + this.wizard.model.transaction.opCode.description + ' (' + this.wizard.model.transaction.opCode.flag + ')' : null);
    this.newDetailRow('Fee Amount*', this.wizard.model.feeInfo.feeAmount ? this.wizard.model.feeInfo.feeAmount.displayValue : null);
    this.newSummaryRow('Holds', this.wizard.model.amounts.pendingAmount ? this.wizard.model.amounts.pendingAmount.displayValue : null);
    this.newSummaryRow('Balance', this.wizard.model.amounts.balance ? this.wizard.model.amounts.balance.displayValue : null);
    this.newSummaryRow('Available Balance', this.wizard.model.amounts.availableBalance ? this.wizard.model.amounts.availableBalance.displayValue : null);
  }

  private buildPreauthDetails (): void {

    this.newPreauthDetailRow('Available Balance', this.wizard.model.preauthTransaction && this.wizard.model.preauthTransaction.amounts && this.wizard.model.preauthTransaction.amounts.availableBalance ? this.wizard.model.preauthTransaction.amounts.availableBalance.displayValue : null);
    this.newPreauthDetailRow('Authorized Amount', this.wizard.model.preauthTransaction && this.wizard.model.preauthTransaction.amounts && this.wizard.model.preauthTransaction.amounts.authorizedAmount ? this.wizard.model.preauthTransaction.amounts.authorizedAmount.displayValue : null);
    this.newPreauthDetailRow('Business Date', this.wizard.model.preauthTransaction && this.wizard.model.preauthTransaction.businessDate ? this.wizard.model.preauthTransaction.businessDate.displayValue : null);
    this.newPreauthDetailRow('Card Number', this.wizard.model.transaction.identifiers ? this.wizard.model.transaction.identifiers.cardNumber : null);
    this.newPreauthDetailRow('Create Date', this.wizard.model.preauthTransaction && this.wizard.model.preauthTransaction.createDate ? this.wizard.model.preauthTransaction.createDate.displayValue : null);
    this.newPreauthDetailRow('Gns Id', this.wizard.model.preauthTransaction ? this.wizard.model.preauthTransaction.gnsId : null);
    this.newPreauthDetailRow('Local Amount', this.wizard.model.preauthTransaction && this.wizard.model.preauthTransaction.amounts && this.wizard.model.preauthTransaction.amounts.localAmount ? this.wizard.model.preauthTransaction.amounts.localAmount.displayValue : null);
    this.newPreauthDetailRow('Merchant', this.wizard.model.merchant ? this.wizard.model.merchant.name: null);
    this.newPreauthDetailRow('Merchant ID', this.wizard.model.merchant ? this.wizard.model.merchant.id: null);
    this.newPreauthDetailRow('Passthrough Amount', this.wizard.model.preauthTransaction && this.wizard.model.preauthTransaction.amounts && this.wizard.model.preauthTransaction.amounts.passthroughAmount ? this.wizard.model.preauthTransaction.amounts.passthroughAmount.displayValue : null);
    this.newPreauthDetailRow('Pending Amount', this.wizard.model.preauthTransaction && this.wizard.model.preauthTransaction.amounts && this.wizard.model.preauthTransaction.amounts.pendingAmount ? this.wizard.model.preauthTransaction.amounts.pendingAmount.displayValue : null);
    this.newPreauthDetailRow('Requested Amount', this.wizard.model.preauthTransaction && this.wizard.model.preauthTransaction.amounts && this.wizard.model.preauthTransaction.amounts.requestedAmount ? this.wizard.model.preauthTransaction.amounts.requestedAmount.displayValue : null);

    this.newPreauthDetailRow('Status', this.wizard.model.preauthTransaction ? this.wizard.model.preauthTransaction.status : null);
    this.newPreauthDetailRow('Transaction Date', this.wizard.model.preauthTransaction && this.wizard.model.preauthTransaction.transactionDate ? this.wizard.model.preauthTransaction.transactionDate.displayValue : null);

  }


  private newSummaryRow(key: string, value: any) {
    //Only show the row if there is a value
    if (value) {
      this.summary.push({
        key: key,
        value: value
      });
    }
  }

  private newDetailRow(key: string, value: any) {
    this.details.push({
      key: key,
      value: value
    });
  }

  private newPreauthDetailRow(key: string, value: any) {
    this.preauthDetails.push({
      key: key,
      value: value
    });
  }

  private subscribeToFilterChanges(): void {
    this.addSubscription(
      this.filterForm.valueChanges
        .subscribe((value: any) => {
          this.details = filterArrayByKeyValueString(this.archDetails, value.filter);
        })
    );
  }

}


