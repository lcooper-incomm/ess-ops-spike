import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../wizard/wizard-page";
import { ChangeSessionTypeWizard } from "../change-session-type-wizard";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SessionDefinitionService } from "../../../../session-definition.service";
import { SessionClass } from "../../../../model/session-class";
import { Observable, of } from "rxjs";
import { SessionType } from "../../../../model/session-type";
import * as _ from "lodash";
import { SessionTypeType } from "../../../../session-type-type.enum";
import { SessionService } from "../../../../session.service";

@Component ( {
  selector: 'cca-change-session-type-form-page',
  templateUrl: './change-session-type-form-page.component.html',
  styleUrls: [ './change-session-type-form-page.component.scss' ]
} )
export class ChangeSessionTypeFormPageComponent extends WizardPage<ChangeSessionTypeWizard> implements OnInit {

  cancelButtonText: string            = 'Cancel';
  isCloseable: boolean                = true;
  isNextable: boolean                 = true;
  key: string                         = 'form-page';
  sessionClassControl: FormControl;
  sessionClassOptions: SessionClass[] = [];
  sessionTypeControl: FormControl;
  wizardForm: FormGroup               = new FormGroup ( {} );

  constructor ( private sessionDefinitionService: SessionDefinitionService,
                private sessionService: SessionService ) {
    super ();
  }

  ngOnInit () {
    this.sessionClassOptions = this.sessionDefinitionService.getPermittedDefinitions ( this.wizard.model.session.sessionTypeType );
    this.initForm ();
  }

  autoSelectSingleSessionTypeOption (): void {
    let sessionClass: SessionClass = this.sessionClassControl.value;
    if ( sessionClass && sessionClass.sessionTypes.length === 1 && !this.sessionTypeControl.value ) {
      this.sessionTypeControl.setValue ( sessionClass.sessionTypes[ 0 ] );
      this.sessionTypeControl.disable ();
    } else {
      this.sessionTypeControl.enable ();
    }
  }

  onLoad (): Observable<any> {
    this.wizard.pages.get ( 'failure-page' ).instance.isIgnored = true;
    return of ( null );
  }

  onNext (): Observable<string> {
    this.wizard.model.selectedSessionClass = this.sessionClassControl.value;
    this.wizard.model.selectedSessionType  = this.sessionTypeControl.value;
    return of ( 'confirm-page' );
  }

  toggleSessionTypeRequired (): void {
    if ( this.sessionClassControl.value && this.sessionClassControl.value.sessionTypes.length > 1 ) {
      this.sessionTypeControl.setValidators ( Validators.compose ( [ Validators.required ] ) );
    } else {
      this.sessionTypeControl.setValidators ( Validators.compose ( [] ) );
    }
  }

  private buildRemovedComponentsAlert (): void {
    this.wizard.model.removedComponentsAlert = null;

    let selectedSessionType: SessionType = this.sessionTypeControl.value;
    if ( selectedSessionType ) {
      let currentSessionType: SessionType = this.wizard.model.session.sessionType;
      let removedComponents               = _.difference ( currentSessionType.components, selectedSessionType.components );
      if ( removedComponents.length ) {
        let componentNames: string[]             = this.sessionDefinitionService.getComponentDisplayNames ( removedComponents );
        this.wizard.model.removedComponentsAlert = `
<span>If you proceed, the following components and all data they contain will be removed from the session and cannot be recovered:</span>
<br/>
<ul>
${componentNames.map ( ( value ) => `<li>${value}</li>` ).join ( '' )}
</ul>
`;
      }
    }
  }

  private initForm (): void {
    this.sessionClassControl = new FormControl ( null, [ Validators.required ] );
    this.sessionTypeControl  = new FormControl ( null, [] );

    this.wizardForm = new FormGroup ( {
      sessionClass: this.sessionClassControl,
      sessionType: this.sessionTypeControl
    } );

    this.addSubscription (
      this.wizardForm.valueChanges.subscribe ( {
        next: value => {
          this.buildRemovedComponentsAlert ();
        }
      } )
    );
  }
}
