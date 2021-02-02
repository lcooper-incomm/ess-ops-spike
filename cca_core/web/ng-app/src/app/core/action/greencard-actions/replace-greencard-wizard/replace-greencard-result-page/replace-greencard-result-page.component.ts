import { Component, ChangeDetectionStrategy } from '@angular/core';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { ReplaceGreencardWizard } from '../replace-greencard-wizard';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { SearchTypeService } from 'src/app/core/search/search-type/search-type.service';
import { SearchTypeType } from 'src/app/core/search/search-type/search-type-type.enum';
import { Workflow } from 'src/app/core/workflow/workflow.service';
import { SearchParameterValueType } from 'src/app/core/search/search-type/search-parameter-value-type.enum';

@Component ( {
  selector: 'cca-replace-greencard-result-page',
  templateUrl: './replace-greencard-result-page.component.html',
  styleUrls: [ './replace-greencard-result-page.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class ReplaceGreencardResultPageComponent extends WizardPage<ReplaceGreencardWizard> {
  key: string           = 'result-page';
  wizardForm: FormGroup = new FormGroup ( {} );
  isCloseable: boolean  = true;

  constructor ( private workflow: Workflow, private searchTypeService: SearchTypeService ) {
    super ();
  }

  onLoad (): Observable<any> {
    if ( this.wizard.model.success ) {
      this.isFailed   = false;
      this.isBackable = false;
    } else {
      this.isFailed   = true;
      this.isBackable = true;
    }
    return of ( null );
  }

  get replacePan (): boolean {
    return this.wizard.model.replacePan;
  }

  get replacedSerialNumber (): string {
    return this.wizard.model.result.replacedSerialNumber;
  }

  get success (): boolean {
    return this.wizard.model.success;
  }

  linkBySerialNumber () {
    const searchTypeContainer = this.searchTypeService.getCachedSearchTypeByType ( SearchTypeType.FINANCIAL_GIFT );
    searchTypeContainer.clear ();
    searchTypeContainer.parameters.set ( SearchParameterValueType.SERIAL_NUMBER, this.replacedSerialNumber );
    this.addSubscription (
      this.workflow.forwardingSearch ( searchTypeContainer, true ).subscribe ()
    );
    this.addSubscription (
      this.close ().subscribe ()
    );
  }
}
