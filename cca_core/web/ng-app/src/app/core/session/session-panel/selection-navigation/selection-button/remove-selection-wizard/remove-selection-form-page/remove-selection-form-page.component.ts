import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../../wizard/wizard-page";
import { RemoveSelectionWizard } from "../remove-selection-wizard";
import { FormGroup } from "@angular/forms";
import { SelectionService } from "../../../../../selection/selection.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ToastFactory } from "../../../../../../../toast/toast-factory.service";
import { RemoveSelectionAction } from "../../../../../action/session-actions";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../../../../app-state";
import { Workflow } from "../../../../../../workflow/workflow.service";
import { RoutingService } from "../../../../../../routing/routing.service";

@Component({
  selector: 'cca-remove-selection',
  templateUrl: './remove-selection-form-page.component.html',
  styleUrls: [ './remove-selection-form-page.component.scss']
})
export class RemoveSelectionFormPageComponent extends WizardPage<RemoveSelectionWizard> implements OnInit {

  key: string                       = 'form-page';
  wizardForm: FormGroup             = new FormGroup( { } );


  constructor(  private routingService: RoutingService,
                private selectionService: SelectionService,
                private store: Store<AppState>,
                private toaster: ToastFactory,
                private workflow: Workflow ) {
    super();
  }

  ngOnInit() {
    this.closeButtonText        = 'Cancel';
    this.isCloseable            = true;
    this.isNextable             = true;
    this.nextButtonText         = 'Remove';

    this.initForm();
  }

  private initForm (): void {
  }

  onNext (): Observable<any> {
    return this.selectionService.removeOne( this.wizard.model.selection.id )
      .pipe (
        map ( () => {
          this.store.dispatch ( new RemoveSelectionAction( this.wizard.model.selection ) );
          this.toaster.success( ' Successfully removed selection from session.' );
          if( this.wizard.model.isActiveSelection && this.wizard.model.session.selections ) {
            if( this.wizard.model.session.selections.length > 0 ) {
              this.workflow.loadSelection ( this.wizard.model.session.selections[ 0 ] ).subscribe();
            }
            else {
              this.routingService.navigateToDefaultLandingPage ();
            }
          }
        } )
      );
  }

}
