import { Component } from '@angular/core';
import { WizardResultPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page';
import { TransferGreencardWizard } from '../transfer-greencard-wizard';
import { SearchTypeType } from 'src/app/core/search/search-type/search-type-type.enum';
import { SearchParameterValueType } from 'src/app/core/search/search-type/search-parameter-value-type.enum';
import { SearchTypeService } from 'src/app/core/search/search-type/search-type.service';
import { Workflow } from 'src/app/core/workflow/workflow.service';

@Component ( {
  selector: 'cca-transfer-greencard-result-page',
  templateUrl: './transfer-greencard-result-page.component.html',
  styleUrls: [ './transfer-greencard-result-page.component.scss' ]
} )
export class TransferGreencardResultPageComponent extends WizardResultPage<TransferGreencardWizard> {

  constructor ( private workflow: Workflow, private searchTypeService: SearchTypeService ) {
    super ();
  }

  isSuccess (): boolean {
    return this.wizard.model.success;
  }

  linkBySerialNumber () {
    const searchTypeContainer = this.searchTypeService.getCachedSearchTypeByType ( SearchTypeType.FINANCIAL_GIFT );
    searchTypeContainer.clear ();
    searchTypeContainer.parameters.set ( SearchParameterValueType.SERIAL_NUMBER, this.wizard.model.newSerialNumber );
    this.workflow.forwardingSearch ( searchTypeContainer, true ).subscribe ()
    this.addSubscription (
      this.close ().subscribe ()
    );
  }

  get newSerialNumber (): string {
    return this.wizard.model.newSerialNumber;
  }
}
