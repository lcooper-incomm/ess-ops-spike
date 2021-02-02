import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../wizard/wizard-page";
import { CreateSessionWizard } from "../create-session-wizard";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SessionDefinitionService } from "../../session-definition.service";
import { SessionClass } from "../../model/session-class";
import { SessionRequest } from "../../model/session-request";
import { map } from "rxjs/operators";
import { AddSessionToWorkspaceAction, DismissSessionAction } from "../../action/session-actions";
import { SessionService } from "../../session.service";
import { TransitionService } from "../../../transition/transition.service";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { Workflow } from "../../../workflow/workflow.service";
import { Observable } from 'rxjs';
import { SessionClassType } from "../../session-class-type.enum";
import { SessionTypeType } from "../../session-type-type.enum";
import { SessionType } from "../../model/session-type";

@Component ( {
  selector: 'cca-create-session-form-page',
  templateUrl: './create-session-form-page.component.html',
  styleUrls: [ './create-session-form-page.component.scss' ]
} )
export class CreateSessionFormPageComponent extends WizardPage<CreateSessionWizard> implements OnInit {

  isCloseable: boolean                = true;
  isNextable: boolean                 = true;
  key: string                         = 'form-page';
  nextButtonText: string              = 'Create';
  sessionClassControl: FormControl;
  sessionClassOptions: SessionClass[] = [];
  sessionTypeControl: FormControl;
  wizardForm: FormGroup               = new FormGroup ( {} );
  singleSessionTypeName: string;

  constructor ( private sessionDefinitionService: SessionDefinitionService,
                private sessionService: SessionService,
                private store: Store<AppState>,
                private transitionService: TransitionService,
                private workflow: Workflow ) {
    super ();
  }

  ngOnInit () {
    this.sessionClassOptions = this.sessionDefinitionService.getPermittedDefinitions ();
    this.initForm ();
  }

  autoSelectSingleSessionTypeOption (): void {
    let sessionClass: SessionClass = this.sessionClassControl.value;
    if ( sessionClass && sessionClass.sessionTypes.length === 1 && !this.sessionTypeControl.value ) {
      this.sessionTypeControl.setValue ( sessionClass.sessionTypes[ 0 ] );
      this.singleSessionTypeName = sessionClass.sessionTypes[0].name;
      this.sessionTypeControl.disable ();
    } else {
      this.sessionTypeControl.enable ();
    }
  }

  onNext (): Observable<string> {
    let request: SessionRequest = new SessionRequest ( {
      sessionClass: this.wizardForm.value.sessionClass.name,
      sessionType: this.wizardForm.value.sessionType ? this.wizardForm.value.sessionType.name : this.singleSessionTypeName
    } );

    if ( !request.sessionType ) {
      switch ( request.sessionClass ) {
        case SessionClassType.CALL_CENTER:
          request.sessionType = SessionTypeType.CALL;
          break;
        case SessionClassType.GENERAL:
          request.sessionType = SessionTypeType.GENERAL;
          break;
        default:
          break;
      }
    }

    return this.sessionService.createSession ( request )
      .pipe ( map ( ( value ): string => {
        this.transitionService.on ();
        this.store.dispatch ( new DismissSessionAction () );
        this.store.dispatch ( new AddSessionToWorkspaceAction ( value ) );

        setTimeout ( () => {
          this.workflow.loadSession ( value )
            .subscribe ();
        }, 50 );

        return null; //Returning null closes the dialog
      } ) );
  }

  toggleSessionTypeRequired (): void {
    if ( this.sessionClassControl.value && this.sessionClassControl.value.sessionTypes.length > 1 ) {
      this.sessionTypeControl.setValidators ( Validators.compose ( [ Validators.required ] ) );
    } else {
      this.sessionTypeControl.setValidators ( Validators.compose ( [] ) );
    }
  }

  private initForm (): void {
    this.sessionClassControl = new FormControl ( this.wizard.model.sessionClass, [ Validators.required ] );
    this.sessionTypeControl  = new FormControl ( this.wizard.model.sessionType, [] );

    this.wizardForm = new FormGroup ( {
      sessionClass: this.sessionClassControl,
      sessionType: this.sessionTypeControl
    } );
  }

}
