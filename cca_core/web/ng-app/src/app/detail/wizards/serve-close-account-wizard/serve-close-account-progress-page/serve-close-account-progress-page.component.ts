import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {forkJoin, Observable, of} from 'rxjs';
import {catchError, finalize, flatMap, switchMap} from 'rxjs/operators';
import {ServeCloseAccountWizard} from '../serve-close-account-wizard';
import {PlaceholderDictionary} from '../../../../core/wizard/placeholders/placeholder-dictionary';
import {WizardWidth} from '../../../../core/wizard/wizard-width.enum';
import {WizardPage} from '../../../../core/wizard/wizard-page';
import {AuditActivityType} from '../../../../core/audit/audit-activity-type.enum';
import {AuditService} from '../../../../core/audit/audit.service';
import {IdentifierService} from '../../../../core/identifier/identifier.service';
import {IdentifierRequest} from '../../../../core/session/model/identifier';
import {PlatformType} from '../../../../core/platform/platform-type.enum';
import {IdentifierType} from '../../../../core/session/model/identifier-type.enum';
import {CustomerAccountService} from '../../../../core/customer-account/customer-account.service';

@Component({
  selector: 'cca-serve-close-account-progress-page',
  templateUrl: './serve-close-account-progress-page.component.html'
})
export class ServeCloseAccountProgressPageComponent extends WizardPage<ServeCloseAccountWizard> implements OnInit, AfterViewInit {

  key: string           = 'progress-page';
  wizardForm: FormGroup = new FormGroup({});
  progress: number[] = [];

  constructor(private customerAccountService: CustomerAccountService,
              private auditService: AuditService,
              private identifierService: IdentifierService,
              private changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.title           = 'Close Account';
    this.navigationTitle = 'Progress';
    this.isBackable      = false;
    this.isNextable      = false;
    this.isCloseable     = false;
    this.width           = WizardWidth.MEDIUM;
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  /**
   * After the page is loaded, kick off the close account process.
   */
  ngAfterViewInit(): void {
    this.closeAccounts();
  }

  onNext(): Observable<any> {
    return of('result-page');
  }

  detectChanges(): void {
    if (!this.changeDetectorRef['destroyed']) {
      this.changeDetectorRef.detectChanges();
    }
  }

  /**
   * Close accounts one at a time sub accounts first then primary.  The progress status can be 0 to 3.  0 is not started,
   * 1 is in progress, 2 is error, 3 is success.
   */
  closeAccounts(): void {
    this.wizard.model.success = 0;
    this.progress = new Array(this.wizard.model.accountInfos.length).fill(0);

    // First audit and comment.  If the close request fails, there should still be a record.
    let accountPipe: Observable<any> = of(null).pipe(
      flatMap(() => {
        if (this.wizard.model.success === 0) {
          return forkJoin([
            this.updateAudit(),
            this.comment()
          ]);
        } else {
          return of(null);
        }
      }),
      catchError((error) => {
        this.wizard.model.success = 2;
        return of(error);
      })
    );

    // Add a pipe for each close account request.
    for (let i = this.wizard.model.accountInfos.length - 1; i >= 0; i--) {
      accountPipe = accountPipe.pipe(
        switchMap(
          () => {
            // If on the primary account and there was a sub account failure, don't even attempt.
            if (i === 0 && this.wizard.model.success === 1) {
              this.progress[i] = 2;
              this.detectChanges();
              return of(null);
            } else {
              this.progress[i] = 1;
              this.detectChanges();

              return this.customerAccountService.changeAccountStatus(
                this.wizard.model.accountInfos[i].id,
                {
                  accountStatus: 'CLOSED',
                  statusReason: this.wizard.model.reason
                },
                this.wizard.model.platform);
            }
          }
        ),
        catchError((error) => {
          console.error(error);
          this.wizard.model.success = 1;
          this.progress[i] = 2;
          this.detectChanges();
          return of(error);
        })
      )
      .pipe(
        switchMap(() => {
          // After completion of the request, if there wasn't a failure, mark as success.
          if (this.progress[i] !== 2) {
            this.progress[i] = 3;
          }
          return of(null);
        })
      );
    }

    // Always next to result pape no matter what the outcome.
    accountPipe = accountPipe.pipe(
      finalize(() => {
        this.isNextable = true;
        this.wizardComponent.next();
      })
    );

    // Listen to the entire set of requests.  At the end, this will auto jump to the next page.
    this.addSubscription(accountPipe.subscribe());
  }

  private comment(): Observable<any> {
    let request: IdentifierRequest = {
      identifierType: IdentifierType.ACCOUNT_ID,
      value: this.wizard.model.accountInfos[0].id,
      platform: PlatformType.SERVE,
      comments: [
        {
          content: this.wizard.model.comment
        }
      ]
    };

    return this.identifierService.addOneIdentifierWithComment(request);
  }

  private updateAudit(): Observable<any> {
    return this.auditService.addOne(AuditActivityType.CLOSE_ACCOUNT);
  }
}
