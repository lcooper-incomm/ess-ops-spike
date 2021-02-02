import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {forkJoin, Observable, of} from 'rxjs';
import {catchError, map, mapTo, switchMap, tap} from 'rxjs/operators';
import {PlatformType} from '../platform/platform-type.enum';
import {RequestQueryParam} from '../routing/request-query-param.enum';
import {Selection} from '../session/model/selection';
import {UrlQueryParam} from '../routing/url-query-param.enum';
import {SetDockSelectionsTabSelectionSelectedCustomerAccountCardAction} from '../dock/dock/selections-tab/dock-selections-tab-actions';
import {SessionState} from '../session/session-state';
import {snapshot} from '../store-utils/store-utils';
import {AppStateType} from '../../app-state-type.enum';
import {SelectionType} from '../session/model/selection-type.enum';
import {
  SetSelectionAccountBlockedMerchantsAction, SetSelectionAccountCardHistoryAction,
  SetSelectionAccountDocumentsAction,
  SetSelectionAccountNotificationsAction,
  SetSelectionAccountStatusCodesAccountAction,
  SetSelectionAccountStatusCodesAddressAction, SetSelectionAccountStatusCodesFundingSourceAction,
  SetSelectionCustomerAccountFeaturesAction,
  SetSelectionSelectedCustomerAccountCardAction,
} from '../session/action/session-actions';
import {RoutingService} from '../routing/routing.service';
import {Store} from '@ngrx/store';
import {AppState} from 'src/app/app-state';
import {ServeCardStatus} from '../model/account/serve-card-status.enum';
import {
  MaplesAccount,
  MaplesAccountAdjustBalanceRequest,
  MaplesAccountChangeStatusRequest,
  MaplesAccountCode,
  MaplesAccountCodesQuery,
  MaplesAccountDocument,
  MaplesAccountFeaturesUpdateRequest,
  MaplesAccountNotification,
  MaplesAccountShippingOption,
  MaplesAccountStatusCodeRequest,
  MaplesAccountWithdrawRequest,
  MaplesActionsAdjustBalance,
  MaplesAddDocumentAction,
  MaplesAddMerchantBlockRequest,
  MaplesAlert,
  MaplesCard, MaplesCardHistory,
  MaplesDocumentAction,
  MaplesEmailTemplate,
  MaplesIdResultResponse,
  MaplesPlatform,
  MaplesRelatedAccount,
  MaplesRelatedAccountBalance,
  MaplesReserveAccount,
  MaplesResultMessageResponse,
  MaplesRule,
  MaplesSendNotesRequest,
  MaplesUpdateMerchantBlockRequest,
  UpdateDocumentRequest
} from '@cscore/maples-client-model';
import {EmailAddress} from '../../detail/details-panel/account-holder-tab/account-contact-information/account-contact-information.component';
import {CsCoreAddress, CsCorePhoneNumber} from '@cscore/core-client-model';
import {UpdateSsnRequest} from '../../detail/details-panel/account-holder-tab/serve-identification-information/serve-identification-information.component';
import {MaplesSimpleAccountInfo} from '../session/model/maples-simple-account-info';
import {MaplesAccountBalance} from '@cscore/maples-client-model/account/response/account-balance';
import {SecurityService} from '../security/security.service';
import {GenericOption} from '../model/generic-option';

const build                 = () => map((value: any) => new MaplesAccount(value));
const buildDocuments        = () => map((items: any[]) => items.map(item => new MaplesAccountDocument(item)));
const buildNotifications    = () => map((items: any[]) => items.map(item => new MaplesAccountNotification(item)));
const buildNotification     = () => map((item: any) => new MaplesAccountNotification(item));
const buildActionStatus     = () => map((item: any) => new MaplesResultMessageResponse(item));
const buildBlockedMerchants = () => map((items: any[]) => items.map(item => new MaplesRule(item)));
const buildShippingOptions  = () => map((items: any) => items.map(item => new MaplesAccountShippingOption(item)));

const buildAllCodes = map((values: any[]) => {
  let results: MaplesAccountCode[] = [];
  values.forEach(value => results.push(new MaplesAccountCode(value)));
  return results;
});

