import {ChangeDetectionStrategy, Component, Input, SimpleChanges} from '@angular/core';
import {MaplesAccountDocument, MaplesPlatform} from '@cscore/maples-client-model';
import {ActionToolbarButtonStatus} from "../../../../core/action-toolbar/action-toolbar-button-status";
import {Permission} from "../../../../core/auth/permission";
import {ActionService} from "../../../selection-action-toolbar/action-service";
import {SecurityService} from "../../../../core/security/security.service";
import {AddDocumentActionWizard} from "../add-document-action-wizard/add-document-action-wizard";
import {WizardRunner} from "../../../../core/wizard/wizard-runner/wizard-runner.service";
import {IdentifierType} from "../../../../core/session/model/identifier-type.enum";
import {AuditActivityType} from "../../../../core/audit/audit-activity-type.enum";
import {ServeDocActionHistoryWizard} from '../../../wizards/serve-doc-action-history-wizard/serve-doc-action-history-wizard';
import {UpdateDocumentWizard} from '../update-document-type-wizard/update-document-wizard';
import {ServeArchiveDocumentWizard} from '../../../wizards/serve-archive-document/serve-archive-document-wizard';

@Component({
  selector: 'cca-account-document-detail',
  templateUrl: './account-document-detail.component.html',
  styleUrls: ['./account-document-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountDocumentDetailComponent {

  @Input() document: MaplesAccountDocument;
  @Input() accountId: string;
  @Input() platform: MaplesPlatform;
  actions: ActionToolbarButtonStatus[] = [];

  constructor(private securityService: SecurityService,
              private wizardRunner: WizardRunner) {
  }

  ngOnInit(changes: SimpleChanges): void {
    this.buildActions();
  }

  buildActions(): void {
    this.actions = [];
    this.actions.push(this.buildGetDocumentActions());
    this.actions.push(this.buildAddDocumentAction());
    this.actions.push(this.buildArchiveDocumentAction());
    this.actions.push(this.buildChangeDocumentTypeAction());
  }

  buildGetDocumentActions(): ActionToolbarButtonStatus {
    const action     = new ActionToolbarButtonStatus();
    action.label     = 'View Action History';
    action.isVisible = true;
    action.onClick   = () => {
      const wizard            = new ServeDocActionHistoryWizard();
      wizard.model.accountId  = this.accountId;
      wizard.model.documentId = this.document.id;
      wizard.model.platform   = this.platform;

      this.wizardRunner.run(wizard);
    };

    return action;
  }

  buildAddDocumentAction(): ActionToolbarButtonStatus {
    const action     = new ActionToolbarButtonStatus();
    action.label     = 'Change Status';
    action.isVisible = true;
    action.onClick   = () => {
      const wizard            = new AddDocumentActionWizard();
      wizard.model.accountId  = this.accountId;
      wizard.model.documentId = this.document.id;

      wizard.model.platform          = this.platform;
      wizard.model.identifier        = this.accountId;
      wizard.model.identifierType    = IdentifierType.ACCOUNT_ID;
      wizard.model.auditActivityType = AuditActivityType.ADD_DOCUMENT_ACTION;

      this.wizardRunner.run(wizard);
    };

    if (!this.securityService.hasPermission(Permission.SERVE_EDIT_ACCOUNT)) {
      action.disabledReason = ActionService.NO_PERMISSION;
    }

    return action;
  }

  buildArchiveDocumentAction(): ActionToolbarButtonStatus {
    const action     = new ActionToolbarButtonStatus();
    action.label     = 'Archive';
    action.isVisible = true;
    action.onClick   = () => {
      const wizard           = new ServeArchiveDocumentWizard();
      wizard.model.accountId = this.accountId;
      wizard.model.document  = this.document;
      wizard.model.platform  = this.platform;

      this.wizardRunner.run(wizard);
    };

    if (!this.securityService.hasPermission(Permission.SERVE_EDIT_ACCOUNT)
        || !this.securityService.hasPermission(Permission.SERVE_DOCUMENT_ADVANCED_FUNCTIONS)) {
      action.disabledReason = ActionService.NO_PERMISSION;
    }
    if (this.document.archiveStatus !== 'ACTIVE') {
      action.disabledReason = 'Already archived';
    }

    return action;
  }

  public buildChangeDocumentTypeAction(): ActionToolbarButtonStatus {
    const action     = new ActionToolbarButtonStatus();
    action.label     = 'Update Document';
    action.isVisible = true;
    action.onClick   = () => {
      const wizard           = new UpdateDocumentWizard();
      wizard.model.accountId = this.accountId;
      wizard.model.document  = this.document;

      wizard.model.platform          = this.platform;
      wizard.model.identifier        = this.accountId;
      wizard.model.identifierType    = IdentifierType.ACCOUNT_ID;
      wizard.model.auditActivityType = AuditActivityType.UPDATE_DOCUMENT_TYPE_ACTION;

      wizard.model.request.fileDescription = this.document.fileDescription;
      wizard.model.request.isRestricted    = !!this.document.restrictedCode;
      wizard.model.request.category        = this.document.category;

      this.wizardRunner.run(wizard);
    };

    if (!this.securityService.hasPermission(Permission.SERVE_EDIT_ACCOUNT)) {
      action.disabledReason = ActionService.NO_PERMISSION;
    }

    return action;
  }
}
