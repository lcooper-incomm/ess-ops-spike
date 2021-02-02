import {Component, Input, OnInit} from '@angular/core';
import {ActionToolbarButtonStatus} from '../../../core/action-toolbar/action-toolbar-button-status';
import {MaplesCustomer, MaplesIdentificationType, MaplesOrder} from '@cscore/maples-client-model';
import {Permission} from '../../../core/auth/permission';
import {SecurityService} from '../../../core/security/security.service';
import {WizardRunner} from 'src/app/core/wizard/wizard-runner/wizard-runner.service';
import {RaiseCaseWizard} from '../../../core/session/session-panel/session-actions/raise-case/raise-case-wizard';
import {Session} from '../../../core/session/model/session';
import {Selection} from '../../../core/session/model/selection';
import {SessionTypeType} from '../../../core/session/session-type-type.enum';
import {SessionType} from '../../../core/session/model/session-type';
import {SessionDefinitionService} from '../../../core/session/session-definition.service';
import {EncorComponent} from '../../../core/session/model/encor-component';

@Component({
  selector: 'cca-customer-orders-detail',
  templateUrl: './customer-orders-detail.component.html'
})
export class CustomerOrdersDetailComponent implements OnInit {

  @Input()
  session: Session;
  @Input()
  selection: Selection<MaplesCustomer>;
  @Input()
  order: MaplesOrder;

  actions: ActionToolbarButtonStatus[] = [];

  constructor(private securityService: SecurityService,
              private sessionDefinitionService: SessionDefinitionService,
              private wizardRunner: WizardRunner) {
  }

  ngOnInit(): void {
    this.actions = [
      this.checkRaiseCase(this.order)
    ];
  }

  checkRaiseCase(order: MaplesOrder): ActionToolbarButtonStatus {
    const action     = new ActionToolbarButtonStatus();
    action.isVisible = true;
    action.label     = 'Raise Case';
    action.onClick   = () => {
      const wizard             = new RaiseCaseWizard();
      wizard.model.session     = this.session;
      wizard.model.selection   = this.selection;
      wizard.model.sessionType = this.sessionDefinitionService.getPermittedCaseTypesForRaiseCase().find((sessionType: SessionType) => {
        return sessionType.getType() === SessionTypeType.REWARDS;
      });
      wizard.model.encorComponent = new EncorComponent({
        customerId: this.selection.getMaplesCustomer().getIdentification(MaplesIdentificationType.MEMBER),
        orderId: order.id
      });
      this.wizardRunner.run(wizard);
    };

    if (!this.securityService.hasPermission(Permission.RAISE_SESSION_TYPE_REWARDS)) {
      action.disabledReason = 'You do not have permission to raise a case';
    }

    return action;
  }
}
