import {Component, EventEmitter, Input, Output, ViewChild, SimpleChanges} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {SpinnerComponent} from '../../../spinner/spinner.component';
import {Comment} from '../../../model/comment';
import {CommentRequest} from '../../../model/comment-request';
import {CommentService} from '../../../comment/comment.service';
import {Observable, of} from 'rxjs';
import {finalize, switchMap} from 'rxjs/operators';
import {SecurityService} from '../../../security/security.service';
import {SessionStatusType} from '../../model/session-status-type.enum';
import {Permission} from '../../../auth/permission';
import {SessionClassType} from '../../session-class-type.enum';
import {Session} from '../../model/session';
import {WizardRunner} from '../../../wizard/wizard-runner/wizard-runner.service';
import {ViewCommentsWizard} from './view-comments/view-comments-wizard';
import {AutoSavingForm} from 'src/app/core/form/auto-saving-form';
import {AccountService} from '../../../account/account.service';
import {CustomerAccountService} from '../../../customer-account/customer-account.service';
import {PlatformType} from '../../../platform/platform-type.enum';
import {Identifier} from '../../model/identifier';
import {
  MaplesAccount,
  MaplesAccountCode,
  MaplesPlatform,
  MaplesResultMessageResponse,
  MaplesSendNotesRequest
} from '@cscore/maples-client-model';
import {Selection} from '../../model/selection';
import {IdentifierType} from '../../model/identifier-type.enum';
import {AppendSelectionCommentAction} from '../../action/session-actions';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../app-state';

@Component({
  selector: 'cca-session-comments',
  templateUrl: './session-comments.component.html',
  styleUrls: ['./session-comments.component.scss']
})
export class SessionCommentsComponent extends AutoSavingForm {

  @Input()
  form: FormGroup;
  @Input()
  session: Session;

  @Output()
  commentAdded: EventEmitter<Comment>         = new EventEmitter();
  @Output()
  commentChange: EventEmitter<CommentRequest> = new EventEmitter();

  @ViewChild('addCommentSpinner')
  addCommentSpinner: SpinnerComponent;

  isPrivateCommentEnabled: boolean = false;

  constructor(
    private commentService: CommentService,
    private securityService: SecurityService,
    private wizardRunner: WizardRunner,
    private accountService: AccountService,
    private store: Store<AppState>,
    private customerAccountService: CustomerAccountService
  ) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (this.session && this.session.isInClosedStatus() && this.form && this.form.get('comment')) {
      this.form.get('comment').disable({emitEvent: false});
    }
    this.setIsPrivateCommentEnabled();
  }

  get comments(): Comment[] {
    return this.session && this.session.comments || [];
  }

  isAddButtonEnabled(): boolean {
    return this.form.valid && this.form.get('comment').value;
  }

  openCommentsDialog(selectedComment: Comment = null): void {
    const wizard                 = new ViewCommentsWizard();
    wizard.model.comments        = this.comments;
    wizard.model.selectedComment = selectedComment;
    this.wizardRunner.run(wizard);
  }

  saveComment(): void {
    this.addCommentSpinner.start();
    const formValue = this.form.value;

    const comment: CommentRequest = {
      isPrivate: formValue.isPrivate,
      content: formValue.comment
    };


    const sessionId = this.session.id;

    this.addSubscription(
      this.commentService.addOne(sessionId, comment)
        .pipe(finalize(() => {
          this.addCommentSpinner.stop();
          this.form.get('comment').reset('');
        }))
        .subscribe(comment => {
          this.commentAdded.emit(comment);
          this.session.selections.map((selection: Selection<any>) => {
            if (selection.platform === PlatformType.SERVE) {
              this.addSubscription(
                this.sendCommentToServe(selection, comment).subscribe()
              );
            }
          });
        })
    );
  }

  private sendCommentToServe(selection: Selection<MaplesAccount>, comment: Comment): Observable<MaplesResultMessageResponse> {
    return this.customerAccountService
      .findAccountNotesCodes(selection.getMaplesPlatform())
      .pipe(
        switchMap(codes => {
          const code = codes && codes.find((code: MaplesAccountCode) => code.code === 'CUSTOMER_SERVICE');
      
          const accountId: Identifier = selection.identifiers.find((identifier: Identifier) => identifier.type === IdentifierType.ACCOUNT_ID);
          const request: MaplesSendNotesRequest = {
            text: comment.content,
            id: code && code.id || '9',
            code: 'GENERAL_SESSION',
            typeId: '264'
          };

          this.store.dispatch(new AppendSelectionCommentAction(comment));
          return this.customerAccountService.sendNote(accountId.value, request, MaplesPlatform.SERVE);
        })
      );
  }

  protected autoSave(formValue: any): Observable<void> {
    const comment: CommentRequest = {
      isPrivate: formValue.isPrivate,
      content: formValue.comment
    };
    this.commentChange.emit(comment);
    return of(null);
  }

  private setIsPrivateCommentEnabled(): void {
    const hasPermission   = this.securityService.hasPermission(Permission.PRIVATE_COMMENTS);
    const isCase          = this.session && this.session.sessionClassType === SessionClassType.CASE;
    const closedStatuses  = [
      SessionStatusType.CLOSED,
      SessionStatusType.FORCED_CLOSED,
      SessionStatusType.CANCELLED,
      SessionStatusType.VMS_SESSION_FAILED
    ];
    const isSessionClosed = this.session && this.session.status && closedStatuses.includes(this.session.status.value);

    this.isPrivateCommentEnabled = hasPermission && isCase && !isSessionClosed;
  }

}
