import { Component } from '@angular/core';
import {WizardPage} from "../../../../../core/wizard/wizard-page";
import {MaplesTransactionBlockMerchantWizard} from "../maples-transaction-block-merchant-wizard";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WizardWidth} from "../../../../../core/wizard/wizard-width.enum";
import {Observable, of} from "rxjs";
import {MaplesNode} from "@cscore/maples-client-model";

@Component({
  selector: 'cca-maples-transaction-block-merchant-form-page',
  templateUrl: './maples-transaction-block-merchant-form-page.component.html',
  styleUrls: ['./maples-transaction-block-merchant-form-page.component.scss']
})
export class MaplesTransactionBlockMerchantFormPageComponent extends WizardPage<MaplesTransactionBlockMerchantWizard> {

  key: string              = 'form-page';
  wizardForm: FormGroup    = new FormGroup ( {} );
  isCloseable: boolean     = true;
  isNextable: boolean      = true;
  closeButtonText: string  = 'Cancel';
  width: WizardWidth       = WizardWidth.MEDIUM;
  merchant: MaplesNode;

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm () {
    this.merchant = this.wizard.model.merchant;
    this.wizardForm = this.formBuilder.group ( {
      'comment': [ null, [ Validators.required, Validators.minLength ( 5 ), Validators.maxLength ( 500 ) ] ]
    } );

  }

  onNext (): Observable<string> {
    this.wizard.model.comment        = this.getComment ();
    return of ( 'confirmation-page' );
  }

  private getComment (): string {
    return this.getValueFromForm<string> ( 'comment' );
  }

}