@Injectable({
  providedIn: 'root'
})
export class CustomerAccountService {
  private static basePath: string = '/rest/customer-account';

  // Cache account codes once fetched
  accountDocumentCategories: MaplesAccountCode[];
  accountDecisionCodes: MaplesAccountCode[];
  accountStatusCodes: MaplesAccountCode[];
  accountNotesCodes: MaplesAccountCode[];
  accountDisputeReasonCodes: MaplesAccountCode[];
  accountStatusReasonCodes: Map<string, MaplesAccountCode[]> = new Map<string, MaplesAccountCode[]>();

  constructor(
    private http: HttpClient,
    private routingService: RoutingService,
    private store: Store<AppState>,
  ) {
  }

  /**
   * Send request to change an account status, to OPEN, LOCKED, CLOSED.  Returns an ActionAccountStatus response.
   *
   * @param accountId
   * @param request
   * @param platform
   */
  changeAccountStatus(accountId: string, request: MaplesAccountChangeStatusRequest, platform: MaplesPlatform): Observable<MaplesResultMessageResponse> {
    const params: HttpParams = new HttpParams ()
      .set ( RequestQueryParam.PLATFORM, platform );

    return this.http.post ( `${CustomerAccountService.basePath}/${accountId}/status`, request, { params: params } )
      .pipe(
        map((value: any) => new MaplesResultMessageResponse(value))
      );
  }

  adjustAccountBalance ( accountId: string, request: MaplesAccountAdjustBalanceRequest, platform: MaplesPlatform ): Observable<MaplesActionsAdjustBalance> {
    const params: HttpParams = new HttpParams ()
      .set ( RequestQueryParam.PLATFORM, platform );

    return this.http.post ( `${CustomerAccountService.basePath}/${accountId}/balance/adjustment`, request, { params: params } )
      .pipe(
        map( (value: any ) => new MaplesActionsAdjustBalance(value) )
      );
  }

  findAccountDecisionCodes(platform: MaplesPlatform, decisionType: string = 'ACCOUNT'): Observable<MaplesAccountCode[]> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);

    if (this.accountDecisionCodes) {
      return of(this.accountDecisionCodes);
    } else {
      return this.http.post(`${CustomerAccountService.basePath}/codes`, {type: 'DECISION_CODES', decisionType: decisionType, domain: 'RISK'}, {params: params})
        .pipe(buildAllCodes)
        .pipe(
          tap((accountDecisionCodes: MaplesAccountCode[]) => {
            this.accountDecisionCodes = accountDecisionCodes;
          })
        );
    }
  }

  findAccountStatusCodes(platform: MaplesPlatform): Observable<MaplesAccountCode[]> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);

    if (this.accountStatusCodes) {
      return of(this.accountStatusCodes);
    } else {
      return this.http.post(`${CustomerAccountService.basePath}/codes`, {type: 'ACCOUNT_STATUS'}, {params: params})
        .pipe(buildAllCodes)
        .pipe(
          tap((accountStatusCodes: MaplesAccountCode[]) => {
            this.accountStatusCodes = accountStatusCodes;
          })
        );
    }
  }

  findStatusCodesByAccount(accountId, request: MaplesAccountCodesQuery, platform: MaplesPlatform): Observable<MaplesAccountCode[]> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);

    return this.http.post(`${CustomerAccountService.basePath}/${accountId}/codes`, request, {params: params})
      .pipe(buildAllCodes);
  }

  findAccountNotesCodes(platform: MaplesPlatform): Observable<MaplesAccountCode[]> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);

    if (this.accountNotesCodes) {
      return of(this.accountNotesCodes);
    } else {
      return this.http.post(`${CustomerAccountService.basePath}/codes`, {type: 'NOTE_CATEGORIES'}, {params: params})
        .pipe(buildAllCodes)
        .pipe(
          tap((accountNotesCodes: MaplesAccountCode[]) => {
            this.accountNotesCodes = accountNotesCodes;
          })
        );
    }
  }

  findAccountDisputeReasonCodes(platform: MaplesPlatform): Observable<MaplesAccountCode[]> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);

    if (this.accountDisputeReasonCodes) {
      return of(this.accountDisputeReasonCodes);
    } else {
      return this.http.post(`${CustomerAccountService.basePath}/codes`, {type: 'DISPUTE_REASONS'}, {params: params})
        .pipe(buildAllCodes)
        .pipe(
          tap((accountDisputeReasonCodes: MaplesAccountCode[]) => {
            this.accountDisputeReasonCodes = accountDisputeReasonCodes;
          })
        );
    }
  }

  findAccountDisputeReasonOptions(platform: MaplesPlatform): Observable<GenericOption<MaplesAccountCode>[]> {
    return this.findAccountDisputeReasonCodes(platform)
      .pipe(
        switchMap((reasons: MaplesAccountCode[]) => {
          return of(
            reasons.map((reason: MaplesAccountCode) => new GenericOption<MaplesAccountCode>({
                displayValue: reason.description,
              value: reason
            }))
          );
        })
      );
  }

  findAccountStatusReasonById(accountStatusId: string, platform: MaplesPlatform): Observable<MaplesAccountCode[]> {
    if (!accountStatusId) {
      let testCode: MaplesAccountCode = new MaplesAccountCode();
      testCode.code                   = 'Test Account';
      testCode.description            = 'Test Account';
      return of([testCode]);
    }

    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);

    if (this.accountStatusReasonCodes.has(accountStatusId)) {
      return of(this.accountStatusReasonCodes.get(accountStatusId));
    } else {
      return this.http.post(`${CustomerAccountService.basePath}/codes`, {
        type: 'ACCOUNT_STATUS_REASONS',
        accountStatusId: accountStatusId
      }, {params: params})
        .pipe(buildAllCodes)
        .pipe(
          tap((accountStatusCodes: MaplesAccountCode[]) => {
            this.accountStatusReasonCodes.set(accountStatusId, accountStatusCodes);
          })
        );
    }
  }

  findAccountTransactionType(platform: MaplesPlatform): Observable<MaplesAccountCode[]> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);

    return this.http.post(`${CustomerAccountService.basePath}/codes`, {type: 'TRANSACTION_TYPES'}, {params: params})
      .pipe(buildAllCodes);
  }

  findOneById(id: string, platform: PlatformType): Observable<MaplesAccount> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);

    return this.http.get(`${CustomerAccountService.basePath}/${id}`, {params: params})
      .pipe(build());
  }

  findReserveAccounts(id: string, platform: MaplesPlatform): Observable<MaplesReserveAccount[]> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);

    return this.http.get(`${CustomerAccountService.basePath}/${id}/reserve`, {params: params})
      .pipe(
        map((items: any[]) => items.map(item => new MaplesReserveAccount(item)))
      );
  }

  getDocumentActions(accountId: string, documentId: string, platform: MaplesPlatform): Observable<MaplesDocumentAction[]> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);

    return this.http.get(`${CustomerAccountService.basePath}/${accountId}/documents/${documentId}/actions`,
      {params: params})
      .pipe(
        map((items: any[]) => items.map(item => new MaplesDocumentAction(item)))
      );
  }

  addDocumentAction(accountId: string, documentId: string, request: MaplesAddDocumentAction, platform: MaplesPlatform): Observable<MaplesResultMessageResponse> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);

    return this.http.put<MaplesResultMessageResponse>(`${CustomerAccountService.basePath}/${accountId}/documents/${documentId}/add-action`,
      request,
      {params: params});
  }

  updateDocument(accountId: string, documentId: string, request: UpdateDocumentRequest, platform: MaplesPlatform): Observable<MaplesResultMessageResponse> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);

    return this.http.put<MaplesResultMessageResponse>(`${CustomerAccountService.basePath}/${accountId}/documents/${documentId}/update-document`,
      request,
      {params: params});
  }

  getEmailTemplates(accountId: string, platform: MaplesPlatform): Observable<MaplesEmailTemplate[]> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);

    return this.http.get<MaplesEmailTemplate[]>(`${CustomerAccountService.basePath}/${accountId}/email-templates`, {params: params});
  }

  getNotificationPreview(accountId: string, emailTemplate: MaplesEmailTemplate, platform: MaplesPlatform): Observable<MaplesAccountNotification> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);

    return this.http.post<MaplesAccountNotification>(`${CustomerAccountService.basePath}/${accountId}/notifications/preview`, emailTemplate, {params: params});
  }

  sendNotification(accountId: string, emailTemplate: MaplesEmailTemplate, platform: MaplesPlatform): Observable<MaplesIdResultResponse> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);

    return this.http.post<MaplesIdResultResponse>(`${CustomerAccountService.basePath}/${accountId}/notifications/send`, emailTemplate, {params: params});
  }

  sendNote(accountId: string, messageRequest: MaplesSendNotesRequest, platform: MaplesPlatform): Observable<MaplesResultMessageResponse> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);

    return this.http.post<MaplesResultMessageResponse>(`${CustomerAccountService.basePath}/${accountId}/comments`, messageRequest, {params: params});

  }

  findDocuments(accountId: string, platform: PlatformType): Observable<MaplesAccountDocument[]> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);

    return this.http.get(`${CustomerAccountService.basePath}/${accountId}/documents`, {params: params})
      .pipe(buildDocuments());
  }

  findDocument(accountId: string, documentId: string, params: HttpParams = new HttpParams()): Observable<MaplesAccountDocument> {
    return this.http.get<MaplesAccountDocument>(`/rest/customer-account/${accountId}/documents/${documentId}`, {params: params});
  }

  findNotifications(accountId: string, platform: PlatformType): Observable<MaplesAccountNotification[]> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);

    return this.http.get(`${CustomerAccountService.basePath}/${accountId}/notifications`, {params: params})
      .pipe(buildNotifications());
  }

  findNotification(accountId: string, messageId: string, platform: PlatformType): Observable<MaplesAccountNotification> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);

    return this.http.get(`${CustomerAccountService.basePath}/${accountId}/notifications/${messageId}`, {params: params})
      .pipe(buildNotification());
  }

  resendNotification(accountId: string, messageId: string, platform: PlatformType): Observable<MaplesResultMessageResponse> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);

    return this.http.put(`${CustomerAccountService.basePath}/${accountId}/notifications/${messageId}`, null, {params: params})
      .pipe(buildActionStatus());
  }

  addAddress(accountId: string, addressObj: CsCoreAddress, platform: PlatformType): Observable<MaplesResultMessageResponse> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);
    return this.http.post(`${CustomerAccountService.basePath}/${accountId}/address/`, addressObj, {params: params})
      .pipe(buildActionStatus());
  }

  updateAddress(accountId: string, addressObj: CsCoreAddress, platform: PlatformType): Observable<MaplesResultMessageResponse> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);
    return this.http.put(`${CustomerAccountService.basePath}/${accountId}/address/`, addressObj, {params: params})
      .pipe(buildActionStatus());
  }

  addEmail(accountId: string, emailObj: EmailAddress, platform: PlatformType): Observable<MaplesResultMessageResponse> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);
    return this.http.post(`${CustomerAccountService.basePath}/${accountId}/email/`, emailObj, {params: params})
      .pipe(buildActionStatus());
  }

  updateEmail(accountId: string, emailObj: EmailAddress, platform: PlatformType): Observable<MaplesResultMessageResponse> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);
    return this.http.put(`${CustomerAccountService.basePath}/${accountId}/email/`, emailObj, {params: params})
      .pipe(buildActionStatus());
  }

  addPhone(accountId: string, phoneObj: CsCorePhoneNumber, platform: PlatformType): Observable<MaplesResultMessageResponse> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);
    return this.http.post(`${CustomerAccountService.basePath}/${accountId}/phone/`, phoneObj, {params: params})
      .pipe(buildActionStatus());
  }

  updatePhone(accountId: string, phoneObj: CsCorePhoneNumber, platform: PlatformType): Observable<MaplesResultMessageResponse> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);
    return this.http.put(`${CustomerAccountService.basePath}/${accountId}/phone/`, phoneObj, {params: params})
      .pipe(buildActionStatus());
  }

  updateSsn(accountId: string, ssn: UpdateSsnRequest, platform: PlatformType): Observable<MaplesResultMessageResponse> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);
    return this.http.post(`${CustomerAccountService.basePath}/${accountId}/ssn/`, ssn, {params: params})
      .pipe(buildActionStatus());
  }

  addMerchantBlock(accountId: string, request: MaplesAddMerchantBlockRequest, platform: PlatformType): Observable<MaplesResultMessageResponse> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);
    return this.http.post(`${CustomerAccountService.basePath}/${accountId}/merchant/block`, request, {params: params})
      .pipe(buildActionStatus());
  }

  updateMerchantBlock(accountId: string, request: MaplesUpdateMerchantBlockRequest, platform: MaplesPlatform): Observable<null> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);
    return this.http.put(`${CustomerAccountService.basePath}/${accountId}/merchant/block`, request, {params: params})
      .pipe(mapTo(null));
  }

  findBlockedMerchants(accountId: string, platform: PlatformType): Observable<MaplesRule[]> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);

    return this.http.get(`${CustomerAccountService.basePath}/${accountId}/merchant/block`, {params: params})
      .pipe(buildBlockedMerchants());
  }

  loadNotifications(selection: Selection<MaplesAccount>): Observable<void> {
    return this.findNotifications(selection.getCustomerAccount().id, selection.platform)
      .pipe(
        tap(notifications => {
          selection.accountNotifications = notifications;
          this.store.dispatch(new SetSelectionAccountNotificationsAction(selection));
        }),
        mapTo(null),
      );
  }

  loadBLockedMerchants(selection: Selection<MaplesAccount>): Observable<void> {
    return this.findBlockedMerchants(selection.getCustomerAccount().id, selection.platform)
      .pipe(
        catchError(() => of([])),
        tap(merchants => {
          selection.blockedMerchants = merchants;
          this.store.dispatch(new SetSelectionAccountBlockedMerchantsAction(selection));
        }),
        mapTo(null),
      );
  }

  loadStatusCodesAccount(selection: Selection<MaplesAccount>): Observable<void> {
    return this.findStatusCodesByAccount(selection.getCustomerAccount().id,
        <MaplesAccountCodesQuery>{'type': 'DECISION_CODES', 'decisionType': 'ACCOUNT', 'domain': 'RISK'},
        selection.getMaplesPlatform())
      .pipe(
        catchError(() => of([])),
        tap((accountStatusCodesAccount: MaplesAccountCode[]) => {
          selection.accountStatusCodesAccount = accountStatusCodesAccount;
          this.store.dispatch(new SetSelectionAccountStatusCodesAccountAction(selection));
        }),
        mapTo(null),
      );
  }

  loadStatusCodesAddress(selection: Selection<MaplesAccount>): Observable<void> {
    return this.findStatusCodesByAccount(selection.getCustomerAccount().id,
        <MaplesAccountCodesQuery>{'type': 'DECISION_CODES', 'decisionType': 'ADDRESS', 'domain': 'RISK'},
        selection.getMaplesPlatform())
      .pipe(
        catchError(() => of([])),
        tap((accountStatusCodesAddress: MaplesAccountCode[]) => {
          selection.accountStatusCodesAddress = accountStatusCodesAddress;
          this.store.dispatch(new SetSelectionAccountStatusCodesAddressAction(selection));
        }),
        mapTo(null),
      );
  }

  loadStatusCodesFundingSource(selection: Selection<MaplesAccount>): Observable<void> {
    return this.findStatusCodesByAccount(selection.getCustomerAccount().id,
        <MaplesAccountCodesQuery>{'type': 'DECISION_CODES', 'decisionType': 'FUNDINGSOURCE', 'domain': 'RISK'},
        selection.getMaplesPlatform())
      .pipe(
        catchError(() => of([])),
        tap((accountStatusCodesFundingSource: MaplesAccountCode[]) => {
          selection.accountStatusCodesFundingSource = accountStatusCodesFundingSource;
          this.store.dispatch(new SetSelectionAccountStatusCodesFundingSourceAction(selection));
        }),
        mapTo(null),
      );
  }

  loadSecondaryAccountData(selection: Selection<MaplesAccount>): Observable<void> {
    return forkJoin([
      this.loadCardHistory(selection),
      this.loadDocuments(selection),
      this.loadNotifications(selection),
      this.loadBLockedMerchants(selection),
      this.loadStatusCodesAccount(selection),
      this.loadStatusCodesAddress(selection),
      this.loadStatusCodesFundingSource(selection)
    ]).pipe(
      mapTo(null),
    );
  }

  setSelectedCardForSelection(selection: Selection<MaplesAccount>, card: MaplesCard = null): void {
    if (!card) {
      card = this.getSelectedCardForAccount(selection.getCustomerAccount());
    }
    selection.selectedCustomerAccountCard = card;
    this.store.dispatch(new SetSelectionSelectedCustomerAccountCardAction(selection));
    this.store.dispatch(new SetDockSelectionsTabSelectionSelectedCustomerAccountCardAction(selection));

    // Only update the query parameter if this card belongs to the current selection
    const sessionState: SessionState = snapshot(this.store, AppStateType.SESSION_STATE);
    const account                    = sessionState.selection && sessionState.selection.type === SelectionType.CUSTOMER_ACCOUNT && sessionState.selection.getCustomerAccount();
    if (account && account.cards) {
      const isSelectionOwnerOfCard = !!account.cards.find(selectionCard => {
        return selectionCard.identifiers.pan && selectionCard.identifiers.pan === card.identifiers.pan;
      });
      if (isSelectionOwnerOfCard) {
        this.routingService.setQueryParam(UrlQueryParam.DETAILS_LAST_FOUR, card.identifiers.pan.slice(-4));
      }
    }
  }

  archiveDocument(accountId: string, documentId: string, platform: MaplesPlatform): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);

    return this.http.delete(`${CustomerAccountService.basePath}/${accountId}/documents/${documentId}`, {params: params});
  }

  refundAccount(accountId: string, request: MaplesAccountWithdrawRequest, platform: MaplesPlatform): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);

    return this.http.post(`${CustomerAccountService.basePath}/${accountId}/withdraw`, request);
  }

  updateOneAlert(accountId: string, alert: MaplesAlert): Observable<any> {
    return this.http.put(`${CustomerAccountService.basePath}/${accountId}/alerts`, alert);
  }

  toggleFeature(accountId: string, selection: Selection<MaplesAccount>, request: MaplesAccountFeaturesUpdateRequest): Observable<MaplesResultMessageResponse> {
    this.store.dispatch(new SetSelectionCustomerAccountFeaturesAction(selection));
    return this.http.put(`${CustomerAccountService.basePath}/${accountId}/features`, request)
      .pipe(buildActionStatus());
  }

  /**
   * Get simple account info for the primary account, reserve accounts and sub accounts.  This includes the id,
   * status, pending and available balance.
   * By default it fetches balance, if set to true, a full fetch to the sub account details is made to get
   * balance info.  If set to false, it just uses the primary account data to get status off the sub accounts.
   * By default it uses the passed in account to get the data.  If fetch primary is true, it will only use the id
   * of the passed in account and make a new call to re-fetch the account details to get updated information.
   *
   * @param account
   * @param withBalance
   * @param fetchPrimary
   */
  getCombinedAccountInfo(account: MaplesAccount, withBalance: boolean = true, fetchPrimary: boolean = false): Observable<MaplesSimpleAccountInfo[]> {
    let primaryInfos: Observable<MaplesSimpleAccountInfo[]>;

    // Build the primary and reserve info
    if (fetchPrimary) {
      // Make a call to re-fetch the primary account details.
      primaryInfos = this.findOneById(account.id, PlatformType.SERVE)
        .pipe(
          map((accountDetail: MaplesAccount) => {
            let primaryReserveInfos: MaplesSimpleAccountInfo[] = this.buildPrimaryAccountInfo(accountDetail);

            if (!withBalance) {
              let subInfos: MaplesSimpleAccountInfo[] = accountDetail.subAccounts.map(
                (subAccount: MaplesRelatedAccount) => {
                  return this.buildRelatedAccountInfo(subAccount, 'Sub Account');
                }
              );
              return [...primaryReserveInfos, ...subInfos];
            } else {
              return [...primaryReserveInfos];
            }
          })
        );
    } else {
      // Use the passed in account details from the function argument.
      primaryInfos = of(this.buildPrimaryAccountInfo(account));

      if (!withBalance) {
        // If not withBalance then just use the sub account data off the primary details (which includes status
        // but not balance data).
        for (let subAccount of account.subAccounts) {
          primaryInfos = primaryInfos.pipe(
            map((infos: MaplesSimpleAccountInfo[]) => {
              return [...infos, this.buildRelatedAccountInfo(subAccount, 'Sub Account')];
            })
          );
        }
      }
    }

    if (withBalance && account.subAccounts.length > 0) {
      // To get sub account balances, make a call to get those details.
      // The forkJoin will wait for all primary and sub account calls to come back.
      return forkJoin([
        primaryInfos,
        ...account.subAccounts.map((subAccount: MaplesRelatedAccount) => {
          return this.findOneById(subAccount.id, PlatformType.SERVE)
            .pipe(
              map((subAccountDetail: MaplesAccount) => {
                return this.buildAccountInfo(subAccountDetail, 'Sub Account');
              })
            );
        })])
        .pipe(map((merge: any[]) => {
          return [].concat.apply([], merge);
        }));
    } else {
      return primaryInfos;
    }
  }

  /**
   * Builds the primary and reserve account infos.  This is done in one step because reserve info is always part of the
   * primary account details.
   *
   * @param primaryAccount
   */
  buildPrimaryAccountInfo(primaryAccount: MaplesAccount): MaplesSimpleAccountInfo[] {
    let primaryInfo: MaplesSimpleAccountInfo = this.buildAccountInfo(primaryAccount, 'Primary Account');

    return [
      primaryInfo,
      ...primaryAccount.reserveAccounts.map((reserveAccount: MaplesRelatedAccount) => {
        let reserveInfo: MaplesSimpleAccountInfo = this.buildRelatedAccountInfo(reserveAccount, 'Reserve Account');
        if (!reserveInfo.zeroBalance) {
          primaryInfo.zeroBalance = false;
        }
        return reserveInfo;
      })
    ];
  }

  /**
   * Get the id, status and balances for the account.
   *
   * @param account
   * @param type
   */
  private buildAccountInfo(account: MaplesAccount, type: string): MaplesSimpleAccountInfo {
    let accountInfo: MaplesSimpleAccountInfo   = new MaplesSimpleAccountInfo();
    accountInfo.id                             = account.id;
    accountInfo.accountType                    = type;
    accountInfo.status                         = account.getAccountStatus().name;
    let availableBalance: MaplesAccountBalance = this.getCurrentBalance(account, 'AVAILABLE');
    if (availableBalance) {
      accountInfo.availableBalance = availableBalance.amount;
      if (availableBalance.amount.value !== 0) {
        accountInfo.zeroBalance = false;
      }
    }
    let pendingBalance: MaplesAccountBalance = this.getCurrentBalance(account, 'PENDING');
    if (pendingBalance) {
      accountInfo.pendingBalance = pendingBalance.amount;
      if (pendingBalance.amount.value !== 0) {
        accountInfo.zeroBalance = false;
      }
    }
    return accountInfo;
  }

  /**
   * Get the id and balances for the related account.
   *
   * @param account
   * @param type
   */
  private buildRelatedAccountInfo(account: MaplesRelatedAccount, type: string): MaplesSimpleAccountInfo {
    let accountInfo                                   = new MaplesSimpleAccountInfo();
    accountInfo.id                                    = account.id;
    accountInfo.accountType                           = type;
    // accountInfo.status                             = account.status;
    let availableBalance: MaplesRelatedAccountBalance = account.balance.find((mraBalance: MaplesRelatedAccountBalance) => mraBalance.type === 'AVAILABLE');
    if (availableBalance) {
      accountInfo.availableBalance = availableBalance.amount;
      if (availableBalance.amount.value !== 0) {
        accountInfo.zeroBalance = false;
      }
    }
    let pendingBalance: MaplesRelatedAccountBalance = account.balance.find((mraBalance: MaplesRelatedAccountBalance) => mraBalance.type === 'PENDING');
    if (pendingBalance) {
      accountInfo.pendingBalance = pendingBalance.amount;
      if (pendingBalance.amount.value !== 0) {
        accountInfo.zeroBalance = false;
      }
    }
    return accountInfo;
  }

  private getCurrentBalance(account: MaplesAccount, type: string = 'AVAILABLE'): MaplesAccountBalance {
    if (account.getCurrentBalance()) {
      return account.getCurrentBalance().balance.find((balance: MaplesAccountBalance) => balance.type === type);
    } else {
      return undefined;
    }
  }

  private getSelectedCardForAccount(account: MaplesAccount): MaplesCard {
    let card: MaplesCard;

    if (account && account.cards.length) {
      // First, try to find a card matching the last-four query param, if present
      const lastFour = this.routingService.getQueryParam(UrlQueryParam.DETAILS_LAST_FOUR);
      if (lastFour) {
        card = account.cards.find((card: MaplesCard) => {
          const cardLastFour = card.identifiers.pan ? card.identifiers.pan.slice(-4) : null;
          return cardLastFour === lastFour;
        });
      }

      // Then, try to find the active-ish card (the first one that isn't INACTIVE, CLOSED, or EXPIRED)
      if (!card) {
        card = account.cards.find((card: MaplesCard) => {
          const status = card.getPlatformStatus();
          return status && status.name === ServeCardStatus.ACTIVE;
        });
      }

      // Finally, just pick the first available card...
      if (!card) {
        card = account.cards[0];
      }
    }

    return card;
  }

  getCardHistory(accountId: string, platform: MaplesPlatform): Observable<MaplesCardHistory[]> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);

    return this.http.get<MaplesCardHistory[]>(`/rest/card/history/${accountId}`, {params: params})
      .pipe(
        catchError(() => of([]))
      );
  }

  private loadCardHistory(selection: Selection<MaplesAccount>): Observable<void> {
    if (!selection.getCustomerAccount()) {
      return of(null);
    }

    return this.getCardHistory(selection.getCustomerAccount().id, selection.getMaplesPlatform())
      .pipe(
        tap((cardHistory: MaplesCardHistory[]) => {
          selection.cardHistory = cardHistory;
          this.store.dispatch(new SetSelectionAccountCardHistoryAction(selection));
        }),
        mapTo(null)
      );
  }

  private loadDocuments(selection: Selection<MaplesAccount>): Observable<void> {
    if (!selection.getCustomerAccount()) {
      return of(null);
    }

    return this.findDocuments(selection.getCustomerAccount().id, selection.platform)
      .pipe(
        tap(documents => {
          selection.accountDocuments = documents;
          this.store.dispatch(new SetSelectionAccountDocumentsAction(selection));
        }),
        mapTo(null)
      );
  }

  findAccountDocumentCategories(platform: MaplesPlatform): Observable<MaplesAccountCode[]> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);

    if (this.accountDocumentCategories) {
      return of(this.accountDocumentCategories);
    } else {
      return this.http.post('/rest/account/codes', {type: 'DOCUMENT_CATEGORIES'}, {params: params})
        .pipe(buildAllCodes)
        .pipe(
          tap((accountDocumentCategories: MaplesAccountCode[]) => {
            this.accountDocumentCategories = accountDocumentCategories;
          })
        );
    }
  }

  findShippingOptions(accountId: string, platform: PlatformType): Observable<MaplesAccountShippingOption[]> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);

    return this.http.get(`${CustomerAccountService.basePath}/${accountId}/shipping/`, {params: params})
      .pipe(buildShippingOptions());
  }

  addStatusCode(accountId: string, request: MaplesAccountStatusCodeRequest, platform: MaplesPlatform): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);

    return this.http.post(`${CustomerAccountService.basePath}/${accountId}/codes/add`, request, {params: params});
  }

  updateStatusCode(accountId: string, request: MaplesAccountStatusCodeRequest, platform: MaplesPlatform): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);

    return this.http.put(`${CustomerAccountService.basePath}/${accountId}/codes/update`, request, {params: params});
  }

  deleteStatusCode(accountId: string, request: MaplesAccountStatusCodeRequest, platform: MaplesPlatform): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);

    return this.http.post(`${CustomerAccountService.basePath}/${accountId}/codes/delete`, request, {params: params});
  }
}
